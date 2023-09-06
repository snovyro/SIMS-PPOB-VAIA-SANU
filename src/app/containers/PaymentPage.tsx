/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { setCredentials } from "../../features/authSlice"
import { setPaymentItem } from "../../features/itemSlice"
import { toast, ToastContainer } from "react-toastify"
import { InputField } from "../components/InputField"
import { CiMoneyBill } from "react-icons/ci"
import ButtonTemplate from "../components/ButtonTemplate"
import UserBalance from "../components/UserBalance"
import Navbar from "../components/Navbar"
import API from "../../BaseAPI"
import axios from "axios"

const PaymentPage = () => {
  const [fullName, setFullName] = useState("")
  const [balance, setBalance] = useState(0)
  const credentials = useSelector(setCredentials)
  const token = credentials.payload.auth.token
  const paymentItems = useSelector(setPaymentItem)
  const item = paymentItems.payload.item

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

  const formatPrice = (price: number) => {
    return price.toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR",
    })
  }

  const handleBayar = async () => {
    try {
      const response = await axios.post(
        `${API}/transaction`,
        {
          service_code: item.service_code,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
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

  return (
    <div>
      <Navbar />
      <div className="flex justify-center flex-col items-center">
        <div className="w-10/12 flex-col">
          <UserBalance fullName={fullName} balance={formatPrice(balance)} />
          <p className="text-xl pt-4 text-gray-700">PemBayaran</p>
          <p className="text-xl font-semibold flex items-center">
            <img
              className="w-6 h-fit mr-2"
              src={item.service_icon}
              alt={item.service_name}
            />
            {item.service_name}
          </p>
          <div className="w-full pt-12">
            <InputField
              placeholder="Masukkan nominal Top Up"
              type="text"
              isDisabled
              value={item.service_tariff}
              logo={<CiMoneyBill />}
              onChange={undefined}
            />
            <ButtonTemplate
              type={undefined}
              className="text-xs"
              text="Bayar"
              onClick={handleBayar}
            />
          </div>
        </div>
      </div>
      <ToastContainer autoClose={1000} />
    </div>
  )
}

export default PaymentPage
