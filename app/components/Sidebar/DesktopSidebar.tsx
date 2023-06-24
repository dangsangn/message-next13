"use client"

import { useRoutes } from "@/app/hooks"
import DesktopItem from "./DesktopItem"
import Image from "next/image"
import Avatar from "../Avatar"

type Props = {
  user: any
}

const DesktopSidebar = ({ user }: Props) => {
  const routes = useRoutes()

  return (
    <div className="hidden lg:fixed lg:left-0 lg:top-0 lg:bottom-0 lg:w-20 lg:flex lg:flex-col lg:items-center lg:justify-between lg:py-4 border-r-[1px]">
      <div className=" flex flex-col items-center gap-4">
        {routes.map((item) => (
          <DesktopItem
            key={item.label}
            label={item.label}
            icon={item.icon}
            href={item.href}
            active={item.active}
            onClick={item.onClick}
          />
        ))}
      </div>
      <div className="mt-auto mb-4">
        <Avatar user={user} />
      </div>
    </div>
  )
}

export default DesktopSidebar
