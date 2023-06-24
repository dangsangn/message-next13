import { useSession } from "next-auth/react"
import { useMemo } from "react"
import { FullConversation } from "../types"
import { User } from "@prisma/client"

export const useOtherUser = (
  conversation: FullConversation | { users: User[] }
) => {
  const session = useSession()

  const other = useMemo(() => {
    return conversation.users.filter(
      (user) => user.email !== session.data?.user?.email
    )[0]
  }, [conversation.users, session])

  return other
}
