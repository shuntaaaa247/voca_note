import { LeftBar } from "@/components/leftBar/leftBar"
// import { TestNote } from "@/components/note/TestNote"
import { TestNote } from "@/components/note/TestNote"

const CategoryContent = () => {
  return (
    <main className="flex justify-start">
      <LeftBar />
      <TestNote />
    </main>
  )
}

export default CategoryContent