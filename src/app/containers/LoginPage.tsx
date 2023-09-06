/* eslint-disable prettier/prettier */
import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { setCredentials } from "../../features/authSlice"
import { Link, useNavigate } from "react-router-dom"
import { ToastContainer, toast } from "react-toastify"
import axios from "axios"
import API from "../../BaseAPI"
import logo from "../assets/Logo.png"
import IllustrasiLogin from "../assets/Illustrasi Login.png"
import ButtonTemplate from "../components/ButtonTemplate"
import { RiLockPasswordLine } from "react-icons/ri"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { InputField } from "../components/InputField"

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const toggleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handlePasswordChange = (e: { target: any }) => {
    setPassword(e.target.value)
  }

  const handleEmailChange = (e: { target: any }) => {
    setEmail(e.target.value)
  }

  const handleLogin = async (e: { preventDefault: any }) => {
    try {
      const response = await axios.post(`${API}/login`, {
        email,
        password,
      })
      dispatch(
        setCredentials({
          token: response.data.data.token,
        }),
      )
      const successMessage = response.data.message
      toast.success(successMessage)
      setTimeout(() => {
        navigate("/")
      }, 1750)
    } catch (error: any) {
      const errorMessage = error.response.data.message
      toast.error(errorMessage)
    }
  }

  return (
    <div className="w-screen h-screen flex">
      <div className="w-1/2 h-screen bg-white flex justify-center">
        <div className="flex flex-col justify-center items-center h-full w-2/3">
          <div className="flex flex-col items-center w-2/3 text-gray-900">
            <p className="text-3xl font-semibold mb-8 flex items-center gap-2">
              <span>
                <img src={logo} alt="Logo" />
              </span>
              SIMS PPOB
            </p>
            <p className="text-4xl mb-8 text-center font-semibold">
              Masuk atau buat akun untuk memulai
            </p>
          </div>
          <div className="flex flex-col w-2/3 mb-4">
            <InputField
              type="email"
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
              logo="@"
            />
            <div className="relative mb-8">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4">
                <RiLockPasswordLine />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sims-red pl-10 w-full"
                value={password}
                onChange={handlePasswordChange}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pr-4"
                onClick={toggleShowPassword}
              >
                {showPassword ? (
                  <AiOutlineEye className="w-5 h-5 text-gray-400 cursor-pointer" />
                ) : (
                  <AiOutlineEyeInvisible className="w-5 h-5 text-gray-400 cursor-pointer" />
                )}
              </button>
            </div>
            <ButtonTemplate
              type="submit"
              onClick={handleLogin}
              className="mb-8"
              text="Masuk"
            />
            <p className="text-center text-gray-400 text-sm">
              belum punya akun? registrasi
              <Link
                to="/register"
                className="text-sims-red font-bold hover:cursor-pointer hover:text-sims-red-light"
              >
                {" "}
                di sini
              </Link>
            </p>
          </div>
        </div>
      </div>
      <img
        src={IllustrasiLogin}
        alt="Illustrasi Login"
        className="w-1/2 h-full object-cover"
      />
      <ToastContainer autoClose={1000} />
    </div>
  )
}

export default LoginPage
