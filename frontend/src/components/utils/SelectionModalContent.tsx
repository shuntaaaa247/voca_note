import { useState } from "react";
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { ModalWindow } from "./modalWindow";
import { UI_DATA } from "../../constants/uidata";
import { EditItemForm } from "../note/editItemForm";


export const SelectionModalContent = ({ 
  confirmDeleteModalIsOpen, 
  editModalIsOpen,
  setConfirmDeleteModalIsOpen, 
  setEditModalIsOpen 
}: { 
  confirmDeleteModalIsOpen: boolean, 
  editModalIsOpen: boolean, 
  setConfirmDeleteModalIsOpen: (isOpen: boolean) => void, 
  setEditModalIsOpen: (isOpen: boolean) => void 
}) => {
  const [isDeleteHovering, setIsDeleteHovering] = useState<boolean>(false);
  const handleDeleteHovering = () => {
    setIsDeleteHovering(!isDeleteHovering);
  }
  const handleEditClick = () => {
    setEditModalIsOpen(true)
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
      <button onClick={handleEditClick} className="flex flex-row items-center my-2">
        <span className="mr-2 w-4 h-4 rounded-full bg-slate-200 shadow-inner"></span>
        <ModeEditOutlineOutlinedIcon className="mr-2"/>
        <span className="text-slate-700 pr-2">
          編集
        </span>
      </button>
    </div>

  )
}

export const EditItemModalContent = ({ 
  itemId, 
  word, 
  meaning, 
  categoryId, 
  setSelectionModalIsOpen, 
  setEditModalIsOpen 
}: { 
  itemId: string, 
  word: string, 
  meaning: string, 
  categoryId: string, 
  setSelectionModalIsOpen: (isOpen: boolean) => void, 
  setEditModalIsOpen: (isOpen: boolean) => void 
}) => {
  return (
    <ModalWindow  
      setModalIsOpen={setEditModalIsOpen}
      screenClassName={UI_DATA.editItemModal.screenClassName}
      modalClassName={UI_DATA.editItemModal.modalClassName}
    >
      <EditItemForm itemId={itemId} word={word} meaning={meaning} categoryId={categoryId} setSelectionModalIsOpen={setSelectionModalIsOpen} setEditModalIsOpen={setEditModalIsOpen} />
    </ModalWindow>
  )
}