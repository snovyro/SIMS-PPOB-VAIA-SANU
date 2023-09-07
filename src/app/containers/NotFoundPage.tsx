/* eslint-disable prettier/prettier */
import React from "react"
import { useNavigate } from "react-router-dom"

const NotFoundPage = () => {
  const navigate = useNavigate()

  const handleRedirect = () => {
    navigate("/")
  }

  return (
    <div className="w-screen h-screen justify-center items-center flex flex-col">
      <h1 className="text-9xl font-semibold">404</h1>
      <h1 className="text-xl font-semibold">not found :(</h1>
      <p
        className="text-sims-red hover:cursor-pointer hover:text-sims-red-light mt-8"
        onClick={handleRedirect}
      >
        Klik untuk kembali
      </p>
    </div>
  )
}

export default NotFoundPage
