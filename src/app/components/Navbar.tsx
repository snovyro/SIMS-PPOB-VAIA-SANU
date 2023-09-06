/* eslint-disable prettier/prettier */
import React from "react"
import { useNavigate, useLocation } from "react-router-dom"

const Navbar = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const handleHomePage = () => {
    navigate("/")
  }

  const handleTopUp = () => {
    navigate("/top-up")
  }

  const handleTransaction = () => {
    navigate("/transaction")
  }

  const handleAkun = () => {
    navigate("/akun")
  }

  const isTopUp = location.pathname === "/top-up"
  const isTransaction = location.pathname === "/transaction"
  const isAkun = location.pathname === "/akun"

  return (
    <div className="bg-white w-full h-fit shadow m-0 flex justify-center items-center sticky top-0 z-50">
      <div className="w-10/12 h-full py-5 flex items-center justify-between font-semibold">
        <p
          className="flex gap-2 font-semibold hover:cursor-pointer"
          onClick={handleHomePage}
        >
          <img src="/assets/Logo.png" alt="Logo" className="w-6 h-6" />
          SIMS PPOB
        </p>
        <div className="flex gap-16">
          <p
            className={`hover:cursor-pointer ${
              isTopUp ? "text-sims-red-light" : ""
            }`}
            onClick={handleTopUp}
          >
            Top Up
          </p>
          <p
            className={`hover:cursor-pointer ${
              isTransaction ? "text-sims-red-light" : ""
            }`}
            onClick={handleTransaction}
          >
            Transaction
          </p>
          <p
            className={`hover:cursor-pointer ${
              isAkun ? "text-sims-red-light" : ""
            }`}
            onClick={handleAkun}
          >
            Akun
          </p>
        </div>
      </div>
    </div>
  )
}

export default Navbar
