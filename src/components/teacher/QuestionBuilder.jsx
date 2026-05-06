import { useState } from 'react'

const emptyQ = { questionText: '', questionType: 'mcq', options: ['', '', '', ''], correctAnswer: '', marks: 1, timeLimit: 0 }

const QuestionBuilder = ({ questions, setQuestions }) => {
  const [draft, setDraft] = useState(emptyQ)

  const add = () => {
    if (!draft.questionText.trim() || !draft.correctAnswer) return
    const payload = draft.questionType === 'truefalse'
      ? { ...draft, options: ['True', 'False'] }
      : draft
    setQuestions([...questions, payload])
    setDraft(emptyQ)
  }

  return (
    <div className="space-y-3 rounded-xl bg-white p-4 shadow-sm">
      <input className="w-full rounded border p-2" placeholder="Question text" value={draft.questionText} onChange={(e) => setDraft({ ...draft, questionText: e.target.value })} />
      <select className="w-full rounded border p-2" value={draft.questionType} onChange={(e) => setDraft({ ...draft, questionType: e.target.value, correctAnswer: '' })}>
        <option value="mcq">MCQ</option><option value="truefalse">True/False</option>
      </select>
      {draft.questionType === 'mcq' && draft.options.map((opt, i) => (
        <input key={i} className="w-full rounded border p-2" placeholder={`Option ${i + 1}`} value={opt} onChange={(e) => {
          const next = [...draft.options]
          next[i] = e.target.value
          setDraft({ ...draft, options: next })
        }} />
      ))}
      <input className="w-full rounded border p-2" placeholder="Correct Answer" value={draft.correctAnswer} onChange={(e) => setDraft({ ...draft, correctAnswer: e.target.value })} />
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-500 uppercase">Marks</label>
          <input type="number" className="w-full rounded border p-2" min="1" value={draft.marks} onChange={(e) => setDraft({ ...draft, marks: Number(e.target.value) })} />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-500 uppercase">Time Limit (Seconds)</label>
          <input type="number" className="w-full rounded border p-2" min="0" placeholder="0 = No limit" value={draft.timeLimit || 0} onChange={(e) => setDraft({ ...draft, timeLimit: Number(e.target.value) })} />
        </div>
      </div>
      <button onClick={add} className="w-full rounded-lg bg-[#7c3aed] py-3 text-white font-bold hover:bg-[#6d28d9] transition-colors">
        Add Question
      </button>
    </div>
  )
}

export default QuestionBuilder
