import React from "react"

type Props = {}

const Empty = (props: Props) => {
  return (
    <div className="h-full flex items-center justify-center">
      <h2 className="text-xl font-semibold text-center">
        Choose a conversation to chat
      </h2>
    </div>
  )
}

export default Empty
