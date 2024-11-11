import CustomizedAccordions from '@/components/CustomizedAccordions'
import NavBar from '@/components/admin/NavBar'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const User = () => {
  const token = Cookies.get('token')
  const router = useRouter()

  const url = `${process.env.API_URL}/api/admin/users`

  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const fetchUsers = useCallback(async () => {
    setIsLoading(true)
    const res = await fetch(url, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
    const data = await res.json()
    if (data.success) {
      setUsers(data.users)
      setIsLoading(false)
    } else {
      toast.error(data.message)
      setIsLoading(false)
    }
  }, [token, url])

  useEffect(() => {
    if (!token) {
      router.push('/admin-login')
      toast.error('Please login first')
    }
    fetchUsers()
    // return () => {
    //   cleanup
    // }
  }, [fetchUsers, router, token, url]) // Include dependencies for re-running the effect

  const handleSubmit = (e) => {
    e.preventDefault()
    const email = e.target.email.value
    const password = e.target.password.value
    const registerUrl = `${process.env.API_URL}/api/admin/register`
    if (email === '' || password === '') {
      toast.error('Please enter email and password')
      return
    } else {
      fetch(registerUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ email, password }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            toast.success('User created')
            fetchUsers()
          } else {
            toast.error(data.message)
          }
        })
        .catch((err) => toast.error(err))
    }
  }

  return (
    <>
      <NavBar />
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          New User
        </h2>
        {/* use grid cols to create user inputs with only email and password */}
        <form onSubmit={handleSubmit}>
          <div className="md:grid md:grid-cols-3 md:gap-2">
            <div className="rounded-md shadow-sm">
              <input
                id="email"
                type="email"
                required
                placeholder="Email"
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm sm:leading-5"
              />
            </div>
            <div className="rounded-md shadow-sm">
              <input
                id="password"
                type="password"
                placeholder="Password"
                required
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm sm:leading-5"
              />
            </div>
            {/* button for submit */}
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-teal-500 hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
            >
              Create
            </button>
          </div>
        </form>

        <div className="mt-4">
          {isLoading ? (
            <div className="flex justify-center items-center border border-spacing-2 py-10">
              <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-teal-500"></div>
            </div>
          ) : (
            <CustomizedAccordions users={users} setUsers={setUsers} />
          )}
        </div>
      </div>
    </>
  )
}

export default User
