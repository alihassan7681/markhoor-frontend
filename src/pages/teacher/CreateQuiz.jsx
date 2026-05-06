import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../api/axios'
import toast from 'react-hot-toast'
import QuestionBuilder from '../../components/teacher/QuestionBuilder'

const CreateQuiz = () => {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [questions, setQuestions] = useState([])
  const [form, setForm] = useState({ title: '', description: '', course: '', timeLimit: 30, passingMarks: 0 })
  const save = async (publish) => { 
    try {
      const { data } = await api.post('/teacher/quizzes', { 
        ...form, 
        questions, 
        totalMarks: questions.reduce((s, q) => s + Number(q.marks || 0), 0) 
      }); 
      if (publish) {
        await api.patch(`/teacher/quizzes/${data._id}/publish`, {}); 
        toast.success('Quiz created and published!')
      } else {
        toast.success('Quiz saved as draft')
      }
      navigate('/teacher/quizzes') 
    } catch (err) {
      toast.error('Failed to save quiz')
    }
  }
  return (
    <div className="space-y-4 rounded bg-white p-4 shadow-sm">
      <div className="space-x-2">
        {[1, 2, 3].map((s) => (
          <button 
            key={s} 
            onClick={() => setStep(s)} 
            className={`rounded px-3 py-1 ${step === s ? 'bg-[#7c3aed] text-white' : 'bg-slate-100'}`}
          >
            Step {s}
          </button>
        ))}
      </div>
      
      {step === 1 && (
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-1">
            <label className="text-sm font-medium">Quiz Title</label>
            <input className="w-full rounded border p-2" placeholder="e.g. Midterm Exam" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium">Course</label>
            <input className="w-full rounded border p-2" placeholder="e.g. Web Development" value={form.course} onChange={(e) => setForm({ ...form, course: e.target.value })} />
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
            <textarea className="w-full rounded border p-2" placeholder="Instructions for students..." value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          </div>
        </div>
      )}

      {step === 2 && <QuestionBuilder questions={questions} setQuestions={setQuestions} />}
      
      {step === 3 && (
        <div className="p-4 border rounded-xl bg-slate-50">
          <h3 className="font-bold text-lg mb-2">Quiz Summary</h3>
          <p className="text-slate-600">Total Questions: <b>{questions.length}</b></p>
          <p className="text-slate-600">Total Time: <b>{form.timeLimit} Minutes</b></p>
          <div className="mt-6 flex gap-3">
            <button className="rounded border border-slate-300 bg-white px-6 py-2 hover:bg-slate-50" onClick={() => save(false)}>Save as Draft</button>
            <button className="rounded bg-[#7c3aed] px-6 py-2 text-white font-bold hover:bg-[#6d28d9]" onClick={() => save(true)}>Save & Publish Now</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default CreateQuiz
