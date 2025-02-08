"use client"

import { useRef, useState } from "react"
import { ModalWindow } from "../utils/modalWindow";
import { UI_DATA } from "../../constants/uidata";
import { CreateCategoryForm } from "./createCategoryForm";

export const CreateCategoryButton = () => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [categoryNameErrorMessage, setCategoryNameErrorMessage] = useState<string>("");
  const categoryNameRef = useRef<HTMLInputElement>(null)

  return (
    <>
      { modalIsOpen 
        ?  
        <ModalWindow 
          setModalIsOpen={setModalIsOpen} 
          screenClassName={UI_DATA.createCategoryModal.screenClassName} 
          modalClassName={UI_DATA.createCategoryModal.modalClassName}
          modalStyle={null}
        >
          <CreateCategoryForm setModalIsOpen={setModalIsOpen} />
        </ModalWindow>
        : 
        <></>
      }
      <button className="w-[85%] py-1 px-2 my-2 mx-4 text-xl text-left text-slate-700 rounded-md hover:bg-slate-300" onClick={() => setModalIsOpen(true)}>新規作成 +</button>
    </>
  )
}