import { LeftBar } from "@/components/leftBar/LeftBar"
import { Note } from "@/components/note/note"

export default function Home() {
  return (
    <main className="flex justify-start">
      <LeftBar />
      <Note />
    </main>
  )
}