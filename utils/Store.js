import Cookies from 'js-cookie'
import { createContext, useReducer } from 'react'

const initialState = {
  orderInfo: Cookies.get('orderInfo')
    ? JSON.parse(Cookies.get('orderInfo'))
    : null,
  userInfo: Cookies.get('userInfo')
    ? JSON.parse(Cookies.get('userInfo'))
    : null,
}

const Store = createContext(initialState)

const { Provider } = Store

const reducer = (state, action) => {
  switch (action.type) {
    case 'ORDER_SET':
      return { ...state, orderInfo: action.payload }
    case 'USER_LOGIN':
      return { ...state, userInfo: action.payload }
    case 'USER_LOGOUT':
      return { ...state, userInfo: null }
    default:
      return state
  }
}

const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const value = { state, dispatch }
  return <Provider value={value}>{children}</Provider>
}

export { Store, StoreProvider }
