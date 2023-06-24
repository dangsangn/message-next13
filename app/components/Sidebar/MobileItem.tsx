import clsx from "clsx"
import Link from "next/link"
import React from "react"
import { IconType } from "react-icons/lib"

type Props = {
  label: string
  icon: IconType
  href?: string
  active?: boolean
  onClick?: () => void
}

const MobileItem = ({ label, icon: Icon, href, active, onClick }: Props) => {
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (onClick) {
      event.preventDefault()
      onClick()
    }
  }
  return (
    <Link
      href={href || ""}
      onClick={handleClick}
      className={clsx(
        "w-full group flex md:flex-col items-center justify-center gap-x-3 text-base font-bold px-3 py-2 rounded-t-2xl hover:bg-gray-400",
        active && "bg-gray-400"
      )}
    >
      <Icon className="h-6 w-6 shrink-0" />
      <span className="hidden md:block text-sm ">{label}</span>
    </Link>
  )
}

export default MobileItem
