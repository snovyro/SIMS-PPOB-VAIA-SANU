/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import UserBalance from "../components/UserBalance"
import axios from "axios"
import API from "../../BaseAPI"
import { useSelector } from "react-redux"
import { setCredentials } from "../../features/authSlice"
import { toast, ToastContainer } from "react-toastify"
import TransactionCard from "../components/TransactionCard"

const TransactionPage = () => {
  const [fullName, setFullName] = useState("")
  const [balance, setBalance] = useState(0)
  const [limit, setLimit] = useState(5)
  const [transactions, setTransactions] = useState([])
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

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          `${API}/transaction/history?offset=0&limit=${limit}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        setTransactions(response.data.data.records)
      } catch (error: any) {
        const errorMessage = error.response.data.message
        toast.error(errorMessage)
      }
    }
    getData()
  }, [token, limit])

  const formatPrice = (price: number) => {
    return price.toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR",
    })
  }

  const formatDate = (date: string) => {
    const dateObj = new Date(date)
    const month = dateObj.toLocaleString("id-ID", { month: "long" })
    const day = dateObj.toLocaleString("id-ID", { day: "numeric" })
    const year = dateObj.toLocaleString("id-ID", { year: "numeric" })
    const hour = dateObj.toLocaleString("id-ID", { hour: "numeric" })
    let minute = dateObj.toLocaleString("id-ID", { minute: "numeric" })

    if (minute.length === 1) {
      minute = "0" + minute
    }

    return `${day} ${month} ${year} ${hour}:${minute} WIB`
  }

  const handleShowMore = async () => {
    try {
      const response = await axios.get(
        `${API}/transaction/history?offset=0&limit=${limit}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      setLimit(limit + 5)
      setTransactions(response.data.data.records)
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
          <p className="text-xl py-4 font-semibold text-gray-700">
            Semua Transaksi
          </p>
          <div className="flex flex-col gap-4">
            {transactions.length > 0 ? (
              transactions.map((transaction: any, index: number) => {
                return (
                  <TransactionCard
                    key={index + 1}
                    price={formatPrice(transaction.total_amount)}
                    date={formatDate(transaction.created_on)}
                    method={transaction.transaction_type}
                  />
                )
              })
            ) : (
              <p className="text-center text-gray-400">Belum ada transaksi</p>
            )}
          </div>
          <div className="w-full py-8 flex justify-center">
            <p
              onClick={handleShowMore}
              className="w-fit font-semibold text-sims-red hover:cursor-pointer hover:text-sims-red-light"
            >
              Show more
            </p>
          </div>
        </div>
      </div>
      <ToastContainer autoClose={1000} />
    </div>
  )
}

export default TransactionPage
