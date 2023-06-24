import { prisma } from "@/app/libs"
import { getSession } from "./getSession"

export const getUsers = async () => {
  try {
    const session = await getSession()
    if (!session?.user?.email) {
      return []
    }

    const users = await prisma.user.findMany({
      orderBy: {
        created: "desc",
      },
      where: {
        NOT: {
          email: session.user.email,
        },
      },
    })
    return users
  } catch (error) {
    return []
  }
}
