/* eslint-disable prettier/prettier */
import React from "react"

const TransactionCard = (props: {
  price: any
  date: string
  method: string
  key: any
}) => {
  const { price, date, method, key } = props
  return (
    <div
      className="w-full border border-gray-300 rounded py-4 px-6 flex justify-between"
      key={key}
    >
      <div className="flex-col flex gap-2">
        {method === "TOPUP" ? (
          <p className="text-xl font-semibold text-emerald-600">+ {price}</p>
        ) : (
          <p className="text-xl font-semibold text-red-600">- {price}</p>
        )}
        <p className="text-xs text-gray-400">{date}</p>
      </div>
      <p className="text-xs text-gray-400">{method}</p>
    </div>
  )
}

export default TransactionCard
