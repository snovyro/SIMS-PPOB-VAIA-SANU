/* eslint-disable prettier/prettier */
import { createSlice } from "@reduxjs/toolkit"

const itemSlice = createSlice({
  name: "item",
  initialState: {
    service_code: null,
    service_name: null,
    service_tariff: 0,
    service_icon: null,
  },
  reducers: {
    setPaymentItem: (state, action) => {
      const { service_code, service_name, service_tariff, service_icon } =
        action.payload
      state.service_code = service_code
      state.service_name = service_name
      state.service_tariff = service_tariff
      state.service_icon = service_icon
    },
    clearPaymentItem: (state) => {
      state.service_code = null
      state.service_name = null
      state.service_tariff = 0
      state.service_icon = null
    },
  },
})

export const { setPaymentItem, clearPaymentItem } = itemSlice.actions
export default itemSlice.reducer
export const selectPaymentItem = (state: {
  item: {
    service_code: any
    service_name: any
    service_price: any
    service_icon: any
  }
}) => state.item
