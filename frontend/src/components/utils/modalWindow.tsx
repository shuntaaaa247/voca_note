import { ReactNode } from "react"

type Props = {
  setModalIsOpen: (value: boolean) => void
  children: ReactNode
}

export const ModalWindow = ({ setModalIsOpen, children }: Props) => {
  return(
    <div className='fixed top-0 left-0 w-full h-full bg-slate-100 bg-opacity-80 z-10' onClick={() => setModalIsOpen(false)}>
      <div className='fixed top-[20%] left-[20%] w-[60%] h-[60%] bg-white rounded-xl shadow-xl z-20' onClick={(e) => e.stopPropagation()}>
        <div className='flex justify-center '>
          {children}
        </div>
      </div> 
    </div>
  )
}