import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useTeacherAuth } from '../../context/TeacherAuthContext'

const TeacherLogin = ({ notify }) => {
  const navigate = useNavigate()
  const { loginTeacher, loading, isTeacherAuthenticated } = useTeacherAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  if (isTeacherAuthenticated) return <Navigate to="/teacher/dashboard" replace />

  const handleSubmit = async (event) => {
    event.preventDefault()
    const result = await loginTeacher(email, password)
    if (!result.success) return notify(result.message, 'error')
    notify('Teacher login successful.')
    navigate('/teacher/dashboard', { replace: true })
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f6f8fc] p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-[#1b3353] text-lg font-bold text-[#f5a623]">TP</div>
          <h1 className="text-2xl font-bold text-[#1b3353]">Teacher Portal</h1>
          <p className="mt-1 text-sm text-slate-500">Markhoor Institute</p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="email"
            required
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-slate-200 px-4 py-2.5 outline-none focus:border-[#f5a623]"
          />
          <input
            type="password"
            required
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-slate-200 px-4 py-2.5 outline-none focus:border-[#f5a623]"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-[#1b3353] px-4 py-2.5 font-semibold text-white hover:brightness-110 disabled:opacity-70"
          >
            {loading ? 'Signing in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default TeacherLogin
