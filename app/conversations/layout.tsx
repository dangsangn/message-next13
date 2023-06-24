import { getConversations, getUsers } from "../actions"
import { Sidebar } from "../components/Sidebar"
import ConversationsList from "./components/ConversationsList"

export default async function layout({
  children,
}: {
  children: React.ReactNode
}) {
  const conversations = await getConversations()
  const users = await getUsers()

  return (
    // @ts-expect-error Server Component
    <Sidebar>
      <div className="h-full w-full">
        <ConversationsList
          title="Message"
          users={users}
          conversations={conversations}
        />
        {children}
      </div>
    </Sidebar>
  )
}
