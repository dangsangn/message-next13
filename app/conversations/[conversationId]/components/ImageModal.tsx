import Modal from "@/app/components/modals/Modal"
import Image from "next/image"
import React from "react"

type Props = {
  isOpen?: boolean
  onClose: () => void
  src?: string | null
}

const ImageModal = ({ isOpen, onClose, src }: Props) => {
  if (!src) return null
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="w-80 h-80">
        <Image className="object-cover" src={src} alt="Image" fill />
      </div>
    </Modal>
  )
}

export default ImageModal
