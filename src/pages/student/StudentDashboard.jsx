import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../../api/axios'
import { useAuth } from '../../context/AuthContext'
import { FaClipboardList, FaBullseye, FaTrophy, FaExclamationTriangle } from 'react-icons/fa'

const StudentDashboard = () => {
  const { user } = useAuth()
  const [quizzes, setQuizzes] = useState([])
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => { 
    Promise.all([api.get('/student/quizzes'), api.get('/student/results')])
      .then(([q, r]) => { 
        setQuizzes(q.data || []); 
        setResults(r.data || []) 
      })
      .finally(() => setLoading(false))
  }, [])
  
  const stats = useMemo(() => ({ 
    available: quizzes.filter((q) => q.attemptStatus !== 'submitted').length, 
    attempted: results.length, 
    passed: results.filter((r) => r.isPassed).length, 
    failed: results.filter((r) => !r.isPassed).length 
  }), [quizzes, results])

  if (loading) return <div className="p-10 text-center font-bold text-slate-400">Loading your portal...</div>

  return (
    <div className="space-y-10 animate-slide-up">
      <div className="glass-card rounded-[40px] p-8 md:p-12 border-white/60 bg-gradient-to-br from-emerald-500 to-teal-600 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2"></div>
        <h1 className="text-4xl font-black mb-2 relative z-10">Welcome back, {user?.name}! 👋</h1>
        <p className="text-emerald-50 font-medium text-lg relative z-10">Ready to test your knowledge today?</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="glass-card rounded-[32px] p-6 hover:-translate-y-2 transition-transform">
          <div className="h-12 w-12 rounded-2xl bg-blue-500 text-white flex items-center justify-center text-2xl mb-4 shadow-lg shadow-blue-200">
            <FaClipboardList />
          </div>
          <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Available Quizzes</p>
          <p className="text-4xl font-black text-slate-900 mt-1">{stats.available}</p>
        </div>
        <div className="glass-card rounded-[32px] p-6 hover:-translate-y-2 transition-transform">
          <div className="h-12 w-12 rounded-2xl bg-slate-800 text-white flex items-center justify-center text-2xl mb-4 shadow-lg shadow-slate-200">
            <FaBullseye />
          </div>
          <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Attempted</p>
          <p className="text-4xl font-black text-slate-900 mt-1">{stats.attempted}</p>
        </div>
        <div className="glass-card rounded-[32px] p-6 hover:-translate-y-2 transition-transform">
          <div className="h-12 w-12 rounded-2xl bg-green-500 text-white flex items-center justify-center text-2xl mb-4 shadow-lg shadow-green-200">
            <FaTrophy />
          </div>
          <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Passed</p>
          <p className="text-4xl font-black text-slate-900 mt-1">{stats.passed}</p>
        </div>
        <div className="glass-card rounded-[32px] p-6 hover:-translate-y-2 transition-transform">
          <div className="h-12 w-12 rounded-2xl bg-red-500 text-white flex items-center justify-center text-2xl mb-4 shadow-lg shadow-red-200">
            <FaExclamationTriangle />
          </div>
          <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Failed</p>
          <p className="text-4xl font-black text-slate-900 mt-1">{stats.failed}</p>
        </div>
      </div>

      <div className="flex justify-center pt-4">
        <Link 
          to="/student/quizzes" 
          className="relative overflow-hidden px-10 py-5 rounded-[24px] font-black transition-all duration-300 bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:shadow-[0_10px_30px_-10px_rgba(16,185,129,0.5)] hover:-translate-y-1 active:scale-95 text-xl"
        >
          View Available Quizzes →
        </Link>
      </div>
    </div>
  )
}

export default StudentDashboard
