"use client"
import Link from "next/link"
import { useState } from "react"
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Category } from "../../../../backend/generated/zod"
import { ModalWindow } from "../utils/ModalWindow";
import { UI_DATA } from "../../constants/uidata";
import { SelectionModalContent } from "../utils/SelectionModalContent";
import { ConfirmDeleteModalContent } from "../utils/ConfirmDeleteModalContent";
import { EditCategoryNameForm } from "./EditCategoryNameForm";

export const LinkButton = ({ id, userId, categoryName, createdAt, updatedAt }: Category) => {
  const [isHovering, setIsHovering] = useState<boolean>(false)
  const [selectionModalIsOpen, setSelectionModalIsOpen] = useState<boolean>(false);
  const [confirmDeleteModalIsOpen, setConfirmDeleteModalIsOpen] = useState<boolean>(false);
  const [editCategoryNameModalIsOpen, setEditCategoryNameModalIsOpen] = useState<boolean>(false);
  const [linkButtonPosition, setLinkButtonPosition] = useState<{top: number, left: number, width: number}>({
    top: 0, 
    left: 0,
    width: 0,
  });

  const openSelectionModal = (e: React.MouseEvent<HTMLButtonElement>) => { // 押された単語のボタンの位置を取得する
    e.preventDefault();
    e.stopPropagation();
    const rect = document.getElementById(`category_${id}`)?.getBoundingClientRect();
    console.log(rect)
    setLinkButtonPosition({
      top: Math.floor(rect?.top ?? 0),
      left: Math.floor(rect?.left ?? 0),
      width: Math.floor(rect?.width ?? 0),
    });
    setSelectionModalIsOpen(true)
  }

  return(
    <>
      <Link 
        href={`/category/${id}`} 
        onMouseEnter={() => setIsHovering(true)} 
        onMouseLeave={() => setIsHovering(false)} 
        className={`relative w-[85%] py-1 px-2 my-2 mx-4 text-xl text-left text-slate-700 rounded-md hover:bg-slate-300 ${selectionModalIsOpen ? "bg-slate-300" : ""}`}>
        <div id={`category_${id}`} className="flex justify-between relative"> {/* 親要素をrelativeにする */}
          <span className="truncate">{categoryName}</span>
          { (isHovering || selectionModalIsOpen) && (
            <div className="relative"> {/* ボタンをrelativeにする */}
              <button className="hover:bg-slate-400 rounded-md" onClick={(e) => openSelectionModal(e)}>
                <MoreHorizIcon/>
              </button>
            </div>
          )}
        </div>
      </Link>  
      {selectionModalIsOpen ? (
        <>
          <ModalWindow // アイテムの[削除、編集]選択モーダル
            setModalIsOpen={setSelectionModalIsOpen} 
            screenClassName={UI_DATA.selectionModal.screenClassName} 
            modalClassName={UI_DATA.selectionModal.modalClassName}
            modalStyle={{top: linkButtonPosition.top + "px", left: linkButtonPosition.left + linkButtonPosition.width + "px"}}
          >
            <SelectionModalContent confirmDeleteModalIsOpen={confirmDeleteModalIsOpen} setConfirmDeleteModalIsOpen={setConfirmDeleteModalIsOpen} editModalIsOpen={editCategoryNameModalIsOpen} setEditModalIsOpen={setEditCategoryNameModalIsOpen} />
          </ModalWindow>
          {confirmDeleteModalIsOpen ? (
            <ModalWindow // アイテム削除確認モーダル
              setModalIsOpen={setConfirmDeleteModalIsOpen} 
              screenClassName={UI_DATA.confirmDeleteModal.screenClassName} 
              modalClassName={UI_DATA.confirmDeleteModal.modalClassName}
              modalStyle={{
                top: (linkButtonPosition.top ?? 0) + "px", 
                left: (linkButtonPosition.left ?? 0) + linkButtonPosition.width + UI_DATA.selectionModalWidth + 3 + "px"
              }}
            >
              <ConfirmDeleteModalContent setSelectionModalIsOpen={setSelectionModalIsOpen} setConfirmDeleteModalIsOpen={setConfirmDeleteModalIsOpen} categoryId={id} url={`${process.env.NEXT_PUBLIC_API_URL}/categories/${id}`}/>
            </ModalWindow>
          ) : (
            <></>
          )}
        </>
      ) : (
        <></>
      )}
      {editCategoryNameModalIsOpen ? (
        <ModalWindow // カテゴリ名編集モーダル
          setModalIsOpen={setEditCategoryNameModalIsOpen}
          screenClassName={UI_DATA.editCategoryNameModal.screenClassName}
          modalClassName={UI_DATA.editCategoryNameModal.modalClassName}
        >
          <EditCategoryNameForm categoryId={id} categoryName={categoryName} setEditCategoryNameModalIsOpen={setEditCategoryNameModalIsOpen} setSelectionModalIsOpen={setSelectionModalIsOpen} />
        </ModalWindow>
      ) : (
        <></>
      )}
    </> 
  )
}