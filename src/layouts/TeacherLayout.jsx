import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import TeacherSidebar from '../components/teacher/TeacherSidebar'
import { HiMenuAlt3 } from 'react-icons/hi'

const TeacherLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-[#f4f6f9]">
      <TeacherSidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        <header className="p-4 md:px-8 md:py-4">
          <div className="rounded-xl bg-white p-4 shadow-sm flex items-center gap-4">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-slate-500 hover:text-slate-900 p-1">
              <HiMenuAlt3 size={24} />
            </button>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Markhor Institute</p>
              <h1 className="text-lg md:text-xl font-black text-[#7c3aed] tracking-tight">Teacher Portal</h1>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}

export default TeacherLayout
