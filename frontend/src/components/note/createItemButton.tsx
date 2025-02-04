"use client"
import CreateIcon from '@mui/icons-material/Create'
import { useState, useRef, useContext, useEffect } from 'react'
import { useCookies } from 'next-client-cookies';
import { ModalWindow } from '../utils/modalWindow';
import { useParams } from 'next/navigation';
import { ItemsContext } from './testNote';
import { UI_DATA } from '../../constants/uidata';

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

  useEffect(() => { // アイテム作成モーダルが開閉するとき、エラーメッセージをクリアする
    if (wordErrorMessage || meaningErrorMessage) {
      setWordErrorMessage("")
      setMeaningErrorMessage("")
    }
  }, [modalIsOpen])

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
      setWordErrorMessage("");
      setMeaningErrorMessage("")
      if (resJson.message.includes("word")) {
        setWordErrorMessage(resJson.message)
      } else if (resJson.message.includes("meaning")) {
        setMeaningErrorMessage(resJson.message)
      } else {
        setMeaningErrorMessage(resJson.message)
        console.log("エラーが発生しました\n" + resJson.message)
        alert("エラーが発生しました\n" + resJson.message)
      }
    }
  }

  return(
    <>
      { modalIsOpen 
        ? <ModalWindow 
            setModalIsOpen={setModalIsOpen} 
            screenClassName={UI_DATA.createItemModal.screenClassName} 
            modalClassName={UI_DATA.createItemModal.modalClassName}
            modalStyle={null}
          >
            <form onSubmit={handleSubmit} className="flex flex-col w-full h-full bg-slate-50 rounded-xl shadow-md">
              <h1 className="text-center text-3xl text-blue-500 mt-3 mb-4">New Vocabulary</h1>
              <div className="border-t flex h-10 py-1.5 mx-1">
                <span className="w-5 h-5 ml-2 my-auto shadow-inner bg-slate-200 bg-opacity-50 rounded-full"></span>
              </div>
              <div className="border-t flex h-10 mx-1">
                <span className="w-5 h-5 ml-2 my-auto shadow-inner bg-slate-200 bg-opacity-50  rounded-full"></span>
                <label className="pl-2 pt-3">・言葉</label>
              </div>
              <div className="flex border-t h-10 mx-1">
                <span className="w-5 h-5 ml-2 my-auto shadow-inner bg-slate-200 bg-opacity-50 rounded-full"></span>
                <input ref={wordRef} type="text" placeholder="Apple" className="bg-slate-50 pl-2 pt-2 ml-4 w-full focus:outline-none"/>
              </div>
              { wordErrorMessage 
              ? <div className="border-t flex h-10 mx-1">
                  <span className="w-5 h-5 ml-2 my-auto shadow-inner bg-slate-200 bg-opacity-50 rounded-full"></span>
                  <p className="pl-2 ml-4 pt-3 text-red-500">{wordErrorMessage}</p>
                </div>
              : <></>
              }
              <div className="border-t flex h-10 mx-1">
                <span className="w-5 h-5 ml-2 my-auto shadow-inner bg-slate-200 bg-opacity-50 rounded-full"></span>
                <label className="pl-2 pt-3">・意味</label>
              </div>
              <div className="border-t flex h-10 mx-1">
                <span className="w-5 h-5 ml-2 my-auto shadow-inner bg-slate-200 bg-opacity-50 rounded-full"></span>
                <input ref={meaningRef} type="text" placeholder="リンゴ" className="bg-slate-50 pl-2 pt-2 ml-4 w-full focus:outline-none"/>
              </div>
              { meaningErrorMessage 
              ? <div className="border-t flex h-10 mx-1">
                  <span className="w-5 h-5 ml-2 my-auto shadow-inner bg-slate-200 bg-opacity-50 rounded-full"></span>
                  <p className="pl-2 ml-4 pt-3 text-red-500">{meaningErrorMessage}</p>
                </div>
              : <></>
              }
              <div className="border-t flex h-10 mx-1">
                <span className="w-5 h-5 ml-2 my-auto shadow-inner bg-slate-200 bg-opacity-50 rounded-full"></span>
                <button type="submit" className="border-blue-500 border-2 text-blue-500 text-lg px-3 my-0.5 mx-auto hover:bg-blue-500 hover:text-white">保存</button>
              </div>
              <div className="border-t border-b flex h-10 mx-1">
                <span className="w-5 h-5 ml-2 my-2 shadow-inner bg-slate-200 bg-opacity-50 rounded-full"></span>
              </div>
              <div className="h-14">
              </div>
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