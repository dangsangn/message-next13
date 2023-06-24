import { useParams } from "next/navigation"
import { useMemo } from "react"

export const useConversation = () => {
  const params = useParams()

  return useMemo(
    () => ({
      conversationId: params?.conversationId || "",
      isOpen: !!params?.conversationId,
    }),
    [params]
  )
}
