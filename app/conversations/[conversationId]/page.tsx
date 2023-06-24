import { Empty } from "@/app/components"
import React from "react"
import Header from "./components/Header"
import Body from "./components/Body"
import Form from "./components/Form"
import { getConversationById } from "@/app/actions/getConversationById"
import { getMessages } from "@/app/actions"

interface IProps {
  conversationId: string
}

const ConversationDetail = async ({ params }: { params: IProps }) => {
  const conversation = await getConversationById(params.conversationId)
  const messages = await getMessages(params?.conversationId)

  if (!conversation) {
    return (
      <div className="lg:pl-80 h-full">
        <div className="h-full flex flex-col">
          <Empty />
        </div>
      </div>
    )
  }

  return (
    <div className=" h-full lg:pl-80">
      <div className="flex flex-col h-full">
        <Header conversation={conversation} />
        <Body initialMessages={messages} />
        <Form />
      </div>
    </div>
  )
}

export default ConversationDetail
