"use client"
import CreateIcon from '@mui/icons-material/Create'
import { useState, useRef } from 'react'
import { useCookies } from 'next-client-cookies';
import { Item } from '../../../../backend/generated/zod';

export const CreateItemButton = () => {
  const cookies = useCookies();
  const token = cookies.get("token");
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const wordRef = useRef<HTMLInputElement>(null);
  const meaningRef = useRef<HTMLInputElement>(null);
  const [wordErrorMessage, setWordErrorMessage] = useState<string>("") ;
  const [meaningErrorMessage, setMeaningErrorMessage] = useState<string>("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // console.log("token" + token);
    // console.log("word " + wordRef.current?.value)
    // console.log("meaning " + meaningRef.current?.value)
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories/45f6c41d-c78b-4cbf-88f9-1dbe16bd50b7/items`, {
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
        ? <div className='fixed top-0 left-0 w-full h-full bg-slate-100 bg-opacity-80 z-10' onClick={() => setModalIsOpen(false)}>
            <div className='fixed top-[20%] left-[20%] w-[60%] h-[60%] bg-white rounded-xl shadow-xl z-20' onClick={(e) => e.stopPropagation()}>
              <div className='flex justify-center '>
                <form className='flex flex-col' onSubmit={handleSubmit}>
                  <label>言葉</label>
                  <input ref={wordRef}></input>
                  <span>{wordErrorMessage ?? ""}</span>
                  <label>意味</label>
                  <input ref={meaningRef}></input>
                  <span>{meaningErrorMessage ?? ""}</span>
                  <button type='submit'>保存</button>
                </form>
              </div>
            </div> 
          </div>
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