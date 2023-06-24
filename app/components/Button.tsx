import React from "react"
import clsx from "clsx"

type Props = {
  type?: "button" | "submit" | "reset" | undefined
  fullWidth?: boolean
  children?: React.ReactNode
  onClick?: () => {}
  disabled?: boolean
  secondary?: boolean
  danger?: boolean
}

const Button = ({
  fullWidth,
  children,
  onClick,
  disabled,
  secondary,
  danger,
  type = "button",
}: Props) => {
  return (
    <button
      type={type}
      className={clsx(
        "flex justify-center rounded-md px-3  py-2 text-sm font-semibold focus-visible:outline  focus-visible:outline-2  focus-visible:outline-offset-2 bg-sky-500 hover:bg-sky-600 focus-visible:outline-sky-600",
        disabled && "opacity-50 cursor-default",
        fullWidth && "w-full",
        secondary ? "text-gray-900" : "text-white",
        danger && "bg-rose-500 hover:bg-rose-600 focus-visible:outline-rose-600"
      )}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button
