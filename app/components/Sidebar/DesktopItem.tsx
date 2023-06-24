import clsx from "clsx"
import Link from "next/link"
import { useRouter } from "next/navigation"
import React from "react"
import { IconType } from "react-icons/lib"

type Props = {
  label: string
  icon: IconType
  href?: string
  active?: boolean
  onClick?: () => void
}

const DesktopItem = ({ label, icon: Icon, href, active, onClick }: Props) => {
  const router = useRouter()

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
        "group flex items-center gap-x-3 rounded-md bg-gray-100 text-base font-bold p-3  hover:bg-gray-200",
        active && "bg-gray-300"
      )}
    >
      <Icon className="h-6 w-6 shrink-0" />
      <span className="sr-only">{label}</span>
    </Link>
  )
}

export default DesktopItem
