import { useTeacherAuth } from '../../context/TeacherAuthContext'

const TeacherNavbar = ({ title, onMenuToggle }) => {
  const { teacher } = useTeacherAuth()

  return (
    <header className="sticky top-0 z-20 mb-6 flex items-center justify-between rounded-2xl bg-white p-4 shadow-sm">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuToggle}
          className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-[#1b3353] md:hidden"
        >
          Menu
        </button>
        <h2 className="text-lg font-semibold text-[#1b3353] md:text-xl">{title}</h2>
      </div>
      <div className="text-right">
        <p className="text-sm font-semibold text-[#1b3353]">{teacher?.name || 'Teacher'}</p>
        <p className="text-xs text-slate-500">{teacher?.subject || 'Markhoor Institute'}</p>
      </div>
    </header>
  )
}

export default TeacherNavbar
