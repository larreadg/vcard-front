import { jwtDecode } from 'jwt-decode'

export const getUser = () => {
  const token = localStorage.getItem('token')
  if (!token) {
    window.location.href = '/admin/login'
    return null
  }

  try {
    const decoded = jwtDecode(token)
    return decoded
  } catch (error) {
    console.error('Error decoding token:', error)
    window.location.href = '/admin/login'
    return null
  }
}
