/* eslint-disable prettier/prettier */
import React, { useState } from "react"
import profileImage from "../assets/Profile Photo.png"
import bannerImage from "../assets/Background Saldo.png"

const UserBalance = (props: { fullName: string; balance: any }) => {
  const [showBalance, setShowBalance] = useState(false)

  const toggleShowBalance = () => {
    setShowBalance(!showBalance)
  }

  const { fullName, balance } = props
  return (
    <div className="w-full flex">
      <div className="w-2/5 py-8">
        <div className="flex flex-col items-left">
          <img
            src={profileImage}
            alt="profile"
            className="w-16 h-16 rounded-full mb-4"
          />
          <p className="text-xl">Selamat datang,</p>
          <p className="text-3xl font-semibold">{fullName}</p>
        </div>
      </div>
      <div className="w-3/5 py-8 relative">
        <div className="text-white z-10 absolute h-36 px-6 py-4 flex flex-col justify-evenly">
          <p className="font-semibold">Saldo anda</p>
          {showBalance ? (
            <p className="font-bold text-3xl">{balance}</p>
          ) : (
            <p className="font-bold text-3xl">Rp ••••••</p>
          )}
          <p className="font-semibold text-xs w-64 bg-[#f03e2e] flex items-center gap-2">
            Lihat Saldo{" "}
            <button type="button" onClick={toggleShowBalance}>
              {showBalance ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5 text-white cursor-pointer"
                >
                  <circle cx="12" cy="12" r="3" />
                  <path d="M17.6 17.6L12 12" />
                  <path d="M2 12s4-8 10-8s10 8 10 8s-4 8-10 8s-10-8-10-8z" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5 text-white cursor-pointer"
                >
                  <path d="M12 17.3l-2.5-2.5a2 2 0 0 1 2.8-2.8L12 11.7l2.5-2.5a2 2 0 0 1 2.8 2.8L14.8 12l2.5 2.5a2 2 0 0 1-2.8 2.8L12 14.3z" />
                  <path d="M19 12h-2.1" />
                  <path d="M3.9 12H2" />
                </svg>
              )}
            </button>
          </p>
        </div>
        <img
          src={bannerImage}
          alt="background saldo"
          className="w-full h-36 top-0 left-0"
        />
      </div>
    </div>
  )
}

export default UserBalance
