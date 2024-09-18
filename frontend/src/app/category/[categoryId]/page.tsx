import { LeftBar } from "@/components/leftBar/leftBar"
import { TestNote } from "@/components/note/testNote"

const CategoryContent = () => {
  return (
    <main className="flex justify-start">
      <LeftBar />
      <TestNote />
    </main>
  )
}

export default CategoryContent