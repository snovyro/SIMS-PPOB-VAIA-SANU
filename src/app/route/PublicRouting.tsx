/* eslint-disable prettier/prettier */
import React from "react"
import { Navigate, Outlet } from "react-router"
import { useSelector } from "react-redux"
import { setCredentials } from "../../features/authSlice"

const PublicRouting = () => {
  const credentials = useSelector(setCredentials)
  const token = credentials.payload.auth.token

  return !token ? <Outlet /> : <Navigate to="/login" />
}

export default PublicRouting
