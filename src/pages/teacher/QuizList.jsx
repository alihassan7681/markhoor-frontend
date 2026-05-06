import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../../api/axios'

const QuizList = () => {
  const navigate = useNavigate()
  const [quizzes, setQuizzes] = useState([])
  const load = () => api.get('/teacher/quizzes').then((res) => setQuizzes(res.data || []))
  useEffect(() => { load() }, [])
  return <div className="space-y-3 rounded bg-white p-4 shadow-sm"><Link to="/teacher/quizzes/create" className="inline-block rounded bg-[#7c3aed] px-3 py-2 text-sm text-white">Create New Quiz</Link><table className="w-full text-sm"><thead><tr className="text-left"><th>Title</th><th>Course</th><th>Status</th><th>Actions</th></tr></thead><tbody>{quizzes.map((q) => <tr key={q._id} className="border-t"><td>{q.title}</td><td>{q.course}</td><td>{q.isPublished ? 'Published' : 'Draft'}</td><td className="space-x-2 py-2">{!q.isPublished && <button onClick={() => navigate(`/teacher/quizzes/${q._id}/edit`)}>Edit</button>}<button onClick={() => navigate(`/teacher/quizzes/${q._id}/results`)}>Results</button>{!q.isPublished && <button onClick={async () => { await api.patch(`/teacher/quizzes/${q._id}/publish`, {}); load() }}>Publish</button>}<button className="text-red-600" onClick={async () => { if (window.confirm('Delete quiz?')) { await api.delete(`/teacher/quizzes/${q._id}`); load() } }}>Delete</button></td></tr>)}</tbody></table></div>
}

export default QuizList
