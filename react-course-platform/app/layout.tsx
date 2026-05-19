// filepath: app/layout.tsx
import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "next-themes"
import { Providers } from "@/components/providers"
import { AuthProvider } from "@/components/auth/auth-provider"
import { AuthGate } from "@/components/auth/auth-gate"
import { ChatContextProvider } from "@/components/chat/chat-context"
import { ChatBubble } from "@/components/chat/chat-bubble"
import { Toaster } from "@/components/ui/toaster"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "Self-Learn Hub — HTML, C, and React, in-browser",
  description:
    "Self-paced HTML, C, and React courses with live in-browser exercises, auto-graded tests, progressive hints, an AI tutor, and progress that syncs across devices.",
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // Allow zoom for accessibility — never set maximumScale: 1.
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0b1020" },
  ],
  colorScheme: "light dark",
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`} suppressHydrationWarning data-scroll-behavior="smooth">
      <body className="font-sans">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <AuthProvider>
            <Providers>
              <ChatContextProvider>
                <AuthGate>{children}</AuthGate>
                <ChatBubble />
              </ChatContextProvider>
              <Toaster richColors />
            </Providers>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}