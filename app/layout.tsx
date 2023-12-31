import { Inter } from "next/font/google"
import AuthContext from "./context/AuthContext"
import "./globals.css"
import ToasterContext from "./context/ToasterContext"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Messenger",
  description: "Generated by create next app",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToasterContext />
        <AuthContext>{children}</AuthContext>
      </body>
    </html>
  )
}
