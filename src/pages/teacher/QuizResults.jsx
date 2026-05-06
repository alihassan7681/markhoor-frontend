import { useEffect, useMemo, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../../api/axios'
import toast from 'react-hot-toast'

const QuizResults = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [rows, setRows] = useState([])
  const [filter, setFilter] = useState('all')
  const [loading, setLoading] = useState(true)
  const [selectedAttempt, setSelectedAttempt] = useState(null)
  const [quizInfo, setQuizInfo] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resultsRes, quizRes] = await Promise.all([
          api.get(`/teacher/quizzes/${id}/results`),
          api.get(`/teacher/quizzes/${id}`)
        ])
        setRows(resultsRes.data || [])
        setQuizInfo(quizRes.data)
      } catch (err) {
        toast.error('Failed to load results')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [id])

  const filteredList = useMemo(() => {
    return rows.filter((r) => {
      if (filter === 'passed') return r.isPassed
      if (filter === 'failed') return !r.isPassed
      return true
    })
  }, [rows, filter])

  const stats = useMemo(() => {
    if (!rows.length) return { avg: 0, passRate: 0, highest: 0 }
    const passed = rows.filter(r => r.isPassed).length
    const avg = rows.reduce((acc, r) => acc + r.percentage, 0) / rows.length
    const highest = Math.max(...rows.map(r => r.percentage))
    return {
      avg: avg.toFixed(1),
      passRate: ((passed / rows.length) * 100).toFixed(1),
      highest: highest.toFixed(1)
    }
  }, [rows])

  const fetchDetail = async (studentId) => {
    try {
      const res = await api.get(`/teacher/quizzes/${id}/results/${studentId}`)
      setSelectedAttempt(res.data)
    } catch (err) {
      toast.error('Failed to load attempt details')
    }
  }

  if (loading) return (
    <div className="flex h-64 items-center justify-center">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#7c3aed] border-t-transparent"></div>
    </div>
  )

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Header & Stats */}
      <div className="grid gap-6 md:grid-cols-4 items-end">
        <div className="md:col-span-2">
          <button 
            onClick={() => navigate('/teacher/quizzes')}
            className="mb-4 text-sm font-bold text-slate-500 hover:text-[#7c3aed] transition-colors flex items-center gap-2"
          >
            ← Back to Quizzes
          </button>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            {quizInfo?.title} <span className="text-[#7c3aed]">Results</span>
          </h1>
          <p className="text-slate-500 font-medium">{quizInfo?.course} • {rows.length} Submissions</p>
        </div>

        <div className="grid grid-cols-3 gap-4 md:col-span-2">
          <div className="glass-card p-4 rounded-2xl text-center">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Pass Rate</p>
            <p className="text-xl font-black text-emerald-600">{stats.passRate}%</p>
          </div>
          <div className="glass-card p-4 rounded-2xl text-center">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Avg Score</p>
            <p className="text-xl font-black text-blue-600">{stats.avg}%</p>
          </div>
          <div className="glass-card p-4 rounded-2xl text-center">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Highest</p>
            <p className="text-xl font-black text-[#7c3aed]">{stats.highest}%</p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Student List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between px-2">
            <div className="flex bg-slate-100 p-1 rounded-xl">
              {['all', 'passed', 'failed'].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider transition-all ${
                    filter === f ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="glass-card rounded-[32px] overflow-hidden">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100">
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Student Name</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Score</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Percentage</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredList.map((r) => (
                  <tr 
                    key={r.attemptId} 
                    onClick={() => fetchDetail(r.studentId)}
                    className={`group cursor-pointer transition-colors hover:bg-slate-50/80 ${
                      selectedAttempt?.student?._id === r.studentId ? 'bg-[#7c3aed]/5' : ''
                    }`}
                  >
                    <td className="px-6 py-4">
                      <p className="font-bold text-slate-800 group-hover:text-[#7c3aed] transition-colors">{r.studentName}</p>
                      <p className="text-[10px] text-slate-400 font-medium">{r.studentEmail}</p>
                    </td>
                    <td className="px-6 py-4 font-black text-slate-700">{r.marks}/{r.totalMarks}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div 
                            className={`h-full transition-all duration-1000 ${r.isPassed ? 'bg-emerald-500' : 'bg-red-400'}`}
                            style={{ width: `${r.percentage}%` }}
                          />
                        </div>
                        <span className="text-xs font-black text-slate-500">{r.percentage}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${
                        r.isPassed ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {r.isPassed ? 'Passed' : 'Failed'}
                      </span>
                    </td>
                  </tr>
                ))}
                {filteredList.length === 0 && (
                  <tr>
                    <td colSpan="4" className="px-6 py-12 text-center text-slate-400 font-medium italic">
                      No results found for this filter.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Detail View */}
        <div className="space-y-4">
          <div className="px-2">
            <h2 className="text-xs font-black uppercase tracking-widest text-slate-400">Attempt Details</h2>
          </div>
          
          {selectedAttempt ? (
            <div className="glass-card rounded-[32px] p-6 space-y-6 sticky top-8">
              <div className="pb-4 border-b border-slate-100">
                <h3 className="text-xl font-black text-slate-900">{selectedAttempt.student?.name}</h3>
                <p className="text-xs font-bold text-emerald-600 uppercase tracking-wider mt-1">
                  Obtained {selectedAttempt.summary?.totalMarksObtained} out of {selectedAttempt.summary?.totalMarks}
                </p>
              </div>

              <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                {selectedAttempt.answers.map((a, i) => (
                  <div key={i} className={`p-4 rounded-2xl border ${
                    a.isCorrect ? 'bg-emerald-50/30 border-emerald-100' : 'bg-red-50/30 border-red-100'
                  }`}>
                    <p className="text-xs font-bold text-slate-700 mb-2 leading-relaxed">
                      <span className="text-[#7c3aed] mr-1">Q{i+1}.</span> {a.questionText}
                    </p>
                    <div className="space-y-1">
                      <p className={`text-[10px] font-black uppercase tracking-widest ${a.isCorrect ? 'text-emerald-600' : 'text-red-600'}`}>
                        Student Answer: <span className="text-slate-900 ml-1">{a.selectedAnswer || 'No Answer'}</span>
                      </p>
                      {!a.isCorrect && (
                        <p className="text-[10px] font-black uppercase tracking-widest text-emerald-600">
                          Correct Answer: <span className="text-slate-900 ml-1">{a.correctAnswer}</span>
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-between items-center text-[10px] font-black text-slate-400 uppercase tracking-widest">
                <span>Time Taken: {selectedAttempt.summary?.timeTaken}m</span>
                <span>Submitted: {new Date(selectedAttempt.summary?.submittedAt).toLocaleDateString()}</span>
              </div>
            </div>
          ) : (
            <div className="glass-card rounded-[32px] p-12 text-center flex flex-col items-center justify-center h-64 border-dashed">
              <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center mb-4 text-2xl">📋</div>
              <p className="text-slate-400 text-sm font-bold leading-tight">
                Select a student to view<br/>their detailed test answers.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default QuizResults
