import { Outlet } from 'react-router-dom'
import StudentNavbar from '../components/student/StudentNavbar'
const StudentLayout = () => (
  <div className="min-h-screen bg-slate-50 selection:bg-emerald-500/20 selection:text-emerald-700 relative">
    <div className="absolute top-20 left-10 -z-10 w-64 h-64 bg-emerald-100/50 rounded-full blur-3xl"></div>
    <div className="absolute bottom-40 right-10 -z-10 w-96 h-96 bg-blue-50 rounded-full blur-3xl"></div>
    
    <StudentNavbar />
    <main className="mx-auto max-w-7xl px-4 py-8 relative">
      <Outlet />
    </main>
  </div>
)

export default StudentLayout
