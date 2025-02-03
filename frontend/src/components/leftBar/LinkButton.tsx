"use client"
import Link from "next/link"
import { useState } from "react"
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Category } from "../../../../backend/generated/zod"

export const LinkButton = ({ id, userId, categoryName, createdAt, updatedAt }: Category) => {
  const [isHovering, setIsHovering] = useState<boolean>(false)
  const [miniModalisOpen, setMiniModalIsOpen] = useState<boolean>(false);
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setMiniModalIsOpen(true);
  }
  return(
    // <Link href={`/category/${id}`} onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)} className="relative overflow-visible w-[85%] py-1 px-2 my-2 mx-4 text-xl text-left text-slate-700 rounded-md hover:bg-slate-300">
    //   <div className="flex justify-between">
    //     <span>{categoryName}</span>
    //   { isHovering
    //     ? <div className="">
    //         <button className="hover:bg-slate-400 rounded-md" onClick={handleClick} >
    //           <MoreHorizIcon/>
    //         </button>
    //       </div>
    //     : <></>
    //   }
    //   { miniModalisOpen 
    //     ? <div className="w-screen h-screen fixed top-0 left-0">
    //         <div className="w-40 bg-red-300">
    //           カテゴリー名変更
    //         </div> 
    //       </div>
    //     : <></>
    //   }
    //   </div>
    // </Link>    
    <Link href={`/category/${id}`} onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)} className="relative w-[85%] py-1 px-2 my-2 mx-4 text-xl text-left text-slate-700 rounded-md hover:bg-slate-300">
      <div className="flex justify-between relative"> {/* 親要素をrelativeにする */}
        <span>{categoryName}</span>
        { isHovering && (
          <div className="relative"> {/* ボタンをrelativeにする */}
            <button className="hover:bg-slate-400 rounded-md" onClick={handleClick}>
              <MoreHorizIcon/>
            </button>
            { miniModalisOpen && (
              <div className="absolute left-full ml-2 bg-red-300 w-40 top-0"> {/* モーダルをabsoluteでボタンの横に配置 */}
                カテゴリー名変更
              </div>
            )}
          </div>
        )}
      </div>
    </Link>   
  )
}