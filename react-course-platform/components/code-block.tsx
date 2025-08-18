"use client"

import { useState } from "react"
import { Copy, Check } from "lucide-react"
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

  // Simple syntax highlighting for JavaScript/JSX
  const highlightCode = (code: string) => {
    return code
      .replace(/(\/\/.*$)/gm, '<span class="text-green-400">$1</span>') // Comments
      .replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="text-green-400">$1</span>') // Block comments
      .replace(
        /\b(const|let|var|function|return|if|else|for|while|class|import|export|from|default|async|await)\b/g,
        '<span class="text-purple-400">$1</span>',
      ) // Keywords
      .replace(/\b(true|false|null|undefined)\b/g, '<span class="text-orange-400">$1</span>') // Literals
      .replace(/(['"`])((?:(?!\1)[^\\]|\\.)*)(\1)/g, '<span class="text-green-300">$1$2$3</span>') // Strings
      .replace(/\b(\d+\.?\d*)\b/g, '<span class="text-blue-400">$1</span>') // Numbers
      .replace(
        /\b(console|window|document|React|useState|useEffect|props|state)\b/g,
        '<span class="text-cyan-400">$1</span>',
      ) // Common objects/hooks
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
        <pre
          className={`bg-slate-900 text-slate-100 p-4 overflow-x-auto text-sm leading-relaxed ${title ? "rounded-t-none" : ""} rounded-xl`}
        >
          <code
            dangerouslySetInnerHTML={{
              __html: highlightCode(code),
            }}
          />
        </pre>

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
