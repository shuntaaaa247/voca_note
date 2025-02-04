"use client"
import CreateIcon from '@mui/icons-material/Create'
import { useState, useRef, useContext, useEffect } from 'react'
import { ModalWindow } from '../utils/modalWindow';
import { CreateItemForm } from './createItemForm';
import { UI_DATA } from '../../constants/uidata';

export const CreateItemButton = () => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  return(
    <>
      { modalIsOpen 
        ? <ModalWindow 
            setModalIsOpen={setModalIsOpen} 
            screenClassName={UI_DATA.createItemModal.screenClassName} 
            modalClassName={UI_DATA.createItemModal.modalClassName}
            modalStyle={null}
          >
            <CreateItemForm setModalIsOpen={setModalIsOpen}/>
          </ModalWindow>
        : <></>
      }
      <div className="fixed bottom-10 right-10">
        <button className='bg-blue-500 p-3 rounded-full hover:bg-blue-400' onClick={() => setModalIsOpen(true)}>
          <CreateIcon sx={{color: 'white', fontSize: 50}}/>
        </button>
      </div>
    </>
  )
}