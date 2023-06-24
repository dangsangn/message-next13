import { prisma } from "@/app/libs"
import { getCurrentUser } from "./getCurrentUser"

export const getConversations = async () => {
  const currentUser = await getCurrentUser()
  if (!currentUser?.email) {
    return []
  }

  try {
    const conversations = await prisma.conversation.findMany({
      orderBy: {
        lastMessageAt: "desc",
      },
      where: {
        userIds: {
          has: currentUser.id,
        },
      },
      include: {
        users: true,
        messages: {
          include: { sender: true, seen: true },
        },
      },
    })

    return conversations
  } catch (error) {
    return []
  }
}
