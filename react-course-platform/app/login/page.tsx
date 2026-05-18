import { Suspense } from "react"
import { LoginCard } from "@/components/login-card"

export const metadata = {
  title: "Sign in — Self-Learn Hub",
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50 dark:bg-slate-950">
      <Suspense fallback={null}>
        <LoginCard />
      </Suspense>
    </div>
  )
}
