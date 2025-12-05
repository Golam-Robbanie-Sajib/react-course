// filepath: hooks/use-progress.ts
"use client"

import { db } from "@/lib/firebase"
import { doc, getDoc, setDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { useAuth } from "@/components/auth/auth-provider"

// Helper to check if two dates are on consecutive calendar days
const areDatesConsecutive = (date1: Date, date2: Date) => {
  const day1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate());
  const day2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());
  const diffTime = day2.getTime() - day1.getTime();
  const diffDays = Math.round(diffTime / (1000 * 3600 * 24));
  return diffDays === 1;
};

// Define the shape of the user profile stored in Firestore
interface UserProfile {
  completed_days: number[];
  notes: { [key: number]: string };
  exam_highest_score: number | null;
  exam_last_score: number | null;
  confidence_ratings: { [key: number]: number };
  current_streak: number;
  last_login_date: string | null;
}

const defaultProfile: UserProfile = {
  completed_days: [],
  notes: {},
  exam_highest_score: null,
  exam_last_score: null,
  confidence_ratings: {},
  current_streak: 0,
  last_login_date: null,
};

export function useProgress() {
  const queryClient = useQueryClient()
  const { user } = useAuth()
  const userId = user?.uid

  const { data: userProfile, isLoading: isProgressLoading } = useQuery({
    queryKey: ['profile', userId],
    queryFn: async () => {
      if (!userId) return null
      const docRef = doc(db, "users", userId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return docSnap.data() as UserProfile;
      } else {
        // Create default profile if it doesn't exist
        await setDoc(docRef, defaultProfile);
        return defaultProfile;
      }
    },
    enabled: !!userId,
  })

  // Safe access with defaults
  const completedDays = userProfile?.completed_days || [];
  const notes = userProfile?.notes || {};
  const highestScore = userProfile?.exam_highest_score || null;
  const lastScore = userProfile?.exam_last_score || null;
  const confidenceRatings = userProfile?.confidence_ratings || {};
  const currentStreak = userProfile?.current_streak || 0;
  const lastLoginDate = userProfile?.last_login_date || null;

  // --- MUTATIONS ---

  const { mutate: toggleDayCompletion } = useMutation({
    mutationFn: async (day: number) => {
      if (!userId) throw new Error("User not authenticated")
      const docRef = doc(db, "users", userId);
      const isCurrentlyCompleted = completedDays.includes(day);

      if (isCurrentlyCompleted) {
        await updateDoc(docRef, {
            completed_days: arrayRemove(day)
        });
        return { completed: false, day };
      } else {
        await updateDoc(docRef, {
            completed_days: arrayUnion(day)
        });
        return { completed: true, day };
      }
    },
    onSuccess: ({ completed, day }) => {
      toast.success(completed ? `Day ${day} marked complete!` : `Day ${day} progress removed.`)
      queryClient.invalidateQueries({ queryKey: ['profile', userId] })
    },
    onError: () => { toast.error("Failed to update progress.") }
  })

  const { mutate: resetProgress } = useMutation({
    mutationFn: async () => {
      if (!userId) throw new Error("User not authenticated")
      const docRef = doc(db, "users", userId);
      await updateDoc(docRef, {
        completed_days: [],
        notes: {}
      });
    },
    onSuccess: () => {
      toast.success("Your course progress has been reset.")
      queryClient.invalidateQueries({ queryKey: ['profile', userId] })
    },
    onError: () => { toast.error("Failed to reset progress.") }
  })

  const { mutate: updateNote } = useMutation({
    mutationFn: async ({ day, content }: { day: number; content: string }) => {
      if (!userId) throw new Error("User not authenticated")
      const docRef = doc(db, "users", userId);
      // Create the nested field path for updating a specific note
      // Firestore allows dot notation for map fields: "notes.1": "content"
      await updateDoc(docRef, {
        [`notes.${day}`]: content
      });
      return { day, content };
    },
    onSuccess: () => {
      toast.success("Note saved!")
      queryClient.invalidateQueries({ queryKey: ['profile', userId] });
    },
    onError: () => { toast.error("Failed to save note.") }
  })

  const { mutate: updateExamScores } = useMutation({
    mutationFn: async ({ newScore, totalQuestions }: { newScore: number; totalQuestions: number }) => {
      if (!userId) throw new Error("User not authenticated")
      const newPercentage = Math.round((newScore / totalQuestions) * 100);
      const currentHighest = highestScore || 0;
      const newHighest = Math.max(currentHighest, newPercentage);

      const docRef = doc(db, "users", userId);
      await updateDoc(docRef, {
          exam_last_score: newPercentage,
          exam_highest_score: newHighest
      });
      return { newHighest, newPercentage }
    },
    onSuccess: () => {
      toast.success("Exam score saved successfully!")
      queryClient.invalidateQueries({ queryKey: ['profile', userId] });
    },
    onError: () => { toast.error("Failed to save your score.") }
  })

  const { mutate: updateConfidenceRating } = useMutation({
    mutationFn: async ({ day, rating }: { day: number; rating: number }) => {
      if (!userId) throw new Error("User not authenticated")
      const docRef = doc(db, "users", userId);
      await updateDoc(docRef, {
          [`confidence_ratings.${day}`]: rating
      });
      return { day, rating };
    },
    onSuccess: () => {
      toast.success("Confidence rating saved!")
      queryClient.invalidateQueries({ queryKey: ['profile', userId] });
    }
  })

  const { mutate: updateStreak } = useMutation({
    mutationFn: async () => {
      if (!userId) return;
      const today = new Date();
      const todayStr = today.toISOString().split('T')[0];
      const lastLogin = lastLoginDate ? new Date(lastLoginDate) : null;

      // If already logged in today, do nothing
      if (lastLogin && today.toDateString() === lastLogin.toDateString()) return;

      let newStreak = 1;
      if (lastLogin && areDatesConsecutive(lastLogin, today)) {
        newStreak = (currentStreak || 0) + 1;
      }

      const docRef = doc(db, "users", userId);
      await updateDoc(docRef, {
        current_streak: newStreak,
        last_login_date: todayStr
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile', userId] });
    }
  })

  return {
    isLoading: isProgressLoading,
    completedDays,
    notes,
    highestScore,
    lastScore,
    confidenceRatings,
    currentStreak,
    isAuthenticated: !!userId,
    isCompleted: (day: number) => completedDays.includes(day),
    toggleDayCompletion,
    resetProgress,
    updateNote,
    updateExamScores,
    updateConfidenceRating,
    updateStreak,
  }
}
