import { useEffect, useState } from 'react'
import api from '../api/axios'
import Loader from '../components/Loader'
import { useAuth } from '../context/AuthContext'

const Dashboard = ({ notify }) => {
  const { admin } = useAuth()
  const [stats, setStats] = useState([
    { label: 'Total Students', value: 0 },
    { label: 'Total Books', value: 0 },
    { label: 'Total Courses', value: 0 },
    { label: 'Active Students', value: 0 },
  ])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [studentsRes, booksRes, coursesRes] = await Promise.all([api.get('/students'), api.get('/books'), api.get('/courses')])
        const students = studentsRes.data || []
        setStats([
          { label: 'Total Students', value: students.length },
          { label: 'Total Books', value: (booksRes.data || []).length },
          { label: 'Total Courses', value: (coursesRes.data || []).length },
          { label: 'Active Students', value: students.filter((s) => ['active', 'enrolled', 'true'].includes(String(s.status).toLowerCase())).length },
        ])
      } catch {
        notify('Failed to load dashboard stats.', 'error')
      } finally {
        setLoading(false)
      }
    }
    fetchStats()
  }, [notify])

  if (loading) return <Loader />

  return (
    <div>
      <div className="mb-6 rounded-2xl bg-white p-5 shadow-sm">
        <h1 className="text-2xl font-bold text-[#1e3a5f]">Welcome, {admin?.name || 'Admin'}!</h1>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-2xl bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">{stat.label}</p>
            <p className="mt-2 text-3xl font-bold text-[#1e3a5f]">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Dashboard
