import { useAuth } from '../../context/AuthContext'
import { HiMenuAlt3 } from 'react-icons/hi'

const AdminNavbar = ({ onMenuClick }) => {
  const { user } = useAuth()
  return (
    <header className="mb-4 rounded-xl bg-white p-4 shadow-sm flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button onClick={onMenuClick} className="lg:hidden text-slate-500 hover:text-slate-900 p-1">
          <HiMenuAlt3 size={24} />
        </button>
        <div>
          <p className="text-[10px] md:text-xs font-black uppercase tracking-widest text-slate-400">Markhor Institute Admin</p>
          <h1 className="text-lg md:text-xl font-black text-slate-900 tracking-tight">Welcome, {user?.name}</h1>
        </div>
      </div>
    </header>
  )
}

export default AdminNavbar
