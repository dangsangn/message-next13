"use client"

import { Avatar } from "@/app/components"
import { useOtherUser } from "@/app/hooks"
import { FullConversation } from "@/app/types"
import clsx from "clsx"
import { format } from "date-fns"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useCallback, useMemo } from "react"

type Props = {
  conversation: FullConversation
  selected: boolean
}

const ConversationBox = ({ conversation, selected }: Props) => {
  const router = useRouter()
  const session = useSession()
  const otherUser = useOtherUser(conversation)

  const handleClick = useCallback(() => {
    router.push(`conversations/${conversation.id}`)
  }, [router, conversation.id])

  const lastMessage = useMemo(() => {
    const length = conversation.messages && conversation.messages.length
    if (!length) return null

    return conversation.messages[length - 1]
  }, [conversation.messages])

  const userEmail = useMemo(() => {
    return session?.data?.user?.email
  }, [session])

  const hasSeen = useMemo(() => {
    if (!userEmail) return false
    const seen = lastMessage?.seen || []

    return seen.filter((user) => user.email === userEmail).length !== 0
  }, [userEmail, lastMessage])

  const lastMessageText = useMemo(() => {
    if (lastMessage?.image) {
      return "Sent an image"
    }
    if (lastMessage?.body) {
      return lastMessage.body
    }
    return "Started a conversation"
  }, [lastMessage])

  return (
    <div
      className={clsx(
        "w-full relative flex items-center bg-white gap-2 p-3 cursor-pointer hover:bg-neutral-100 rounded-lg transition",
        selected && "bg-neutral-200"
      )}
      onClick={handleClick}
    >
      <Avatar user={otherUser} />
      <div>
        <div className="flex items-center justify-between">
          <p className="font-semibold line-clamp-1">
            {conversation.name || otherUser.name}
          </p>
          {lastMessage?.createdAt && (
            <p className="text-sm">
              {format(new Date(lastMessage.createdAt), "p")}
            </p>
          )}
        </div>
        <p className={clsx("text-sm font-semibold", hasSeen && "font-normal")}>
          {lastMessageText}
        </p>
      </div>
    </div>
  )
}

export default ConversationBox
