"use client"

import React, { Fragment } from "react"
import { Conversation, User } from "@prisma/client"
import { Dialog, Transition } from "@headlessui/react"

type Props = {
  isOpen: boolean
  onClose: () => void
  data: Conversation & {
    users: User[]
  }
}

const ProfileDrawer = ({ isOpen, onClose, data }: Props) => {
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-40"></div>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  )
}

export default ProfileDrawer
