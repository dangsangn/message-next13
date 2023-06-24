"use client"

import React, { useState, useCallback } from "react"
import { Avatar } from "@/app/components"
import { User } from "@prisma/client"
import axios from "axios"
import { useRouter } from "next/navigation"

type Props = {
  user: User
}

const UserBox = ({ user }: Props) => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleClick = useCallback(async () => {
    setLoading(true)
    axios
      .post("/api/conversations", {
        userId: user.id,
      })
      .then((response) => {
        router.push(`/conversations/${response.data.id}`)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [router, user.id])

  return (
    <div
      className="flex items-center w-full bg-white p-3 rounded-lg gap-2 cursor-pointer hover:bg-gray-200 transition"
      onClick={handleClick}
    >
      <Avatar user={user} />
      <p className="text-base font-semibold">{user.name}</p>
    </div>
  )
}

export default UserBox
