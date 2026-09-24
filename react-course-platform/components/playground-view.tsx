"use client"

import { useEffect, useMemo, useState } from "react"
import dynamic from "next/dynamic"
import { TerminalSquare } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { Exercise } from "@/lib/courses/types"
import { useChatContext } from "@/components/chat/chat-context"

const LiveExercise = dynamic(() => import("./live-exercise").then((m) => m.LiveExercise), {
  ssr: false,
  loading: () => <div className="rounded-lg border border-dashed p-6 text-sm text-muted-foreground">Loading editor…</div>,
})

interface Snippet {
  id: string
  label: string
  stdinHint?: string
  code: string
}

// Starting points taken from the HSC ICT Chapter 5 worked examples.
const SNIPPETS: Snippet[] = [
  {
    id: "blank",
    label: "Blank program",
    code: `#include <stdio.h>

int main() {
    // Write your program here.
    return 0;
}
`,
  },
  {
    id: "sum",
    label: "Sum of two numbers (Program 5.6)",
    code: `#include <stdio.h>

int main() {
    int n1, n2;
    scanf("%d %d", &n1, &n2);
    printf("%d\\n", n1 + n2);
    return 0;
}
`,
  },
  {
    id: "grade",
    label: "Letter grade (Program 5.11)",
    code: `#include <stdio.h>

int main() {
    int marks;
    scanf("%d", &marks);
    if (marks >= 80) {
        printf("Your grade is A+\\n");
    } else if (marks >= 70) {
        printf("Your grade is A\\n");
    } else if (marks >= 60) {
        printf("Your grade is A-\\n");
    } else if (marks >= 50) {
        printf("Your grade is B\\n");
    } else if (marks >= 40) {
        printf("Your grade is C\\n");
    } else if (marks >= 33) {
        printf("Your grade is D\\n");
    } else {
        printf("Your grade is F\\n");
    }
    return 0;
}
`,
  },
  {
    id: "table",
    label: "Multiplication table (Example 14)",
    code: `#include <stdio.h>

int main() {
    int i, n;
    scanf("%d", &n);
    for (i = 1; i <= 10; i = i + 1) {
        printf("%d x %d = %d\\n", n, i, n * i);
    }
    return 0;
}
`,
  },
  {
    id: "reverse",
    label: "Reverse an array (Program 5.24)",
    code: `#include <stdio.h>

int main() {
    int ara[] = {10, 20, 30, 40, 50};
    int n = 5, i, temp;

    for (i = 0; i < n / 2; i += 1) {
        temp = ara[i];
        ara[i] = ara[n - 1 - i];
        ara[n - 1 - i] = temp;
    }
    for (i = 0; i < n; i += 1) {
        printf("%d\\n", ara[i]);
    }
    return 0;
}
`,
  },
  {
    id: "search",
    label: "Search in an array (Program 5.27)",
    code: `#include <stdio.h>

int main() {
    int ara[] = {1, 4, 6, 8, 9, 11, 14, 15, 20, 25, 33, 83, 87, 97, 99, 100};
    int n = 16, i, key;
    scanf("%d", &key);
    for (i = 0; i < n; i = i + 1) {
        if (ara[i] == key) {
            printf("%d is found in the array.\\n", key);
            break;
        }
    }
    if (i == n) {
        printf("%d is not found in the array.\\n", key);
    }
    return 0;
}
`,
  },
  {
    id: "strcmp",
    label: "Compare two strings (Program 5.31)",
    code: `#include <stdio.h>
#include <string.h>

int main() {
    char s1[80], s2[80];
    int value;
    scanf("%s %s", s1, s2);
    value = strcmp(s1, s2);
    if (value == 0) {
        printf("%s and %s are equal.\\n", s1, s2);
    } else if (value > 0) {
        printf("%s is greater than %s.\\n", s1, s2);
    } else {
        printf("%s is smaller than %s.\\n", s1, s2);
    }
    return 0;
}
`,
  },
  {
    id: "function",
    label: "Celsius → Fahrenheit function (Program 5.32)",
    code: `#include <stdio.h>

float celsius_to_fahrenheit(float celsius);

int main() {
    float celsius, fahrenheit;
    scanf("%f", &celsius);
    fahrenheit = celsius_to_fahrenheit(celsius);
    printf("Fahrenheit = %f\\n", fahrenheit);
    return 0;
}

float celsius_to_fahrenheit(float celsius) {
    return (celsius * 9 / 5) + 32;
}
`,
  },
]

const LAST_KEY = "slh:playground:last"

export function PlaygroundView() {
  const [snippetId, setSnippetId] = useState("blank")
  const { setContext } = useChatContext()

  useEffect(() => {
    try {
      const last = window.localStorage.getItem(LAST_KEY)
      if (last && SNIPPETS.some((s) => s.id === last)) setSnippetId(last)
    } catch {
      /* ignore */
    }
  }, [])

  const snippet = SNIPPETS.find((s) => s.id === snippetId) ?? SNIPPETS[0]
  const storageKey = `slh:playground:c:${snippet.id}`

  const exercise: Exercise = useMemo(
    () => ({
      title: snippet.label,
      description: "",
      template: "c",
      activeFile: "/main.c",
      starter: { "/main.c": snippet.code },
      tests: [],
      solution: { code: "", explanation: "" },
    }),
    [snippet]
  )

  useEffect(() => {
    setContext({
      pageTitle: "C Playground",
      courseTitle: "C playground (free practice)",
      exerciseTitle: snippet.label,
      exercisePrompt: "The learner is experimenting freely in the C playground. Help them understand or debug their program.",
      language: "c",
      getUserCode: () => {
        try {
          const raw = window.localStorage.getItem(storageKey)
          const files = raw ? (JSON.parse(raw) as Record<string, string>) : { "/main.c": snippet.code }
          return (files["/main.c"] ?? snippet.code).slice(0, 4000)
        } catch {
          return snippet.code
        }
      },
    })
  }, [setContext, snippet, storageKey])

  const choose = (id: string) => {
    setSnippetId(id)
    try {
      window.localStorage.setItem(LAST_KEY, id)
    } catch {
      /* ignore */
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TerminalSquare className="h-5 w-5 text-indigo-500" /> C Playground
          </CardTitle>
          <CardDescription>
            Write and run any C program in your browser — ideal for the textbook&apos;s &ldquo;Do it yourself&rdquo;
            tasks. Start blank or from a worked example. Each starting point keeps its own saved copy.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <label htmlFor="snippet" className="text-sm font-medium">
            Start from
          </label>
          <select
            id="snippet"
            value={snippet.id}
            onChange={(e) => choose(e.target.value)}
            className="mt-1.5 block w-full rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm"
          >
            {SNIPPETS.map((s) => (
              <option key={s.id} value={s.id}>
                {s.label}
              </option>
            ))}
          </select>
        </CardContent>
      </Card>

      {/* key forces a fresh editor when switching starting points */}
      <LiveExercise key={storageKey} exercise={exercise} storageKey={storageKey} />
    </div>
  )
}
