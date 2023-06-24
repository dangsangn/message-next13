"use client"

import { useConversation } from "@/app/hooks"
import axios from "axios"
import { CldUploadButton } from "next-cloudinary"
import React from "react"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import { HiPaperAirplane } from "react-icons/hi"
import { HiPhoto } from "react-icons/hi2"
import MessageInput from "./MessageInput"

type Props = {}

const Form = (props: Props) => {
  const { conversationId } = useConversation()
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      message: "",
    },
  })

  const handleSubmitForm: SubmitHandler<FieldValues> = (data) => {
    setValue("message", "", { shouldValidate: true })
    axios.post("/api/messages", { ...data, conversationId })
  }

  const handleUpload = (result: any) => {
    console.log("result:", result)
    axios.post("/api/messages", {
      image: result.info.secure_url,
      conversationId,
    })
  }

  return (
    <div className="p-4 bg-white border-t flex items-center gap-2 lg:gap-4 w-full">
      <CldUploadButton
        options={{ maxFiles: 1 }}
        onUpload={handleUpload}
        uploadPreset="wskicd6v"
      >
        <HiPhoto size={30} className="text-sky-500" />
      </CldUploadButton>
      <form
        className="flex item-center gap-2 flex-1 lg:gap-4"
        onSubmit={handleSubmit(handleSubmitForm)}
      >
        <MessageInput
          id="message"
          register={register}
          errors={errors}
          required
          placeholder="Write a message"
        />
        <button
          type="submit"
          className="rounded-full p-2 bg-sky-500 cursor-pointer hover:bg-sky-600 transition"
        >
          <HiPaperAirplane size={18} className="text-white rotate-90" />
        </button>
      </form>
    </div>
  )
}

export default Form
