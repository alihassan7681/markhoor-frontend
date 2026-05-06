import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../../api/axios'
import { FaUserGraduate, FaChalkboardTeacher, FaBook, FaEnvelope } from 'react-icons/fa'
import { MdOutlineComputer } from 'react-icons/md'

const AdminDashboard = () => {
  const [stats, setStats] = useState({ students: 0, teachers: 0, courses: 0, books: 0, contacts: 0 })
  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const safe = (promise) => promise.then(r => r).catch(() => ({ data: [] }))

    Promise.all([
      safe(api.get('/admin/students')), 
      safe(api.get('/admin/teachers')), 
      safe(api.get('/courses/all')), 
      safe(api.get('/books')), 
      safe(api.get('/admin/contacts'))
    ])
      .then(([s, t, c, b, m]) => {
        setStats({ 
          students: Array.isArray(s.data) ? s.data.length : 0, 
          teachers: Array.isArray(t.data) ? t.data.length : 0, 
          courses: Array.isArray(c.data) ? c.data.length : 0, 
          books: Array.isArray(b.data) ? b.data.length : 0, 
          contacts: Array.isArray(m.data) ? m.data.filter((x) => !x.isRead).length : 0
        })
        setContacts(Array.isArray(m.data) ? m.data.slice(0, 5) : [])
      })
      .finally(() => setLoading(false))
  }, [])

  const statConfig = {
    students: { label: 'Students', icon: <FaUserGraduate />, color: 'bg-blue-500' },
    teachers: { label: 'Teachers', icon: <FaChalkboardTeacher />, color: 'bg-purple-500' },
    courses: { label: 'Courses', icon: <MdOutlineComputer />, color: 'bg-orange-500' },
    books: { label: 'Books', icon: <FaBook />, color: 'bg-emerald-500' },
    contacts: { label: 'New Messages', icon: <FaEnvelope />, color: 'bg-red-500' },
  }

  if (loading) return <div className="p-10 text-center font-bold text-slate-400">Syncing Dashboard...</div>

  return (
    <div className="space-y-10 animate-slide-up">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">System <span className="text-[#0077ff]">Overview</span></h1>
          <p className="text-slate-500 font-medium">Welcome back, Admin. Here's what's happening today.</p>
        </div>
        <div className="flex gap-2">
          <div className="px-4 py-2 rounded-xl bg-white border border-slate-100 shadow-sm text-sm font-bold text-slate-600 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
            Server Online
          </div>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
        {Object.entries(stats).map(([k, v]) => (
          <div key={k} className="glass-card rounded-[32px] p-6 group hover:-translate-y-2 transition-all duration-300">
            <div className={`h-12 w-12 rounded-2xl ${statConfig[k].color} flex items-center justify-center text-2xl shadow-lg mb-6 group-hover:scale-110 transition-transform`}>
              {statConfig[k].icon}
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{statConfig[k].label}</p>
            <p className="text-4xl font-black text-slate-900 mt-1">{v}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
        <div className="glass-card rounded-[40px] p-8 border-white/60">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-black text-slate-900 tracking-tight">Recent <span className="text-[#0077ff]">Messages</span></h3>
            <button className="text-xs font-bold text-[#0077ff] hover:underline">View All</button>
          </div>
          
          <div className="space-y-4">
            {contacts.map((c) => (
              <div key={c._id} className={`group flex items-center justify-between p-5 rounded-2xl transition-all border ${c.isRead ? 'bg-slate-50/50 border-transparent' : 'bg-blue-50/50 border-blue-100 shadow-sm'}`}>
                <div className="flex items-center gap-4">
                  <div className={`h-10 w-10 rounded-full flex items-center justify-center font-bold ${c.isRead ? 'bg-slate-200 text-slate-500' : 'bg-[#0077ff] text-white'}`}>
                    {c.name.charAt(0)}
                  </div>
                  <div>
                    <p className={`font-bold text-sm ${c.isRead ? 'text-slate-700' : 'text-slate-900'}`}>{c.name}</p>
                    <p className="text-xs text-slate-500 line-clamp-1">{c.message}</p>
                  </div>
                </div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                  {new Date(c.createdAt || Date.now()).toLocaleDateString()}
                </div>
              </div>
            ))}
            {contacts.length === 0 && <p className="text-center py-10 text-slate-400 italic">No recent messages.</p>}
          </div>
        </div>

        <div className="space-y-8">
          <div className="glass-card rounded-[40px] p-8 bg-gradient-to-br from-slate-900 to-slate-800 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 blur-3xl"></div>
            <h3 className="text-xl font-black mb-6">Quick <span className="text-[#0077ff]">Shortcuts</span></h3>
            <div className="grid grid-cols-2 gap-4">
              <Link to="/admin/students" className="p-4 rounded-2xl bg-white/10 hover:bg-white/20 transition-all text-left">
                <p className="text-lg mb-1">🎓</p>
                <p className="text-xs font-bold text-white">Add Student</p>
              </Link>
              <Link to="/admin/courses" className="p-4 rounded-2xl bg-white/10 hover:bg-white/20 transition-all text-left">
                <p className="text-lg mb-1">🛠️</p>
                <p className="text-xs font-bold text-white">New Course</p>
              </Link>
              <Link to="/admin/teachers" className="p-4 rounded-2xl bg-white/10 hover:bg-white/20 transition-all text-left">
                <p className="text-lg mb-1">👨‍🏫</p>
                <p className="text-xs font-bold text-white">Add Teacher</p>
              </Link>
              <Link to="/admin/contacts" className="p-4 rounded-2xl bg-white/10 hover:bg-white/20 transition-all text-left">
                <p className="text-lg mb-1">📧</p>
                <p className="text-xs font-bold text-white">Messages</p>
              </Link>
            </div>
          </div>
          
          <div className="glass-card rounded-[40px] p-8 border-white/60">
            <h3 className="text-xl font-black text-slate-900 mb-6">System <span className="text-[#0077ff]">Health</span></h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-slate-500">Database Connection</span>
                <span className="h-2 w-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]"></span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-slate-500">API Latency</span>
                <span className="text-xs font-bold text-slate-900">24ms</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
