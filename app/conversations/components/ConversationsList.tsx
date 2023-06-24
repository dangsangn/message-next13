"use client"

import { Conversation, User } from "@prisma/client"
import ConversationBox from "./ConversationBox"
import { useState } from "react"
import { useConversation } from "@/app/hooks"
import { MdOutlineGroupAdd } from "react-icons/md"
import { FullConversation } from "@/app/types"

type Props = {
  title: string
  users: User[]
  conversations: FullConversation[]
}

const ConversationsList = ({ conversations }: Props) => {
  const [items, setItems] = useState(conversations)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { conversationId, isOpen } = useConversation()

  return (
    <div className="fixed inset-y-0 pb-20 overflow-y-auto border-r border-r-gray-200 w-full left-0 lg:pb-0 lg:left-20 lg:w-80 lg:block">
      <div className="px-5">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold py-4">Messages</h3>
          <div
            onClick={() => setIsModalOpen(true)}
            className="
                rounded-full 
                p-2 
                bg-gray-100 
                text-gray-600 
                cursor-pointer 
                hover:opacity-75 
                transition
              "
          >
            <MdOutlineGroupAdd size={20} />
          </div>
        </div>
        {items.map((c) => (
          <ConversationBox
            key={c.id}
            conversation={c}
            selected={conversationId === c.id}
          />
        ))}
      </div>
    </div>
  )
}

export default ConversationsList
