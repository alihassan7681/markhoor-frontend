import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import toast from 'react-hot-toast'

const rolePath = {
  admin: '/admin/dashboard',
  teacher: '/teacher/dashboard',
  student: '/student/dashboard',
}

const LoginSignup = () => {
  const { user, login, signup } = useAuth()
  const navigate = useNavigate()
  const [tab, setTab] = useState('login')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPass, setShowPass] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' })

  if (user) return <Navigate to={rolePath[user.role] || '/'} replace />

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    if (!form.email || !form.password) return setError('Email and password are required')
    
    try {
      setLoading(true)
      const loggedUser = tab === 'login'
        ? await login(form.email, form.password)
        : await signup(form.name, form.email, form.password)
      toast.success(tab === 'login' ? 'Welcome back!' : 'Account created!')
      navigate(loggedUser.redirectTo || rolePath[loggedUser.role] || '/', { replace: true })
    } catch (err) {
      const msg = err.response?.data?.error || 'Authentication failed'
      setError(msg)
      toast.error(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-[1.2fr_1fr] bg-white">
      {/* Visual Side */}
      <section className="hidden lg:flex flex-col justify-between p-16 bg-slate-900 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/20 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-400/10 blur-[100px] rounded-full -translate-x-1/4 translate-y-1/4"></div>

        <div className="relative z-10">
          <h1 className="text-4xl font-black text-white tracking-tight">Markhor <span className="text-[#0077ff]">Institute</span></h1>
        </div>

        <div className="relative z-10 space-y-6">
          <h2 className="text-6xl font-black text-white leading-tight">
            Unlock Your <br />
            <span className="gradient-text">Potential.</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-md">
            The most advanced student portal for professional courses in Sahiwal. Track your progress, attempt quizzes, and get certified.
          </p>
        </div>

        <div className="relative z-10 flex gap-4 text-xs font-bold text-slate-500 uppercase tracking-widest">
          <span>© 2026 Markhor Institute</span>
          <span>•</span>
          <span>Privacy Policy</span>
        </div>
      </section>

      {/* Form Side */}
      <section className="flex flex-col justify-center p-8 md:p-16 lg:p-24 bg-slate-50">
        <div className="max-w-md mx-auto w-full space-y-10 animate-slide-up">
          <div className="space-y-2 text-center lg:text-left">
            <h2 className="text-4xl font-black text-slate-900 leading-tight">
              {tab === 'login' ? 'Sign In' : 'Create Account'}
            </h2>
            <p className="text-slate-500">
              {tab === 'login' ? 'Enter your credentials to access your portal' : 'Join the leading institute in Sahiwal'}
            </p>
          </div>

          <div className="glass-card p-2 rounded-2xl flex bg-white/50 border-white">
            <button 
              onClick={() => setTab('login')} 
              className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all ${tab === 'login' ? 'bg-white shadow-xl text-[#0077ff]' : 'text-slate-400'}`}
            >
              Sign In
            </button>
            <button 
              onClick={() => setTab('signup')} 
              className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all ${tab === 'signup' ? 'bg-white shadow-xl text-[#0077ff]' : 'text-slate-400'}`}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={submit} className="space-y-4">
            {tab === 'signup' && (
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                <input 
                  className="w-full rounded-2xl bg-white border border-slate-200 p-4 focus:ring-2 focus:ring-[#0077ff] focus:outline-none transition-all" 
                  placeholder="John Doe" 
                  value={form.name} 
                  onChange={(e) => setForm({ ...form, name: e.target.value })} 
                />
              </div>
            )}
            
            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
              <input 
                className="w-full rounded-2xl bg-white border border-slate-200 p-4 focus:ring-2 focus:ring-[#0077ff] focus:outline-none transition-all" 
                type="email" 
                placeholder="email@example.com" 
                value={form.email} 
                onChange={(e) => setForm({ ...form, email: e.target.value })} 
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Password</label>
              <div className="relative">
                <input 
                  className="w-full rounded-2xl bg-white border border-slate-200 p-4 focus:ring-2 focus:ring-[#0077ff] focus:outline-none transition-all" 
                  type={showPass ? 'text' : 'password'} 
                  placeholder="••••••••" 
                  value={form.password} 
                  onChange={(e) => setForm({ ...form, password: e.target.value })} 
                />
                <button 
                  type="button" 
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#0077ff]"
                  onClick={() => setShowPass(!showPass)}
                >
                  {showPass ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            {error && (
              <div className="p-4 rounded-xl bg-red-50 border border-red-100 text-red-600 text-xs font-bold animate-pulse">
                {error}
              </div>
            )}

            <button 
              disabled={loading} 
              className="btn-premium w-full !py-4 text-lg shadow-xl shadow-blue-100 mt-6"
            >
              {loading ? 'Please wait...' : tab === 'login' ? 'Sign In Now' : 'Create Account'}
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}

export default LoginSignup
