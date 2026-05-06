import { createContext, useContext, useMemo, useState } from 'react'
import axios from 'axios'

const StudentAuthContext = createContext(null)

const studentApi = axios.create({
  baseURL: 'http://localhost:5000/api/student',
})

studentApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('studentToken')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export function StudentAuthProvider({ children }) {
  const [studentToken, setStudentToken] = useState(() => localStorage.getItem('studentToken'))
  const [student, setStudent] = useState(() => {
    const value = localStorage.getItem('student')
    return value ? JSON.parse(value) : null
  })
  const [loading, setLoading] = useState(false)

  const loginStudent = async (email, password) => {
    setLoading(true)
    try {
      const response = await studentApi.post('/auth/login', { email, password })
      const data = response.data
      localStorage.setItem('studentToken', data.token)
      localStorage.setItem('student', JSON.stringify(data.student))
      setStudentToken(data.token)
      setStudent(data.student)
      return { success: true }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.error || 'Invalid student credentials.',
      }
    } finally {
      setLoading(false)
    }
  }

  const logoutStudent = () => {
    localStorage.removeItem('studentToken')
    localStorage.removeItem('student')
    setStudentToken(null)
    setStudent(null)
  }

  const value = useMemo(
    () => ({
      studentToken,
      student,
      loading,
      studentApi,
      loginStudent,
      logoutStudent,
      isStudentAuthenticated: Boolean(studentToken),
    }),
    [studentToken, student, loading],
  )

  return <StudentAuthContext.Provider value={value}>{children}</StudentAuthContext.Provider>
}

export function useStudentAuth() {
  const context = useContext(StudentAuthContext)
  if (!context) throw new Error('useStudentAuth must be used within StudentAuthProvider')
  return context
}
