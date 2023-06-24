"use client"

import React, { useState } from "react"
import clsx from "clsx"
import Image from "next/image"
import { format } from "date-fns"
import { useSession } from "next-auth/react"
import { FullMessage } from "@/app/types"
import { Avatar } from "@/app/components"
import ImageModal from "./ImageModal"

type Props = {
  data: FullMessage
  isLast?: boolean
}

const MessageBox = ({ data, isLast }: Props) => {
  const session = useSession()
  const [imageModalOpen, setImageModalOpen] = useState(false)
  const isOwn = session.data?.user?.email === data?.sender?.email
  const seenList = (data.seen || [])
    .filter((user) => user.email !== data?.sender?.email)
    .map((user) => user.name)
    .join(", ")

  return (
    <div className={clsx("flex gap-3 p-4", isOwn && "justify-end")}>
      <div className={clsx(isOwn && "order-2")}>
        <Avatar user={data.sender} />
      </div>
      <div className={clsx("flex flex-col gap-2", isOwn && "items-end")}>
        <div className="flex items-center gap-1">
          <p className="text-gray-500">{data.sender.name}</p>
          <p className="text-sm">{format(new Date(data.createdAt), "p")}</p>
        </div>
        <div
          className={clsx(
            "text-sm w-fit overflow-hidden",
            isOwn ? "bg-sky-500 text-white" : "bg-gray-100",
            data.image ? "rounded-md p-0" : "rounded-full py-2 px-3"
          )}
        >
          <ImageModal
            src={data.image}
            isOpen={imageModalOpen}
            onClose={() => setImageModalOpen(false)}
          />
          {data.image ? (
            <Image
              alt="Image"
              height="288"
              width="288"
              onClick={() => setImageModalOpen(true)}
              src={data.image}
              className="object-cover cursor-pointer hover:scale-110 transition translate"
            />
          ) : (
            <p>{data.body}</p>
          )}
        </div>
        {isLast && isOwn && seenList.length > 0 && (
          <p className="text-sx font-light text-gray-500">{`Seen ny ${seenList}`}</p>
        )}
      </div>
    </div>
  )
}

export default MessageBox
