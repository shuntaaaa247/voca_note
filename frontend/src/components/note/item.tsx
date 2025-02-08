import { useState } from "react"
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { ModalWindow } from "../utils/modalWindow";
import type { Item as ItemProps } from "../../../../backend/generated/zod"
import { UI_DATA } from "../../constants/uidata";
import { SelectionModalContent, EditItemModalContent } from "../utils/SelectionModalContent";
import { ConfirmDeleteModalContent } from "../utils/ConfirmDeleteModalContent";
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


  const [editItemModalIsOpen, setEditItemModalIsOpen] = useState<boolean>(false);


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
            <SelectionModalContent confirmDeleteModalIsOpen={confirmDeleteModalIsOpen} setConfirmDeleteModalIsOpen={setConfirmDeleteModalIsOpen} editItemModalIsOpen={editItemModalIsOpen} setEditItemModalIsOpen={setEditItemModalIsOpen} />
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
              <ConfirmDeleteModalContent setSelectionModalIsOpen={setSelectionModalIsOpen} setConfirmDeleteModalIsOpen={setConfirmDeleteModalIsOpen} categoryId={categoryId} itemId={id} url={`${process.env.NEXT_PUBLIC_API_URL}/categories/${categoryId}/items/${id}`}/>
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
      {editItemModalIsOpen ? (
        <EditItemModalContent itemId={id} word={word} meaning={meaning} categoryId={categoryId} setSelectionModalIsOpen={setSelectionModalIsOpen} setEditModalIsOpen={setEditItemModalIsOpen} />
      ) : (
        <></>
      )}
    </>
  )
}
