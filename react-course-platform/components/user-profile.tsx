// filepath: components/user-profile.tsx
"use client"

import { auth } from "@/lib/firebase"
import { signOut, GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { useTheme } from "next-themes"
import { Button } from "./ui/button"
import { useAuth } from "@/components/auth/auth-provider"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { FcGoogle } from "react-icons/fc"
import { toast } from "sonner"

export function UserProfile() {
  const { resolvedTheme } = useTheme()
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const [isAuthLoading, setIsAuthLoading] = useState(false)

  const handleSignOut = async () => {
    try {
      await signOut(auth)
      toast.success("Signed out successfully")
      router.refresh()
    } catch (error) {
      toast.error("Error signing out")
    }
  }

  const handleGoogleLogin = async () => {
    setIsAuthLoading(true)
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      toast.success("Signed in successfully!")
    } catch (error: any) {
      console.error(error);
      toast.error("Failed to sign in. " + error.message)
    } finally {
      setIsAuthLoading(false)
    }
  }

  if (isLoading) {
    return <Button variant="outline" size="sm" disabled>Loading...</Button>
  }

  if (user) {
    const userInitial = user.email ? user.email.charAt(0).toUpperCase() : 'U'
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage src={user.photoURL || undefined} alt={user.email || ''} />
              <AvatarFallback>{userInitial}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{user.displayName || "User"}</p>
              <p className="text-xs leading-none text-muted-foreground">
                {user.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          
          <DropdownMenuItem asChild>
            <Link href="/dashboard">Dashboard</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/profile">Profile Settings</Link>
          </DropdownMenuItem>

          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleSignOut}>
            Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">Login / Sign Up</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Welcome</DialogTitle>
          <DialogDescription>
            Sign in to save your progress across devices.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4 py-4">
            <Button
                variant="outline"
                onClick={handleGoogleLogin}
                disabled={isAuthLoading}
                className="flex items-center gap-2 justify-center"
            >
                {isAuthLoading ? "Signing in..." : (
                    <>
                        <FcGoogle className="w-5 h-5" />
                        Continue with Google
                    </>
                )}
            </Button>
            {/* Add more providers here if needed */}
        </div>

      </DialogContent>
    </Dialog>
  )
}
