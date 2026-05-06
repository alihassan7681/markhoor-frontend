import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Login = () => {
  const navigate = useNavigate()
  const { login, loading, isAuthenticated } = useAuth()
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [error, setError] = useState('')

  if (isAuthenticated) return <Navigate to="/dashboard" replace />

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    const response = await login(formData.email, formData.password)
    if (!response.success) return setError(response.message)
    navigate('/dashboard', { replace: true })
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f4f6f9] p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#1e3a5f] text-lg font-bold text-white">MI</div>
          <h1 className="text-2xl font-bold text-[#1e3a5f]">Markhoor Institute</h1>
          <p className="mt-1 text-sm text-slate-500">Sign in to continue</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input className="w-full rounded-lg border border-slate-200 px-4 py-2.5 outline-none focus:border-[#1e3a5f]" type="email" required placeholder="Email" value={formData.email} onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))} />
          <input className="w-full rounded-lg border border-slate-200 px-4 py-2.5 outline-none focus:border-[#1e3a5f]" type="password" required placeholder="Password" value={formData.password} onChange={(e) => setFormData((p) => ({ ...p, password: e.target.value }))} />
          {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>}
          <button className="w-full rounded-lg bg-[#1e3a5f] px-4 py-2.5 font-semibold text-white disabled:opacity-70" disabled={loading}>
            {loading ? 'Signing in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
