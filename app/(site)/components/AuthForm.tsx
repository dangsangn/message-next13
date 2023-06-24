"use client"

import { useRouter } from "next/navigation"
import { Button, Input } from "@/app/components"
import React, { useEffect, useState } from "react"
import { useForm, FieldValues } from "react-hook-form"
import SocialButton from "./SocialButton"
import { BsGoogle, BsGithub } from "react-icons/bs"
import axios from "axios"
import { signIn, useSession } from "next-auth/react"

type Variant = "LOGIN" | "REGISTER"

const AuthForm = () => {
  const router = useRouter()
  const session = useSession()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: { name: "", email: "", password: "" },
  })
  const [variant, setVariant] = useState<Variant>("LOGIN")
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    if (session.data) {
      router.push("/users")
    }
  }, [session, router])

  const handleChangeVariant = () => {
    setVariant((pre) => (pre === "LOGIN" ? "REGISTER" : "LOGIN"))
  }

  const handleSubmitForm = (data: FieldValues) => {
    setLoading(true)
    if (variant === "REGISTER") {
      axios
        .post("/api/register", data)
        .then(() => {
          signIn("credentials", { ...data, redirect: false }).then(() => {
            router.push("/users")
          })
        })
        .finally(() => {
          setLoading(false)
        })
    } else {
      signIn("credentials", { ...data, redirect: false })
        .then(() => {
          router.push("/users")
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }

  const handleLoginSocial = (social: string) => {
    setLoading(true)
    signIn(social, { redirect: false })
      .then(() => {
        router.push("/users")
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <div className="px-4 py-6 bg-white rounded-md">
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        {variant === "REGISTER" && (
          <Input
            className="mb-2"
            label="Full name"
            id="name"
            register={register}
            type="text"
            errors={errors}
            disabled={loading}
          />
        )}
        <Input
          className="mb-2"
          label="Email"
          id="email"
          register={register}
          type="email"
          errors={errors}
          disabled={loading}
        />
        <Input
          className="mb-6"
          label="Password"
          id="password"
          register={register}
          type="password"
          errors={errors}
          disabled={loading}
        />
        <Button type="submit" fullWidth disabled={loading}>
          {variant === "LOGIN" ? "Login" : "Register"}
        </Button>
      </form>
      <div className="mt-4 relative flex justify-center">
        <div className="absolute left-0 right-0 top-[50%] translate-y-[-50%] border-t"></div>
        <div className="bg-white px-1 text-base relative z-10">
          Or continue with
        </div>
      </div>
      <div className="flex gap-4 mt-4">
        <SocialButton
          icon={<BsGoogle />}
          onClick={() => handleLoginSocial("google")}
        />
        <SocialButton
          icon={<BsGithub />}
          onClick={() => handleLoginSocial("github")}
        />
      </div>
      <div className="flex gap-2 justify-center mt-4">
        <p>
          {variant !== "LOGIN" ? "Already have account?" : "New to Messenger?"}
        </p>
        <p className="underline cursor-pointer" onClick={handleChangeVariant}>
          {variant !== "LOGIN" ? "Login" : "Create an account"}
        </p>
      </div>
    </div>
  )
}

export default AuthForm
