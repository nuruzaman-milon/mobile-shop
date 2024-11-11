import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slice/authSlice'

const store = configureStore({
  reducer: {
    AUTH_LOGIN: authReducer,
  },
})

export { store }
