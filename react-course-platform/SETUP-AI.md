# AI tutor setup (Groq)

The floating chat bubble talks to the [Groq](https://groq.com/) API using the
`openai/gpt-oss-120b` model. To make it work end-to-end, set **one server-side
environment variable** on Vercel (or in your local `.env.local`):

```
GROQ_API_KEY=gsk_your_key_here
```

Then redeploy. That's it.

## What the chat knows

The chat bubble sends a small context envelope with every request. It contains:

- The course title (e.g. "Master C in 15 Days")
- The current day and lesson title (e.g. "Day 8: If / else / else if")
- The current exercise title and prompt
- The learner's current code (pulled out of the Sandpack snapshot saved in
  `localStorage` under `slh:sandpack:<course>:<day>:<exerciseIndex>`)
- A short conversation history (last ~12 messages)

So when the user asks "why doesn't my code work?", the AI sees the exercise
prompt and the actual code they typed.

## Security notes

- `GROQ_API_KEY` lives **only** on the server. It's read by the edge route at
  `app/api/ai/chat/route.ts` and is never exposed in client-side JS.
- The route only proxies chat completions. It doesn't trust the client to set
  the model, system prompt, or anything else that could change billing
  behaviour.
- The route limits history to the last 12 messages, caps `max_tokens` at 1024,
  and uses `temperature: 0.4` for stable, focused replies.

## Customising

Edit `app/api/ai/chat/route.ts`:

- Change `model` to use a different Groq model (e.g. `llama-3.3-70b-versatile`).
- Edit `SYSTEM_PROMPT` to change the tutor's tone.
- Adjust `max_tokens` / `temperature` for longer or more creative replies.

To populate richer context (e.g. for the practice or review pages), call
`useChatContext().setContext({...})` from any client component — see
`components/day-page.tsx` for the canonical example.
