// filepath: components/code-block.tsx
"use client"

import { useState } from "react"
import { Copy, Check } from "lucide-react"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism"
import { Button } from "@/components/ui/button"

interface CodeBlockProps {
  code: string
  language?: string
  title?: string
}

export function CodeBlock({ code, language = "javascript", title }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const copyCode = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative group">
      {title && (
        <div className="flex items-center justify-between bg-slate-800 px-4 py-2 rounded-t-xl border-b border-slate-700">
          <span className="text-sm font-medium text-slate-300">{title}</span>
          <span className="text-xs text-slate-500 uppercase">{language}</span>
        </div>
      )}

      <div className="relative">
        <SyntaxHighlighter
          language={language}
          style={atomDark}
          customStyle={{
            margin: 0,
            padding: "16px",
            backgroundColor: "#0d1117", // A dark background color
            borderRadius: title ? "0 0 0.75rem 0.75rem" : "0.75rem",
          }}
          codeTagProps={{
            style: {
              fontSize: "0.875rem",
              fontFamily: "var(--font-mono)",
            },
          }}
        >
          {code}
        </SyntaxHighlighter>

        <Button
          size="sm"
          variant="ghost"
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 hover:text-slate-100 hover:bg-slate-800"
          onClick={copyCode}
        >
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        </Button>
      </div>
    </div>
  )
}