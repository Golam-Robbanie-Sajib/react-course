// filepath: app/layout.tsx
import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "next-themes"
import { Providers } from "@/components/providers"
import { AuthProvider } from "@/components/auth/auth-provider"
import { Toaster } from "@/components/ui/toaster"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "React Course Platform - Learn JavaScript to React in 25 Days",
  description: "Master JavaScript and React with our comprehensive 25-day course platform",
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`} suppressHydrationWarning data-scroll-behavior="smooth">
      <body className="font-sans">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <AuthProvider>
            <Providers>
              {children}
              <Toaster richColors />
            </Providers>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}