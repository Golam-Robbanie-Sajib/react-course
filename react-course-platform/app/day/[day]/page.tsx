import { redirect } from "next/navigation"

interface Props {
  params: Promise<{ day: string }>
}

export default async function LegacyDayRoute({ params }: Props) {
  const { day } = await params
  redirect(`/courses/react/day/${day}`)
}
