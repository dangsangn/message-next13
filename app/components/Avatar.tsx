import Image from "next/image"
import React from "react"
import { User } from "@prisma/client"
type Props = {
  user: User
}

const Avatar = ({ user }: Props) => {
  return (
    <div className="relative cursor-pointer">
      <div className="relative w-9 h-9 md:w-11 md:h-11 rounded-full overflow-hidden">
        <Image
          fill
          src={user?.image || "/images/placeholder.jpg"}
          alt="Avatar"
        />
      </div>
      <div className="absolute w-2 h-2 md:w-3 md:h-3 rounded-full bg-green-500 top-0 right-0" />
    </div>
  )
}

export default Avatar
