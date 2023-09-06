/* eslint-disable prettier/prettier */
import React from "react"

export const InputField = (props: {
  onChange: any
  type: any
  logo: any
  placeholder: any
  value: any
  isDisabled?: boolean
  name?: string
}) => {
  const { onChange, type, logo, placeholder, value, isDisabled, name } = props
  return (
    <div className="relative mb-4">
      <span className="absolute inset-y-0 left-0 flex items-center pl-4">
        {logo}
      </span>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        min={0}
        className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sims-red pl-10 w-full"
        onChange={onChange}
        disabled={isDisabled}
      />
    </div>
  )
}
