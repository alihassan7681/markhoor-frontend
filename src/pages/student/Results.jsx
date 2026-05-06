import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import api from '../../api/axios'

const Results = () => {
  const { attemptId } = useParams()
  const [rows, setRows] = useState([])
  const [detail, setDetail] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => { 
    if (attemptId) {
      api.get(`/student/results/${attemptId}`)
        .then((res) => setDetail(res.data))
        .finally(() => setLoading(false))
    } else {
      api.get('/student/results')
        .then((res) => setRows(res.data || []))
        .finally(() => setLoading(false))
    }
  }, [attemptId])

  if (loading) return <div className="p-10 text-center font-bold text-slate-400">Loading results...</div>

  // LIST VIEW
  if (!attemptId) return (
    <div className="space-y-8 animate-slide-up">
      <div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Performance <span className="text-[#0077ff]">History</span></h1>
        <p className="text-slate-500 font-medium">Review your past quiz results and detailed feedback.</p>
      </div>

      <div className="glass-card rounded-[40px] overflow-hidden border-white/60 shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-900 text-white font-bold uppercase tracking-widest text-[10px]">
              <tr>
                <th className="px-8 py-5">Quiz Title</th>
                <th className="px-8 py-5">Date</th>
                <th className="px-8 py-5 text-center">Score</th>
                <th className="px-8 py-5 text-center">Result</th>
                <th className="px-8 py-5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {rows.map((r) => (
                <tr key={r.attemptId} className="hover:bg-blue-50/30 transition-all group">
                  <td className="px-8 py-6">
                    <p className="font-black text-slate-900 text-lg leading-none">{r.quizTitle}</p>
                  </td>
                  <td className="px-8 py-6 text-slate-500 font-medium">
                    {new Date(r.date).toLocaleDateString()}
                  </td>
                  <td className="px-8 py-6 text-center">
                    <div className="inline-flex items-baseline gap-1">
                      <span className="text-xl font-black text-slate-900">{r.marks}</span>
                      <span className="text-xs text-slate-400">/{r.totalMarks}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-center">
                    <span className={`inline-block px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                      r.isPassed ? 'bg-green-50 text-green-600 border-green-100' : 'bg-red-50 text-red-600 border-red-100'
                    }`}>
                      {r.isPassed ? 'Passed' : 'Failed'}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <Link to={`/student/results/${r.attemptId}`} className="px-5 py-2 rounded-xl bg-slate-100 text-slate-600 font-bold hover:bg-[#0077ff] hover:text-white transition-all text-xs">
                      View Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {rows.length === 0 && (
          <div className="p-20 text-center space-y-4">
            <div className="text-6xl">📝</div>
            <p className="text-slate-400 font-medium italic">You haven't attempted any quizzes yet.</p>
          </div>
        )}
      </div>
    </div>
  )

  // DETAIL VIEW
  if (!detail) return null
  
  const { summary, quiz, answers } = detail
  return (
    <div className="space-y-8 animate-slide-up max-w-4xl mx-auto">
      <div className="flex items-center gap-4">
        <Link to="/student/results" className="h-10 w-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-colors">
          ←
        </Link>
        <h1 className="text-2xl font-black text-slate-900">Result Card</h1>
      </div>

      <div className={`glass-card rounded-[40px] p-8 md:p-12 relative overflow-hidden text-white ${summary.isPassed ? 'bg-gradient-to-br from-green-500 to-emerald-700' : 'bg-gradient-to-br from-red-500 to-rose-700'}`}>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-block px-3 py-1 rounded-full bg-white/20 text-xs font-bold uppercase tracking-widest backdrop-blur-md mb-4">
              {summary.isPassed ? '🎉 Congratulations' : '💪 Needs Improvement'}
            </div>
            <h2 className="text-4xl font-black">{quiz.title}</h2>
            <p className="text-white/80 font-medium">{new Date(summary.date || Date.now()).toLocaleDateString()}</p>
          </div>

          <div className="flex gap-8 items-center bg-white/10 rounded-[32px] p-6 backdrop-blur-md border border-white/20">
            <div className="text-center">
              <p className="text-[10px] font-black uppercase tracking-widest text-white/70">Score</p>
              <p className="text-4xl font-black">{summary.totalMarksObtained}<span className="text-xl text-white/50">/{summary.totalMarks}</span></p>
            </div>
            <div className="w-px h-16 bg-white/20"></div>
            <div className="text-center">
              <p className="text-[10px] font-black uppercase tracking-widest text-white/70">Percentage</p>
              <p className="text-4xl font-black">{summary.percentage}%</p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="text-xl font-black text-slate-900 px-2">Detailed Breakdown</h3>
        
        {answers.map((a, i) => {
          const isCorrect = a.marksObtained > 0
          return (
            <div key={i} className={`glass-card rounded-3xl p-6 md:p-8 border-2 transition-all ${isCorrect ? 'border-green-100 hover:border-green-300' : 'border-red-100 hover:border-red-300'}`}>
              <div className="flex items-start gap-4 mb-6">
                <div className={`h-8 w-8 shrink-0 rounded-xl flex items-center justify-center font-black text-sm text-white ${isCorrect ? 'bg-green-500' : 'bg-red-500'}`}>
                  {i + 1}
                </div>
                <div>
                  <p className="text-lg font-bold text-slate-800">{a.questionText}</p>
                  <p className="text-xs font-bold text-slate-400 mt-2">Points: {a.marksObtained}/{a.questionMarks}</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 pl-12">
                <div className={`p-4 rounded-2xl ${isCorrect ? 'bg-green-50' : 'bg-red-50'}`}>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Your Answer</p>
                  <p className={`font-bold ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>{a.studentAnswer || '(No Answer)'}</p>
                </div>
                
                {!isCorrect && (
                  <div className="p-4 rounded-2xl bg-green-50">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Correct Answer</p>
                    <p className="font-bold text-green-700">{a.correctAnswer}</p>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Results
