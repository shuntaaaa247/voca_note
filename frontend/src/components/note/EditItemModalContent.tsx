import { ModalWindow } from "../utils/ModalWindow";
import { UI_DATA } from "../../constants/uidata";
import { EditItemForm } from "../note/EditItemForm";
import type { Item as ItemType } from "../../../../backend/generated/zod"

export const EditItemModalContent = ({ 
  item,
  setSelectionModalIsOpen, 
  setEditModalIsOpen 
}: { 
  item: ItemType, 
  setSelectionModalIsOpen: (isOpen: boolean) => void, 
  setEditModalIsOpen: (isOpen: boolean) => void 
}) => {
  return (
    <ModalWindow  
      setModalIsOpen={setEditModalIsOpen}
      screenClassName={UI_DATA.editItemModal.screenClassName}
      modalClassName={UI_DATA.editItemModal.modalClassName}
    >
      {/* <EditItemForm itemId={itemId} word={word} meaning={meaning} categoryId={categoryId} setSelectionModalIsOpen={setSelectionModalIsOpen} setEditModalIsOpen={setEditModalIsOpen} /> */}
      <EditItemForm item={item} setSelectionModalIsOpen={setSelectionModalIsOpen} setEditModalIsOpen={setEditModalIsOpen} />
    </ModalWindow>
  )
}