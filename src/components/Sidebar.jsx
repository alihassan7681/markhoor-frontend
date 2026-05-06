import { NavLink } from 'react-router-dom'

const links = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/students', label: 'Students' },
  { to: '/books', label: 'Books' },
  { to: '/courses', label: 'Courses' },
]

const Sidebar = ({ isOpen, onClose }) => (
  <>
    <div
      className={`fixed inset-0 z-30 bg-black/40 backdrop-blur-sm transition md:hidden ${isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
      onClick={onClose}
    />
    <aside
      className={`fixed left-0 top-0 z-40 h-full w-64 bg-[#1e3a5f] p-5 text-white shadow-2xl transition-transform duration-300 md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
    >
      <h1 className="mb-10 text-2xl font-bold text-[#f5a623]">Markhoor Institute</h1>
      <nav className="space-y-2">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            onClick={onClose}
            className={({ isActive }) =>
              `block rounded-lg px-4 py-3 text-sm font-medium transition ${isActive ? 'bg-[#f5a623] text-[#1e3a5f]' : 'hover:bg-white/20'}`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  </>
)

export default Sidebar
