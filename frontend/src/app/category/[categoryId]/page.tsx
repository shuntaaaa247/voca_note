import { LeftBar } from "@/components/leftBar/LeftBar"
import { Note } from "@/components/note/Note"

const CategoryContent = () => {
  return (
    <main className="flex justify-start">
      <LeftBar />
      <Note />
    </main>
  )
}

export default CategoryContent