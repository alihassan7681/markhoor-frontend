import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Navbar = ({ title, onMenuToggle }) => {
  const navigate = useNavigate()
  const { admin, logout } = useAuth()

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <header className="sticky top-0 z-20 mb-6 flex items-center justify-between rounded-2xl bg-white p-4 shadow-sm">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuToggle}
          className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-[#1e3a5f] md:hidden"
        >
          Menu
        </button>
        <h2 className="text-lg font-semibold text-[#1e3a5f] md:text-xl">{title}</h2>
      </div>
      <div className="flex items-center gap-3">
        <div className="hidden text-right sm:block">
          <p className="text-sm font-semibold text-[#1e3a5f]">{admin?.name || 'Admin'}</p>
          <p className="text-xs text-slate-500">{admin?.email}</p>
        </div>
        <button type="button" onClick={handleLogout} className="rounded-lg bg-[#f5a623] px-4 py-2 text-sm font-semibold text-[#1e3a5f]">
          Logout
        </button>
      </div>
    </header>
  )
}

export default Navbar
