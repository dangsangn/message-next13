import { getCurrentUser } from "@/app/actions"
import { prisma } from "@/app/libs"
import { NextResponse } from "next/server"

export const POST = async (request: Request) => {
  try {
    const currentUser = await getCurrentUser()
    const body = await request.json()
    const { image, message, conversationId } = body

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const newMessage = await prisma.message.create({
      include: {
        seen: true,
        sender: true,
      },
      data: {
        body: message,
        image,
        conversation: {
          connect: { id: conversationId },
        },
        sender: {
          connect: { id: currentUser.id },
        },
        seen: {
          connect: { id: currentUser.id },
        },
      },
    })

    const updatedConversation = await prisma.conversation.update({
      where: {
        id: conversationId,
      },
      data: {
        lastMessageAt: new Date(),
        messages: {
          connect: {
            id: newMessage.id,
          },
        },
      },
      include: {
        users: true,
        messages: {
          include: {
            seen: true,
          },
        },
      },
    })
    // const lastMessage =
    //   updatedConversation.messages[updatedConversation.messages.length - 1]
    return NextResponse.json(newMessage)
  } catch (error) {
    console.log("ERROR_MESSAGE:", error)
    return new NextResponse("Error", { status: 500 })
  }
}
