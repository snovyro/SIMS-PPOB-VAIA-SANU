/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { setCredentials } from "../../features/authSlice"
import { toast, ToastContainer } from "react-toastify"
import { BsFillPencilFill } from "react-icons/bs"
import { AiOutlineUser } from "react-icons/ai"
import { InputField } from "../components/InputField"
import { useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar"
import axios from "axios"
import API from "../../BaseAPI"
import profileImage from "../assets/Profile Photo.png"
import ButtonTemplate from "../components/ButtonTemplate"

const ProfilePage = () => {
  const [fullName, setFullName] = useState("")
  const [userData, setUserData] = useState({
    first_name: "",
    last_name: "",
    email: "",
  })
  const [staticUserData, setStaticUserData] = useState({
    first_name: "",
    last_name: "",
    email: "",
  })
  const [image, setImage] = useState(null)
  const credentials = useSelector(setCredentials)
  const token = credentials.payload.auth.token
  const navigate = useNavigate()

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
        setUserData(response.data.data)
        setStaticUserData(response.data.data)
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

  const handleImageChange = (e: any) => {
    setImage(e.target.files[0])
    if (e.target.files[0].size > 100000) {
      toast.error("Ukuran gambar terlalu besar")
    } else {
      handleHitImage(e)
    }
  }

  const handleHitImage = async (e: any) => {
    try {
      const response = await axios.put(
        `${API}/profile/image`,
        {
          file: image,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        },
      )
      toast.success(response.data.message)
    } catch (error: any) {
      const errorMessage = error.response.data.message
      toast.error(errorMessage)
    }
  }

  const handleFormChange = (e: any) => {
    const { name, value } = e.target
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }))
  }

  const handleSaveChanges = async () => {
    try {
      const response = await axios.put(
        `${API}/profile/update`,
        {
          first_name: userData.first_name,
          last_name: userData.last_name,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      toast.success(response.data.message)
      setStaticUserData(response.data.data)
      setUserData(response.data.data)
      setTimeout(() => {
        navigate("/akun")
      }, 1750)
    } catch (error: any) {
      const errorMessage = error.response.data.message
      toast.error(errorMessage)
    }
  }

  return (
    <div>
      <Navbar />
      <div className="flex justify-center items-center">
        <div className="w-7/12 flex-col flex justify-center items-center py-8">
          <label className="relative">
            <img
              src={profileImage}
              alt="profile"
              className="w-24 rounded-full border cursor-pointer border-gray-300"
              onChange={handleImageChange}
            />
            <input
              type="file"
              accept=".jpeg, .png"
              max={1}
              className="mt-4 absolute opacity-0 w-2/12 h-2/12 cursor-pointer"
              onChange={handleImageChange}
            />
            <div className="absolute bottom-0 right-0 rounded-full p-2 cursor-pointer border text-gray-400 hover:bg-gray-300 transition duration-100 ease-in-out bg-white border-gray-300">
              <BsFillPencilFill />
            </div>
          </label>
          <p className="py-2 text-3xl font-semibold">{fullName}</p>
          <div className="w-full">
            <p className="py-2">Email</p>
            <InputField
              name="email"
              onChange={handleFormChange}
              type="email"
              placeholder={staticUserData.email}
              logo="@"
              isDisabled
              value={userData.email}
            />
            <p className="pb-2">Nama Depan</p>
            <InputField
              name="first_name"
              onChange={handleFormChange}
              type="text"
              placeholder={staticUserData.first_name}
              logo={<AiOutlineUser />}
              value={userData.first_name}
            />
            <p className="pb-2">Nama Belakang</p>
            <InputField
              name="last_name"
              onChange={handleFormChange}
              type="text"
              placeholder={staticUserData.last_name}
              logo={<AiOutlineUser />}
              value={userData.last_name}
            />
            <ButtonTemplate
              onClick={handleSaveChanges}
              className="mb-4 mt-2"
              type="submit"
              text="Simpan"
            />
          </div>
        </div>
      </div>
      <ToastContainer autoClose={1000} />
    </div>
  )
}

export default ProfilePage
