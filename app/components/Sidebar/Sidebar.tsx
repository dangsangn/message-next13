import React from "react"
import DesktopSidebar from "./DesktopSidebar"
import MobileSidebar from "./MobileSidebar"
import { getCurrentUser } from "@/app/actions"

type Props = {
  children: React.ReactNode
}

const Sidebar = async ({ children }: Props) => {
  const currentUser = await getCurrentUser()

  return (
    <div className="h-full w-full">
      <DesktopSidebar user={currentUser} />
      <MobileSidebar />
      <div className="h-full lg:pl-20">{children}</div>
    </div>
  )
}

export default Sidebar
