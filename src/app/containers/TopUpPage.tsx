/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from "react"
import Navbar from "../components/Navbar"
import UserBalance from "../components/UserBalance"
import { useSelector } from "react-redux"
import { setCredentials } from "../../features/authSlice"
import { toast, ToastContainer } from "react-toastify"
import { InputField } from "../components/InputField"
import axios from "axios"
import API from "../../BaseAPI"
import { CiMoneyBill } from "react-icons/ci"
import ButtonTemplate from "../components/ButtonTemplate"

const TopUpPage = () => {
  const [amount, setAmount] = useState(NaN)
  const [fullName, setFullName] = useState("")
  const [balance, setBalance] = useState(0)
  const credentials = useSelector(setCredentials)
  const token = credentials.payload.auth.token

  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  useEffect(() => {
    const getProfile = async () => {
      try {
        const response = await axios.get(`${API}/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setFullName(
          capitalizeFirstLetter(response.data.data.first_name) +
            " " +
            capitalizeFirstLetter(response.data.data.last_name),
        )
      } catch (error: any) {
        const errorMessage = error.response.data.message
        toast.error(errorMessage)
      }
    }
    getProfile()
  }, [token])

  useEffect(() => {
    const getBalance = async () => {
      try {
        const response = await axios.get(`${API}/balance`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setBalance(response.data.data.balance)
      } catch (error: any) {
        const errorMessage = error.response.data.message
        toast.error(errorMessage)
      }
    }
    getBalance()
  }, [token])

  const handleTopUp = async (e: any) => {
    try {
      const response = await axios.post(
        `${API}/topup`,
        { top_up_amount: amount },
        { headers: { Authorization: `Bearer ${token}` } },
      )
      const successMessage = response.data.message
      toast.success(successMessage)
      try {
        const response = await axios.get(`${API}/balance`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setBalance(response.data.data.balance)
      } catch (error: any) {
        const errorMessage = error.response.data.message
        toast.error(errorMessage)
      }
    } catch (error: any) {
      const errorMessage = error.response.data.message
      toast.error(errorMessage)
    }
  }

  const formatPrice = (price: number) => {
    return price.toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR",
    })
  }

  const handleAmountChange = (e: any) => {
    setAmount(e.target.value)
  }

  const handleAmount10K = () => {
    setAmount(10000)
  }

  const handleAmount20K = () => {
    setAmount(20000)
  }

  const handleAmount50K = () => {
    setAmount(50000)
  }

  const handleAmount100K = () => {
    setAmount(100000)
  }

  const handleAmount250K = () => {
    setAmount(250000)
  }

  const handleAmount500K = () => {
    setAmount(500000)
  }

  return (
    <div>
      <Navbar />
      <div className="flex justify-center flex-col items-center">
        <div className="w-10/12 flex-col">
          <UserBalance fullName={fullName} balance={formatPrice(balance)} />
          <p className="text-xl pt-4">Silahkan masukkan</p>
          <p className="text-3xl font-semibold">Nominal Top Up</p>
          <div className="w-11/12 pt-12">
            <div className="flex">
              <div className="w-3/5">
                <InputField
                  placeholder="Masukkan nominal Top Up"
                  type="number"
                  onChange={handleAmountChange}
                  value={amount}
                  logo={<CiMoneyBill />}
                />
              </div>
              <div className="w-2/5 pl-4 flex gap-4">
                <div className="w-1/3">
                  <ButtonTemplate
                    onClick={handleAmount10K}
                    className="bg-white !text-black border font-normal border-gray-300 text-xs py-3 hover:bg-white hover:border-sims-red hover:text-sims-red"
                    type="submit"
                    text="Rp 10.000"
                  />
                </div>
                <div className="w-1/3">
                  <ButtonTemplate
                    onClick={handleAmount20K}
                    className="bg-white !text-black border font-normal border-gray-300 text-xs py-3 hover:bg-white hover:border-sims-red hover:text-sims-red"
                    type="submit"
                    text="Rp 20.000"
                  />
                </div>
                <div className="w-1/3">
                  <ButtonTemplate
                    onClick={handleAmount50K}
                    className="bg-white !text-black border font-normal border-gray-300 text-xs py-3 hover:bg-white hover:border-sims-red hover:text-sims-red"
                    type="submit"
                    text="Rp 50.000"
                  />
                </div>
              </div>
            </div>
            <div></div>
          </div>
          <div className="w-11/12">
            <div className="flex">
              <div className="w-3/5">
                <ButtonTemplate
                  onClick={handleTopUp}
                  className="bg-text-xs py-3"
                  type="submit"
                  text="Top Up"
                  isDisabled={
                    amount < 10000 || amount > 1000000 || isNaN(amount)
                  }
                />
              </div>
              <div className="w-2/5 pl-4 flex gap-4">
                <div className="w-1/3">
                  <ButtonTemplate
                    onClick={handleAmount100K}
                    className="bg-white !text-black border font-normal border-gray-300 text-xs py-3 hover:bg-white hover:border-sims-red hover:text-sims-red"
                    type="submit"
                    text="Rp 100.000"
                  />
                </div>
                <div className="w-1/3">
                  <ButtonTemplate
                    onClick={handleAmount250K}
                    className="bg-white !text-black border font-normal border-gray-300 text-xs py-3 hover:bg-white hover:border-sims-red hover:text-sims-red"
                    type="submit"
                    text="Rp 250.000"
                  />
                </div>
                <div className="w-1/3">
                  <ButtonTemplate
                    onClick={handleAmount500K}
                    className="bg-white !text-black border font-normal border-gray-300 text-xs py-3 hover:bg-white hover:border-sims-red hover:text-sims-red"
                    type="submit"
                    text="Rp 500.000"
                  />
                </div>
              </div>
            </div>
            <div></div>
          </div>
        </div>
      </div>
      <ToastContainer autoClose={1000} />
    </div>
  )
}

export default TopUpPage
