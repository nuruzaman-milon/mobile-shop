import { createSlice } from '@reduxjs/toolkit'
import jsCoockie from 'js-cookie'

// Create a slice of state for authentication and authorization using email and password with Redux Toolkit
const authSlice = createSlice({
  name: 'AUTH_LOGIN',
  initialState: {
    token: jsCoockie.get('token') || '',
    user: jsCoockie.get('user') || {},
  },
  reducers: {
    login: (state, action) => {
      jsCoockie.set('token', action.payload.token, {
        // expire in 10 hours
        expires: 10 * 60 * 60,
        // httpOnly: process.NEXT_ENV === 'development' ? false : true,
        // secure: process.NEXT_ENV === 'development' ? false : true,
      })
      jsCoockie.set('user', JSON.stringify(action.payload.user), {
        expires: 10 * 60 * 60,
        // httpOnly: process.NEXT_ENV === 'development' ? false : true,
        // secure: process.NEXT_ENV === 'development' ? false : true,
      })
      state.token = action.payload.token
      state.user = action.payload.user
    },
    logout: (state) => {
      jsCoockie.remove('token')
      jsCoockie.remove('user')
      state.token = ''
      state.user = {}
    },
    checkAuth: (state) => {
      const token = jsCoockie.get('token')
      const user = jsCoockie.get('user')
      if (token && user) {
        state.token = token
        state.user = JSON.parse(user)
      } else {
        state.token = ''
        state.user = {}
      }
    },
  },
})

export const { login, logout, checkAuth } = authSlice.actions

export const selectToken = (state) => state.AUTH_LOGIN.token
export const selectUser = (state) => state.AUTH_LOGIN.user

export default authSlice.reducer
