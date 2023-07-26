"use client"

import React, { useMemo, useState } from "react"
import { Conversation, User } from "@prisma/client"
import { HiChevronLeft, HiEllipsisHorizontal } from "react-icons/hi2"
import Link from "next/link"
import { useOtherUser } from "@/app/hooks"
import { Avatar } from "@/app/components"
import ProfileDrawer from "./ProfileDrawer"

type Props = {
  conversation: Conversation & {
    users: User[]
  }
}

const Header = ({ conversation }: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  const otherUser = useOtherUser(conversation)

  const statusText = useMemo(() => {
    if (conversation.isGroup) {
      return `${conversation.users.length} members`
    }
    return "Active"
  }, [conversation])

  const handleClose = () => {
    setIsOpen(false)
  }

  return (
    <div className="px-4 py-3">
      <ProfileDrawer
        data={conversation}
        isOpen={isOpen}
        onClose={handleClose}
      />
      <div className="flex items-center gap-3">
        <Link
          className="block mr-2 h-full text-sky-500 lg:hidden"
          href="/conversations"
        >
          <HiChevronLeft size={32} />
        </Link>
        <Avatar user={otherUser} />
        <div className="flex flex-col">
          <p className="text-md font-semibold">{otherUser.name}</p>
          <p className="text-sm font-light text-neutral-500">{statusText}</p>
        </div>
        <div className="ml-auto">
          <HiEllipsisHorizontal
            size={32}
            onClick={() => setIsOpen(true)}
            className="
          text-sky-500
          cursor-pointer
          hover:text-sky-600
          transition
        "
          />
        </div>
      </div>
    </div>
  )
}

export default Header
