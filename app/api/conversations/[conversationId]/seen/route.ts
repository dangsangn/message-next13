import { getCurrentUser } from "@/app/actions"
import { NextResponse } from "next/server"
import { prisma } from "@/app/libs"

type IParams = {
  conversationId?: string
}

export const POST = async (
  request: Request,
  { params }: { params: IParams }
) => {
  try {
    const currentUser = await getCurrentUser()
    const { conversationId } = params
    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    //find existing conversation
    const conversation = await prisma.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        messages: {
          include: {
            seen: true,
          },
        },
        users: true,
      },
    })

    if (!conversation) {
      return new NextResponse("Server Error", { status: 400 })
    }

    //Find last message
    const lastMessage = conversation.messages[conversation.messages.length - 1]
    if (!lastMessage) {
      return NextResponse.json(conversation)
    }

    //update seen of last message
    const updateMessage = await prisma.message.update({
      where: { id: lastMessage.id },
      include: {
        sender: true,
        seen: true,
      },
      data: {
        seen: {
          connect: {
            id: currentUser.id,
          },
        },
      },
    })

    //if user has already seen the message, no need to go further
    if (lastMessage.seenIds.indexOf(currentUser.id) !== -1) {
      return NextResponse.json(conversation)
    }

    return new NextResponse("Success")
  } catch (error) {
    console.log("ERROR_MESSAGE_SEEN", error)
    return new NextResponse("Error", { status: 500 })
  }
}
