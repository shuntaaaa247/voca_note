import { LeftBar } from "@/components/leftBar/leftBar"
import { Note } from "@/components/note/note"

export default function About() {
  return (
    <main className="flex justify-start">
      <LeftBar />
      <Note />
    </main>
  )
}