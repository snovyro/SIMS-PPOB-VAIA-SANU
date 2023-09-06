/* eslint-disable prettier/prettier */
import React from "react"

const BannerCard = (props: { key: string; name: string; image: string }) => {
  const { key, name, image } = props
  return (
    <div
      key={key}
      className="first:ml-0 h-40 flex ml-8 flex-row justify-start min-w-max hover:scale-105 hover:cursor-pointer transition duration-100 ease-in-out transform"
    >
      <img src={image} alt={name} className="w-full h-32" />
    </div>
  )
}

export default BannerCard
