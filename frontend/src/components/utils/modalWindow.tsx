import { ReactNode, useEffect } from "react"

type ModalStyle = {
  top: string
  left: string
}

type Props = {
  setModalIsOpen: (value: boolean) => void
  screenClassName: string
  modalClassName: string
  modalStyle: ModalStyle | null
  children: ReactNode
}

export const ModalWindow = ({ setModalIsOpen, screenClassName, modalClassName, modalStyle, children }: Props) => {
  const stopScrollingBackContent = () => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    }
  };

  useEffect(stopScrollingBackContent, []);
  return(
    <div className={screenClassName} onClick={() => setModalIsOpen(false)}>
      <div className={modalClassName} style={modalStyle ?? {}} onClick={(e) => e.stopPropagation()}>
        <div className='flex justify-center '>
          {children}
        </div>
      </div> 
    </div>
  )
}