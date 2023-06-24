import React from "react"
import UserBox from "./UserBox"
import { User } from "@prisma/client"

type Props = {
  users: User[]
}

const UserList = ({ users }: Props) => {
  return (
    <div className="fixed inset-y-0 pb-20 overflow-y-auto border-r border-r-gray-200 w-full left-0 lg:pb-0 lg:left-20 lg:w-80 lg:block">
      <div className="px-5">
        <h3 className="text-xl font-semibold py-4">People</h3>
        {users.map((user) => (
          <UserBox key={user.id} user={user} />
        ))}
      </div>
    </div>
  )
}

export default UserList
