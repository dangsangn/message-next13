import Image from "next/image"
import React from "react"
import AuthForm from "./components/AuthForm"

type Props = {}

const Home = (props: Props) => {
  return (
    <div className="w-full min-h-full h-[100vh] flex flex-col items-center justify-center bg-slate-100">
      <Image src="/images/logo.png" width="48" height="48" alt="logo" />
      <h1 className="text-2xl font-bold mt-2">Sign in to your account</h1>
      <div className="w-full sm:w-[400px] sm:mx-auto mt-4 ">
        <AuthForm />
      </div>
    </div>
  )
}

export default Home
