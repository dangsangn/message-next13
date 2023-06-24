"use client"

import { useRoutes } from "@/app/hooks"
import React from "react"
import MobileItem from "./MobileItem"

type Props = {}

const MobileSidebar = (props: Props) => {
  const routes = useRoutes()
  return (
    <div className="fixed left-0 right-0 bottom-0 lg:hidden">
      <div className=" flex justify-around items-center w-full bg-gray-300">
        {routes.map((item) => (
          <MobileItem
            key={item.label}
            label={item.label}
            icon={item.icon}
            href={item.href}
            active={item.active}
            onClick={item.onClick}
          />
        ))}
      </div>
    </div>
  )
}

export default MobileSidebar
