import { NavLink } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { MdSpaceDashboard, MdLibraryBooks, MdMessage } from 'react-icons/md'
import { FaUserGraduate, FaChalkboardTeacher, FaBookOpen, FaFileSignature, FaSignOutAlt, FaTimes } from 'react-icons/fa'

const links = [
  ['/admin/dashboard', 'Dashboard', <MdSpaceDashboard />],
  ['/admin/admissions', 'Online Admissions', <FaFileSignature />],
  ['/admin/students', 'Students', <FaUserGraduate />],
  ['/admin/teachers', 'Teachers', <FaChalkboardTeacher />],
  ['/admin/books', 'Books', <MdLibraryBooks />],
  ['/admin/courses', 'Courses', <FaBookOpen />],
  ['/admin/contacts', 'Messages', <MdMessage />],
]

const AdminSidebar = ({ isOpen, onClose }) => {
  const { logout } = useAuth()
  return (
    <aside className={`
      fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-slate-100 flex flex-col p-6 space-y-8 transition-transform duration-300 lg:relative lg:translate-x-0
      ${isOpen ? 'translate-x-0' : '-translate-x-full'}
    `}>
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-slate-900 flex items-center justify-center text-white font-black text-xl">A</div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight">Admin <span className="text-[#0077ff]">Portal</span></h2>
        </div>
        <button onClick={onClose} className="lg:hidden text-slate-400 hover:text-slate-900 p-1">
          <FaTimes size={20} />
        </button>
      </div>

      <nav className="flex-1 space-y-2 overflow-y-auto custom-scrollbar">
        {links.map(([to, label, icon]) => (
          <NavLink 
            key={to} 
            to={to} 
            onClick={() => { if (window.innerWidth < 1024) onClose() }}
            className={({ isActive }) => `
              flex items-center gap-4 px-4 py-3 rounded-2xl text-sm font-bold transition-all
              ${isActive 
                ? 'bg-[#0077ff] text-white shadow-lg shadow-blue-100 translate-x-2' 
                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}
            `}
          >
            <span className="text-xl">{icon}</span>
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="pt-6 border-t border-slate-100">
        <button 
          onClick={logout} 
          className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-2xl bg-red-50 text-red-600 font-bold hover:bg-red-100 transition-colors"
        >
          <FaSignOutAlt className="text-lg" /> Logout
        </button>
      </div>
    </aside>
  )
}

export default AdminSidebar
