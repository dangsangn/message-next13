"use client"

import axios from "axios"
import { useEffect, useRef, useState } from "react"
import { FullMessage } from "@/app/types"
import { useConversation } from "@/app/hooks"
import MessageBox from "./MessageBox"

type Props = {
  initialMessages: FullMessage[]
}

const Body = ({ initialMessages = [] }: Props) => {
  const bottomRef = useRef<HTMLDivElement>(null)
  const [messages, setMessages] = useState(initialMessages)

  const { conversationId } = useConversation()

  useEffect(() => {
    axios.post(`/api/conversations/${conversationId}/seen`)
  }, [conversationId])

  useEffect(() => {
    bottomRef?.current?.scrollIntoView()
  }, [])

  return (
    <div className="flex-1 overflow-y-auto">
      {messages.map((message, i) => (
        <MessageBox
          isLast={i === messages.length - 1}
          key={message.id}
          data={message}
        />
      ))}
      <div className="pt-24" ref={bottomRef} />
    </div>
  )
}

export default Body
