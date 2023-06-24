import React from "react"
import { Sidebar } from "../components/Sidebar"
import UserList from "./components/UserList"
import { getUsers } from "../actions"

type Props = {
  children: React.ReactNode
}

const layout = async ({ children }: Props) => {
  const users = await getUsers()
  return (
    // @ts-expect-error Server Component
    <Sidebar>
      <div className="h-full">
        <UserList users={users} />
        {children}
      </div>
    </Sidebar>
  )
}

export default layout
