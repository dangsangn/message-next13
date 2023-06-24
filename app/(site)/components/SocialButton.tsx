import React from "react"

type Props = {
  icon?: React.ReactNode
  onClick?: () => void
}

const SocialButton = ({ icon, onClick }: Props) => {
  return (
    <button
      className={
        "flex justify-center rounded-md px-3 w-full py-2 border-2 focus-visible:outline  focus-visible:outline-2  focus-visible:outline-offset-2 bg-white hover:bg-gray-100 focus-visible:border-gray-900"
      }
      onClick={onClick}
    >
      {icon}
    </button>
  )
}

export default SocialButton
