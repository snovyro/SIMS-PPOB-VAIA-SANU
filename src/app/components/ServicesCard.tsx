/* eslint-disable prettier/prettier */
import React from "react"

const ServicesCard = (props: {
  key: any
  icon: string
  name: string
  onClick: any
}) => {
  const { key, icon, name, onClick } = props
  return (
    <div
      key={key}
      className="text-center flex flex-col items-center hover:scale-105 hover:cursor-pointer"
      onClick={onClick}
    >
      <div className="bg-white rounded-lg shadow max-w-fit h-fit">
        <img src={icon} alt={name} />
      </div>
      <p className="text-xs w-20 pt-2">{name}</p>
    </div>
  )
}

export default ServicesCard
