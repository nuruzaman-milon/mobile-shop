import NavBar from '@/components/admin/NavBar'
import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'

const ChangePassword = () => {
  const [error, setError] = useState('')
  const token = Cookies.get('token')
  const router = useRouter()

  // check if token is valid
  useEffect(() => {
    if (!token) {
      router.push('/admin-login')
      toast.error('Please login first')
    }
  }, [router, token]) // Include dependencies for re-running the effect

  const changePasswordHandle = async (submitData) => {
    const url = `${process.env.API_URL}/api/admin/change-password`
    const res = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(submitData),
    })
    const data = await res.json()
    if (!res.ok) {
      toast.error(data.message)
    } else {
      // delete token from cookie
      Cookies.remove('token')
      router.push('/admin-login')
      toast.success(data.message)
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const submitData = {
      password: event.target.password.value,
      newPassword: event.target.newPassword.value,
      cPassword: event.target.cPassword.value,
    }
    if (submitData.newPassword != submitData.cPassword) {
      setError('Does not match to new password!') //
    } else {
      // send request to change password
      changePasswordHandle(submitData)
      setError('')
    }
  }

  return (
    <div>
      <NavBar />
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Change Password
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Current Password
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="password"
                  required
                  className="block w-full px-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="newPassword"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  New Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  autoComplete="newPassword"
                  required
                  className="block w-full px-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="cPassword"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Confirm Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="cPassword"
                  name="cPassword"
                  type="password"
                  autoComplete="cPassword"
                  required
                  className="block w-full px-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {/* error note: not match to new password */}
                <i className="mt-2 text-sm text-red-600" id="email-error">
                  {error}
                </i>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Update Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ChangePassword
