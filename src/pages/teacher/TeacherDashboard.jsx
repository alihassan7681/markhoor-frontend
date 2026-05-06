import { useEffect, useState } from 'react'
import api from '../../api/axios'
import { useAuth } from '../../context/AuthContext'

const TeacherDashboard = () => {
  const { user } = useAuth()
  const [quizzes, setQuizzes] = useState([])
  useEffect(() => { api.get('/teacher/quizzes').then((res) => setQuizzes(res.data || [])) }, [])
  return <div className="space-y-4"><div className="rounded bg-white p-4 shadow-sm"><h2 className="text-xl font-semibold text-[#7c3aed]">Welcome, {user?.name}</h2></div><div className="grid gap-3 md:grid-cols-4"><div className="rounded bg-white p-4">Total Quizzes: <b>{quizzes.length}</b></div><div className="rounded bg-white p-4">Published: <b>{quizzes.filter((q) => q.isPublished).length}</b></div><div className="rounded bg-white p-4">Total Attempts: <b>{quizzes.reduce((s, q) => s + (q.attemptCount || 0), 0)}</b></div><div className="rounded bg-white p-4">Average Pass Rate: <b>0%</b></div></div></div>
}

export default TeacherDashboard
