/* eslint-disable prettier/prettier */
import React from "react"
import { Routes, Route } from "react-router-dom"

import LoginPage from "../containers/LoginPage"
import RegisterPage from "../containers/RegisterPage"
import HomePage from "../containers/HomePage"
import PrivateRouting from "./PrivateRouting"
import TopUpPage from "../containers/TopUpPage"
import TransactionPage from "../containers/TransactionPage"
import AccountPage from "../containers/AccountPage"
import PaymentPage from "../containers/PaymentPage"
import ProfilePage from "../containers/ProfilePage"

const Routing = () => {
  return (
    <div className="h-full w-full">
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route element={<PrivateRouting />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/top-up" element={<TopUpPage />} />
          <Route path="/transaction" element={<TransactionPage />} />
          <Route path="/payment/:slug" element={<PaymentPage />} />
          <Route path="/akun" element={<AccountPage />} />
          <Route path="/akun/edit" element={<ProfilePage />} />
        </Route>
      </Routes>
    </div>
  )
}

export default Routing
