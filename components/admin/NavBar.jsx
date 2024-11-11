import { useDispatch } from 'react-redux'
import { useState } from 'react'
import toast from 'react-hot-toast'
import Link from 'next/link'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'

const NavBar = () => {
  const [navToggle, setNavToggle] = useState(false)
  const router = useRouter()

  // logout
  const dispatch = useDispatch()
  const logout = () => {
    dispatch({
      type: 'AUTH_LOGIN/logout',
    })
    // redirect to login page
    router.push('/admin-login')
    toast.success('Logout successfully!')
  }

  return (
    <nav className="bg-teal-300 border-gray-200 dark:bg-gray-900">
      <div className="container flex flex-wrap items-center justify-between mx-auto py-4">
        <Link
          href="/admin-dashboard"
          className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"
        >
          Digitoakart
        </Link>
        <button
          data-collapse-toggle="navbar-default"
          onClick={() => setNavToggle(!navToggle)}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        {/* should show on right side */}
        <div
          className={`${
            navToggle ? 'block' : 'hidden'
          } w-full md:flex md:items-center md:w-auto md:gap-3`}
        >
          <div className="flex flex-col md:items-center w-auto text-sm font-semibold md:flex-row md:space-x-6 md:space-y-0 space-y-4">
            <Link
              href="/users"
              className="py-2 text-gray-700 rounded-md dark:text-gray-200 hover:text-gray-900 dark:hover:text-gray-400"
            >
              Users
            </Link>
          </div>
          <div className="flex flex-col md:items-center w-auto text-sm font-semibold md:flex-row md:space-x-6 md:space-y-0 space-y-4">
            <Link
              href="/change-password"
              className="py-2 text-gray-700 rounded-md dark:text-gray-200 hover:text-gray-900 dark:hover:text-gray-400"
            >
              Change Password
            </Link>
          </div>
          <div className="flex items-center py-2 space-x-4 md:ml-4 md:space-x-6 justify-center">
            <button
              onClick={logout}
              type="button"
              className="inline-flex items-center justify-center h-10 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-teal-600 hover:bg-teal-700 focus:shadow-outline focus:outline-none"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default NavBar
