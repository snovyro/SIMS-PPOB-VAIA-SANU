/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { setCredentials } from "../../features/authSlice"
import { setPaymentItem, clearPaymentItem } from "../../features/itemSlice"
import { toast, ToastContainer } from "react-toastify"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import API from "../../BaseAPI"
import Navbar from "../components/Navbar"
import UserBalance from "../components/UserBalance"
import ServicesCard from "../components/ServicesCard"
import BannerCard from "../components/BannerCard"

const HomePage = () => {
  const [fullName, setFullName] = useState("")
  const [balance, setBalance] = useState(0)
  const [services, setServices] = useState([])
  const [banners, setBanners] = useState([])
  const credentials = useSelector(setCredentials)
  const token = credentials.payload.auth.token
  const navigate = useNavigate()
  const dispatch = useDispatch()

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
    const getServices = async () => {
      try {
        const response = await axios.get(`${API}/services`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setServices(response.data.data)
      } catch (error: any) {
        const errorMessage = error.response.data.message
        toast.error(errorMessage)
      }
    }
    getServices()
  }, [token])

  useEffect(() => {
    const getBanner = async () => {
      try {
        const response = await axios.get(`${API}/banner`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setBanners(response.data.data)
      } catch (error: any) {
        const errorMessage = error.response.data.message
        toast.error(errorMessage)
      }
    }
    getBanner()
  }, [token])

  const formatPrice = (price: number) => {
    return price.toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR",
    })
  }

  const toLowerCase = (string: string) => {
    return string.toLowerCase()
  }

  const handleDirect =
    (
      service_code: any,
      service_name: any,
      service_tariff: number,
      service_icon: any,
    ) =>
    () => {
      dispatch(clearPaymentItem())
      dispatch(
        setPaymentItem({
          service_code,
          service_name,
          service_tariff,
          service_icon,
        }),
      )

      navigate(`/payment/${toLowerCase(service_code)}`)
    }

  return (
    <div>
      <Navbar />
      <div className="flex justify-center flex-col items-center">
        <div className="w-10/12 flex-col">
          <UserBalance fullName={fullName} balance={formatPrice(balance)} />
          <div className="w-full flex justify-between py-8">
            {services.map((service: any) => (
              <div key={service.service_code}>
                <ServicesCard
                  onClick={handleDirect(
                    service.service_code,
                    service.service_name,
                    service.service_tariff,
                    service.service_icon,
                  )}
                  key={service.service_name}
                  icon={service.service_icon}
                  name={service.service_name}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <div className="w-full">
          <div className="flex">
            <div className="w-1/12"></div>
            <div className="w-11/12">
              <p className="font-semibold text-gray-800">
                Temukan promo menarik
              </p>
            </div>
          </div>
          <div className="overflow-y-hidden overflow-x-auto overscroll-x-auto scrollbar-hide pt-8">
            <div className="flex">
              <div className="w-1/12"></div>
              <div className="w-11/12 flex justify-start items-center">
                {banners.map((banner: any) => (
                  <BannerCard
                    key={banner.banner_name}
                    name={banner.banner_name}
                    image={banner.banner_image}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer autoClose={1000} />
    </div>
  )
}

export default HomePage
