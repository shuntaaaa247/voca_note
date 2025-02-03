import { useState, useContext } from "react"
import { useCookies } from 'next-client-cookies';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { ItemsContext } from "./testNote";
import type { Item as ItemProps } from "../../../../backend/generated/zod"
import { ModalWindow } from "../utils/modalWindow";
import { UI_DATA } from "../../constants/uidata";

type selectionModalType = {
  top: number | undefined
  left: number | undefined
}
export const Item = ( { id, word, meaning, categoryId, createdAt, updatedAt } : ItemProps) => {
  const [isHovering, setIsHovering] = useState(false);
  const [selectionModalIsOpen, setSelectionModalIsOpen] = useState<boolean>(false);
  const [selectionModalPosition, setSelectionModalPosition] = useState<selectionModalType>({
    top: 0,
    left: 0,
  });
  const [confirmDeleteModalIsOpen, setConfirmDeleteModalIsOpen] = useState<boolean>(false);

  const getSelectionModalPosition = () => {
    const rect = document.getElementById(`item_${id}`)?.getBoundingClientRect();
    console.log(rect)
    setSelectionModalPosition({
      top: Math.floor(rect?.top ?? 0),
      left: Math.floor(rect?.left ?? 0),
    });
    setSelectionModalIsOpen(true)
  }

  return(
    <>
      {selectionModalIsOpen ? (
        <>
          <ModalWindow // アイテムの[削除、編集]選択モーダル
            setModalIsOpen={setSelectionModalIsOpen} 
            screenClassName={UI_DATA.selectionModal.screenClassName} 
            modalClassName={UI_DATA.selectionModal.modalClassName}
            modalStyle={{top: selectionModalPosition.top + "px", left: selectionModalPosition.left + "px"}}
          >
            <SelectionModalContent confirmDeleteModalIsOpen={confirmDeleteModalIsOpen} setConfirmDeleteModalIsOpen={setConfirmDeleteModalIsOpen} />
          </ModalWindow>
          {confirmDeleteModalIsOpen ? (
            <ModalWindow // アイテム削除確認モーダル
              setModalIsOpen={setConfirmDeleteModalIsOpen} 
              screenClassName={UI_DATA.confirmDeleteModal.screenClassName} 
              modalClassName={UI_DATA.confirmDeleteModal.modalClassName}
              modalStyle={{
                top: (selectionModalPosition.top ?? 0) + "px", 
                left: (selectionModalPosition.left ?? 0) + UI_DATA.selectionModalWidth + 3 + "px"
              }}
            >
              <ConfirmDeleteModal setSelectionModalIsOpen={setSelectionModalIsOpen} setConfirmDeleteModalIsOpen={setConfirmDeleteModalIsOpen} categoryId={categoryId} itemId={id}/>
            </ModalWindow>
          ) : (
            <></>
          )}
        </>
      ) : (
        <></>
      )}
      <li key={id} id={`item_${id}`} className="pl-2" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}> {/* アイテム */}
          <div className="flex justify-start">
            {isHovering ? (
              <MoreHorizIcon 
              className="text-slate-400 mr-5  w-7 h-7 rounded-full bg-slate-200 shadow-inner my-5 hover:cursor-grab"
              onClick={() => getSelectionModalPosition()}
              />
            ) : (
              <span className="mr-5 w-7 h-7 rounded-full bg-slate-200 shadow-inner my-5"></span>
            )}
            <div className="w-full border-b">
              <p className="text-xl my-1 text-slate-700 font-medium">{word}</p>
              <p className="text-xl my-1 text-slate-700 font-medium">{meaning}</p>
            </div>
          </div>
        </li>
    </>
  )
}

const SelectionModalContent = ({ confirmDeleteModalIsOpen, setConfirmDeleteModalIsOpen }: { confirmDeleteModalIsOpen: boolean,  setConfirmDeleteModalIsOpen: (isOpen: boolean) => void }) => {
  const [isDeleteHovering, setIsDeleteHovering] = useState<boolean>(false);
  const handleDeleteHovering = () => {
    setIsDeleteHovering(!isDeleteHovering);
  }

  return (
    <div className="flex flex-col py-2">
      <button 
        onMouseEnter={handleDeleteHovering} 
        onMouseLeave={handleDeleteHovering} 
        className="flex flex-row items-center mt-2 pb-2 border-b border-slate-300 hover"
        onClick={() => setConfirmDeleteModalIsOpen(true)}
      >
        <span className="mr-2 w-4 h-4 rounded-full bg-slate-200 shadow-inner"></span>
        <DeleteOutlineOutlinedIcon className={`mr-2 ${isDeleteHovering || confirmDeleteModalIsOpen ? "text-red-500" : "text-slate-700"}`}/>
        <span className={`${isDeleteHovering || confirmDeleteModalIsOpen ? "text-red-500" : "text-slate-700"} pr-2`}>
          削除
        </span>
      </button>
      <button className="flex flex-row items-center my-2">
        <span className="mr-2 w-4 h-4 rounded-full bg-slate-200 shadow-inner"></span>
        <ModeEditOutlineOutlinedIcon className="mr-2"/>
        <span className="text-slate-700 pr-2">
          編集
        </span>
      </button>
    </div>

  )
}

const ConfirmDeleteModal = ({ itemId, categoryId, setSelectionModalIsOpen, setConfirmDeleteModalIsOpen }: { itemId: string, categoryId: string, setSelectionModalIsOpen: (isOpen: boolean) => void, setConfirmDeleteModalIsOpen: (isOpen: boolean) => void }) => {
  const cookies = useCookies();
  const token = cookies.get("token");
  const { items, setItems } = useContext(ItemsContext)
  const handleDelete = async () => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/categories/${categoryId}/items/${itemId}`
    console.log("url => ", url)
    const res = await fetch(url, {
      method: "DELETE",
      headers: {
        "authorization": `Bearer ${token}`
      }
    })
    console.log("res => ", res)
    if (res.status === 204) {
      setConfirmDeleteModalIsOpen(false)
      setSelectionModalIsOpen(false)
      setItems(items?.filter((item) => item.id !== itemId) ?? items) // 削除したアイテムを除外したitemsをセット
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