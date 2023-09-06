/* eslint-disable prettier/prettier */
import React from "react"

const ButtonTemplate = (props: {
  onClick: any
  text: any
  type: any
  className?: string
  isDisabled?: boolean
}) => {
  const { text, className, onClick, isDisabled, type } = props
  const buttonClasses = `${className} p-3.5 bg-sims-red text-white rounded w-full text-sm font-bold text-center hover:cursor-pointer 
  ${
    isDisabled
      ? "bg-zinc-300 hover:cursor-not-allowed"
      : "hover:bg-sims-red-light"
  }`
  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={!isDisabled ? onClick : undefined}
    >
      {text}
    </button>
  )
}

export default ButtonTemplate
