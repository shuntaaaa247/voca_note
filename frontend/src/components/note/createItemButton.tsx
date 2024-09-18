"use client"
import CreateIcon from '@mui/icons-material/Create'
import { useState, useRef, useContext } from 'react'
import { useCookies } from 'next-client-cookies';
import { ModalWindow } from '../utils/modalWindow';
import { useParams } from 'next/navigation';
import { ItemsContext } from './testNote';

export const CreateItemButton = () => {
  const cookies = useCookies();
  const token = cookies.get("token");
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const wordRef = useRef<HTMLInputElement>(null);
  const meaningRef = useRef<HTMLInputElement>(null);
  const [wordErrorMessage, setWordErrorMessage] = useState<string>("") ;
  const [meaningErrorMessage, setMeaningErrorMessage] = useState<string>("")
  const { items, setItems } = useContext(ItemsContext)
  const params = useParams()
  const categoryId = params.categoryId;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories/${categoryId}/items`, {
      method: "POST",
      headers: {
        "authorization": `Bearer ${token}`,
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        word: wordRef.current?.value,
        meaning: meaningRef.current?.value
      }),
    })

    const resJson = await res.json();
    if (resJson.item) {
      setItems([...items ?? [], resJson.item])
      setModalIsOpen(false)
    } else if (resJson.message) {
      console.log(resJson.message)
      if (resJson.message.include("word")) {
        setWordErrorMessage(resJson.message)
      } else if (resJson.message.include("word")) {
        setMeaningErrorMessage(resJson.message)
      } else {
        setMeaningErrorMessage(resJson.message)
      }
    }
  }

  return(
    <>
      { modalIsOpen 
        ? <ModalWindow setModalIsOpen={setModalIsOpen} >
            <form className='flex flex-col' onSubmit={handleSubmit}>
              <label>言葉</label>
              <input ref={wordRef}></input>
              <span>{wordErrorMessage ?? ""}</span>
              <label>意味</label>
              <input ref={meaningRef}></input>
              <span>{meaningErrorMessage ?? ""}</span>
              <button type='submit'>保存</button>
            </form>
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