import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../../api/axios'
import QuestionBuilder from '../../components/teacher/QuestionBuilder'

const EditQuiz = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [form, setForm] = useState({ title: '', description: '' })
  const [questions, setQuestions] = useState([])
  useEffect(() => { 
    api.get(`/teacher/quizzes/${id}`).then((res) => { 
      setForm({ 
        title: res.data.title, 
        description: res.data.description,
        course: res.data.course || '',
        timeLimit: res.data.timeLimit || 30,
        passingMarks: res.data.passingMarks || 0
      }); 
      setQuestions(res.data.questions || []) 
    }) 
  }, [id])

  return (
    <div className="space-y-6 rounded-xl bg-white p-6 shadow-sm border border-slate-100">
      <h1 className="text-2xl font-bold text-[#1e3a5f]">Edit Quiz</h1>
      
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-1">
          <label className="text-sm font-medium">Quiz Title</label>
          <input className="w-full rounded border p-2" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium">Course</label>
          <input className="w-full rounded border p-2" value={form.course} onChange={(e) => setForm({ ...form, course: e.target.value })} />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium">Time Limit (Minutes)</label>
          <input className="w-full rounded border p-2" type="number" value={form.timeLimit} onChange={(e) => setForm({ ...form, timeLimit: e.target.value })} />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium">Passing Marks</label>
          <input className="w-full rounded border p-2" type="number" value={form.passingMarks} onChange={(e) => setForm({ ...form, passingMarks: e.target.value })} />
        </div>
        <div className="md:col-span-2 space-y-1">
          <label className="text-sm font-medium">Description</label>
          <textarea className="w-full rounded border p-2" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        </div>
      </div>

      <div className="border-t pt-4">
        <h3 className="font-semibold mb-4">Questions</h3>
        <QuestionBuilder questions={questions} setQuestions={setQuestions} />
      </div>

      <div className="flex gap-3 border-t pt-6">
        <button 
          onClick={async () => { 
            await api.put(`/teacher/quizzes/${id}`, { 
              ...form, 
              questions, 
              totalMarks: questions.reduce((s, q) => s + Number(q.marks || 0), 0) 
            }); 
            navigate('/teacher/quizzes') 
          }} 
          className="rounded-lg bg-[#7c3aed] px-8 py-3 text-white font-bold hover:bg-[#6d28d9]"
        >
          Save Changes
        </button>
        <button onClick={() => navigate('/teacher/quizzes')} className="rounded-lg border border-slate-300 px-8 py-3 bg-white hover:bg-slate-50">
          Cancel
        </button>
      </div>
    </div>
  )
}

export default EditQuiz
