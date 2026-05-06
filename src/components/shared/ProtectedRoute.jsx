import { Navigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import Loader from './Loader'

const roleHome = {
  admin: '/admin/dashboard',
  teacher: '/teacher/dashboard',
  student: '/student/dashboard',
  user: '/',
}

const ProtectedRoute = ({ allowedRoles = [], children }) => {
  const { token, user, loading } = useAuth()

  if (loading) return <Loader fullPage />
  if (!token || !user) return <Navigate to="/login" replace />

  if (allowedRoles.length && !allowedRoles.includes(user.role)) {
    return <Navigate to={roleHome[user.role] || '/'} replace />
  }

  return children
}

export default ProtectedRoute
