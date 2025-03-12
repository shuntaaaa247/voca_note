import { LeftBar } from "@/components/leftBar/LeftBar"
import { HomeNote } from "@/components/note/HomeNote"

export default function Home() {
  return (
    <main className="flex justify-start">
      <LeftBar />
      <HomeNote />
    </main>
  )
}