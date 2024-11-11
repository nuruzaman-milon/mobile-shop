import Cookies from 'js-cookie'

const checkToken = () => {
  const token = Cookies.get('token')
  if (!token) {
    // dont use router.push('/admin-login')
    // window is not defined in nextjs
  }
}

export { checkToken }
