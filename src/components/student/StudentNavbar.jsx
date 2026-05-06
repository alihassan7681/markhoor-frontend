import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { HiMenuAlt3, HiX } from 'react-icons/hi'

const links = [
  ['/student/dashboard', 'Overview'],
  ['/student/quizzes', 'My Quizzes'],
  ['/student/results', 'Result Cards'],
]

const StudentNavbar = () => {
  const { user, logout } = useAuth()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="relative z-50">
      <div className="glass-nav top-4 mx-4 rounded-3xl mt-4 px-6 border border-white/40 shadow-xl bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between py-4">
          <Link to="/student/dashboard" className="flex items-center gap-2 font-black text-2xl text-slate-900 tracking-tighter">
            <div className="flex items-center justify-center h-10 w-10 rounded-xl bg-gradient-to-br from-green-400 to-emerald-600 text-white shadow-lg shadow-green-200">
              S
            </div>
            <span className="hidden xs:inline">Student <span className="text-emerald-600">Portal</span></span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-1">
            {links.map(([to, label]) => (
              <NavLink 
                key={to} 
                to={to} 
                className={({ isActive }) => `
                  px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300
                  ${isActive ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-100' : 'text-slate-600 hover:bg-emerald-50 hover:text-emerald-600'}
                `}
              >
                {label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2 md:gap-4">
            <div className="hidden lg:flex items-center gap-2 text-sm font-bold text-slate-700 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
              <span className="h-2 w-2 rounded-full bg-green-500"></span>
              {user?.name}
            </div>
            <button 
              onClick={logout} 
              className="hidden sm:block rounded-xl bg-slate-900 px-5 py-2 text-sm font-bold text-white hover:bg-black transition-colors"
            >
              Logout
            </button>
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="md:hidden h-10 w-10 rounded-xl bg-slate-50 text-slate-600 flex items-center justify-center hover:bg-emerald-50 hover:text-emerald-600 transition-all"
            >
              {isOpen ? <HiX size={24} /> : <HiMenuAlt3 size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`
          md:hidden absolute inset-x-0 top-[100%] mt-2 transition-all duration-300
          ${isOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-4 pointer-events-none'}
        `}>
          <div className="glass-card rounded-[32px] p-4 shadow-2xl border-white/60 bg-white/95 backdrop-blur-2xl">
            <nav className="flex flex-col gap-2">
              {links.map(([to, label]) => (
                <NavLink 
                  key={to} 
                  to={to} 
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) => `
                    px-5 py-4 rounded-2xl text-base font-bold transition-all
                    ${isActive ? 'bg-emerald-50 text-emerald-600' : 'text-slate-600 hover:bg-slate-50'}
                  `}
                >
                  {label}
                </NavLink>
              ))}
              <div className="pt-4 border-t border-slate-100 mt-2">
                <button 
                  onClick={logout}
                  className="w-full py-4 rounded-2xl bg-red-50 text-red-600 font-bold"
                >
                  Logout Account
                </button>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}

export default StudentNavbar
