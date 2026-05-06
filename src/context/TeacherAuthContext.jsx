import { createContext, useContext, useMemo, useState } from 'react'
import axios from 'axios'

const TeacherAuthContext = createContext(null)

const teacherApi = axios.create({
  baseURL: 'http://localhost:5000/api/teacher',
})

teacherApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('teacherToken')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export function TeacherAuthProvider({ children }) {
  const [teacherToken, setTeacherToken] = useState(() => localStorage.getItem('teacherToken'))
  const [teacher, setTeacher] = useState(() => {
    const value = localStorage.getItem('teacher')
    return value ? JSON.parse(value) : null
  })
  const [loading, setLoading] = useState(false)

  const loginTeacher = async (email, password) => {
    setLoading(true)
    try {
      const response = await teacherApi.post('/auth/login', { email, password })
      const data = response.data
      localStorage.setItem('teacherToken', data.token)
      localStorage.setItem('teacher', JSON.stringify(data.teacher))
      setTeacherToken(data.token)
      setTeacher(data.teacher)
      return { success: true }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.error || 'Invalid teacher credentials.',
      }
    } finally {
      setLoading(false)
    }
  }

  const logoutTeacher = () => {
    localStorage.removeItem('teacherToken')
    localStorage.removeItem('teacher')
    setTeacherToken(null)
    setTeacher(null)
  }

  const value = useMemo(
    () => ({
      teacherToken,
      teacher,
      loading,
      isTeacherAuthenticated: Boolean(teacherToken),
      teacherApi,
      loginTeacher,
      logoutTeacher,
    }),
    [teacherToken, teacher, loading],
  )

  return <TeacherAuthContext.Provider value={value}>{children}</TeacherAuthContext.Provider>
}

export function useTeacherAuth() {
  const context = useContext(TeacherAuthContext)
  if (!context) throw new Error('useTeacherAuth must be used within TeacherAuthProvider')
  return context
}
