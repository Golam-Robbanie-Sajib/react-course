// filepath: app/layout.tsx
import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "next-themes"
import { Providers } from "@/components/providers"
import { AuthProvider } from "@/components/auth/auth-provider"
import { AuthGate } from "@/components/auth/auth-gate"
import { Toaster } from "@/components/ui/toaster"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "Self-Learn Hub — HTML and React, in-browser",
  description:
    "Self-paced HTML and React courses with live in-browser exercises, auto-graded tests, progressive hints, and progress that works without an account.",
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`} suppressHydrationWarning data-scroll-behavior="smooth">
      <body className="font-sans">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <AuthProvider>
            <Providers>
              <AuthGate>{children}</AuthGate>
              <Toaster richColors />
            </Providers>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}