// filepath: components/auth/auth-provider.tsx
"use client"

import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import type { Session } from '@supabase/supabase-js'

// 1. Define the context shape
type AuthContextType = {
  session: Session | null
  user: Session['user'] | null
  isLoading: boolean
}

// 2. Create the context with a default value
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// 3. Create the AuthProvider component
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // This effect runs ONLY ONCE.
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session)
        setIsLoading(false)
      }
    )

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const value = {
    session,
    user: session?.user ?? null,
    isLoading,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// 4. Create the custom hook to consume the context.
//    This is the hook our components will use.
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}