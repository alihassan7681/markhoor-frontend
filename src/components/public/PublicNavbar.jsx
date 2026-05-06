import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { HiMenuAlt3, HiX } from 'react-icons/hi'

const links = [
  ['/', 'Home'],
  ['/courses', 'Courses'],
  ['/books', 'Study Material'],
  ['/about', 'About'],
  ['/contact', 'Contact'],
  ['/registration', 'Admission'],
  ['/verify', 'Verify Certificate'],
]

const PublicNavbar = () => {
  const [open, setOpen] = useState(false)
  const { user, logout } = useAuth()
  const { pathname } = useLocation()

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] px-4 py-4 md:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="glass-nav rounded-[24px] md:rounded-[32px] px-4 md:px-8 py-3 md:py-4 border border-white/40 shadow-2xl flex items-center justify-between backdrop-blur-xl bg-white/80">
          
          {/* Logo Section */}
          <Link to="/" className="flex items-center gap-2 md:gap-3 group">
            <div className="h-10 w-10 md:h-12 md:w-12 rounded-xl overflow-hidden shadow-lg shadow-blue-100 flex items-center justify-center bg-white border border-slate-100 group-hover:scale-105 transition-transform">
              <img 
                src="/markhoor-logo-.png" 
                alt="Logo" 
                className="w-full h-full object-contain p-1" 
              />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-lg md:text-xl font-black text-[#1e293b] tracking-tighter">Markhor</span>
              <span className="text-[10px] md:text-xs font-bold text-[#0077ff] tracking-widest uppercase">Institute</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {links.map(([to, label]) => (
              <NavLink 
                key={to} 
                to={to} 
                className={({ isActive }) => `
                  px-4 py-2 rounded-xl text-[13px] font-bold transition-all duration-300 whitespace-nowrap
                  ${isActive ? 'bg-[#0077ff] text-white shadow-lg shadow-blue-100' : 'text-slate-600 hover:bg-blue-50 hover:text-[#0077ff]'}
                `}
              >
                {label}
              </NavLink>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2 md:gap-4">
            {user ? (
              <div className="flex items-center gap-2 md:gap-3">
                <Link to={`/${user.role}/dashboard`} className="hidden sm:block text-sm font-bold text-slate-700 hover:text-[#0077ff] transition-colors">Dashboard</Link>
                <button 
                  className="px-4 md:px-6 py-2 rounded-xl bg-slate-900 text-white text-[13px] font-bold hover:bg-black transition-colors" 
                  onClick={logout}
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/login" className="flex btn-premium px-4 md:px-8 !py-2 md:!py-2.5 text-[12px] md:text-[13px] shadow-none whitespace-nowrap">
                LMS Login
              </Link>
            )}
            
            {/* Mobile Toggle */}
            <button 
              className="lg:hidden h-10 w-10 flex items-center justify-center rounded-xl bg-slate-50 text-slate-600 hover:bg-blue-50 hover:text-[#0077ff] transition-all" 
              onClick={() => setOpen(!open)}
            >
              {open ? <HiX size={24} /> : <HiMenuAlt3 size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Sidebar/Menu */}
        <div className={`
          lg:hidden fixed inset-x-4 top-[88px] z-50 transition-all duration-500 ease-in-out
          ${open ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-4 pointer-events-none'}
        `}>
          <div className="glass-card rounded-[32px] p-6 shadow-2xl border-white/60 bg-white/95 backdrop-blur-2xl">
            <nav className="flex flex-col gap-2">
              {links.map(([to, label]) => (
                <NavLink 
                  key={to} 
                  to={to} 
                  className={({ isActive }) => `
                    px-5 py-4 rounded-2xl text-base font-bold transition-all
                    ${isActive ? 'bg-blue-50 text-[#0077ff]' : 'text-slate-600 hover:bg-slate-50'}
                  `}
                >
                  {label}
                </NavLink>
              ))}
              <div className="pt-4 border-t border-slate-100 mt-2">
                {!user && (
                  <Link to="/login" className="flex items-center justify-center w-full py-4 rounded-2xl bg-[#0077ff] text-white font-black shadow-lg shadow-blue-100">
                    LMS Login Portal
                  </Link>
                )}
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}

export default PublicNavbar
