import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useStudentAuth } from '../../context/StudentAuthContext'

const StudentLogin = ({ notify }) => {
  const navigate = useNavigate()
  const { loginStudent, loading, isStudentAuthenticated } = useStudentAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  if (isStudentAuthenticated) return <Navigate to="/student/dashboard" replace />

  const handleSubmit = async (event) => {
    event.preventDefault()
    const result = await loginStudent(email, password)
    if (!result.success) return notify(result.message, 'error')
    notify('Student login successful.')
    navigate('/student/dashboard', { replace: true })
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f6fbf6] p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-[#16a34a] text-lg font-bold text-white">SP</div>
          <h1 className="text-2xl font-bold text-[#166534]">Student Portal</h1>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input type="email" required placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-lg border border-slate-200 px-4 py-2.5 outline-none focus:border-[#16a34a]" />
          <input type="password" required placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full rounded-lg border border-slate-200 px-4 py-2.5 outline-none focus:border-[#16a34a]" />
          <button disabled={loading} className="w-full rounded-lg bg-[#16a34a] px-4 py-2.5 font-semibold text-white disabled:opacity-70">
            {loading ? 'Signing in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default StudentLogin
