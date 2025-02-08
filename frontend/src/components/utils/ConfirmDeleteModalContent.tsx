import { useCookies } from "next-client-cookies";
import { useContext } from "react";
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation'
import { ItemsContext } from "../note/testNote";

export const ConfirmDeleteModalContent = ({ 
  itemId, 
  categoryId, 
  url,
  setSelectionModalIsOpen, 
  setConfirmDeleteModalIsOpen 
}: { 
  itemId?: string, 
  categoryId: string, 
  url: string,
  setSelectionModalIsOpen: (isOpen: boolean) => void,
  setConfirmDeleteModalIsOpen: (isOpen: boolean) => void 
}) => {
  const cookies = useCookies();
  const token = cookies.get("token");
  const params = useParams();
  const router = useRouter();
  const { items, setItems } = useContext(ItemsContext)
  const handleDelete = async () => {
    const res = await fetch(url, {
      method: "DELETE",
      headers: {
        "authorization": `Bearer ${token}`
      }
    })
    console.log("res => ", res)
    if (res.status === 204) {
      if (itemId) { // アイテムを削除する場合
        setConfirmDeleteModalIsOpen(false)
        setSelectionModalIsOpen(false)
        setItems(items?.filter((item) => item.id !== itemId) ?? items) // 削除したアイテムを除外したitemsをセット
      } else { // カテゴリを削除する場合
        if (categoryId === params.categoryId) {
          router.push("/")
        }
        router.refresh()
        setConfirmDeleteModalIsOpen(false)
        setSelectionModalIsOpen(false)
      }
    } else {
      alert("エラーが発生しました。")
    }
  }
  return (
    <div className="flex flex-col p-2">
      <p className="text-slate-700 border-b border-slate-300 py-2 px-8">本当に削除しますか？</p>
      <div className="flex flex-row items-stretch justify-center">
        <button className="text-slate-700 w-1/2 pt-2 pb-2 border-r border-slate-300" onClick={() => setConfirmDeleteModalIsOpen(false)}>キャンセル</button>
        <button className="text-red-500 w-1/2 pt-2 pb-2" onClick={handleDelete}>削除</button>
      </div>
    </div>
  )
}