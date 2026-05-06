import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../api/axios'

const AvailableQuizzes = () => {
  const navigate = useNavigate()
  const [quizzes, setQuizzes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => { 
    api.get('/student/quizzes')
      .then((res) => setQuizzes(res.data || []))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="p-10 text-center font-bold text-slate-400">Loading quizzes...</div>

  return (
    <div className="space-y-8 animate-slide-up">
      <div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Available <span className="text-emerald-600">Quizzes</span></h1>
        <p className="text-slate-500 font-medium">Test your knowledge and track your progress.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {quizzes.map((q, i) => {
          const isAttempted = q.attemptStatus === 'submitted'
          return (
            <div 
              key={q.id} 
              className={`glass-card rounded-[32px] p-6 transition-all duration-300 relative overflow-hidden group ${
                isAttempted ? 'opacity-80' : 'hover:-translate-y-2'
              }`}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {/* Card Decor */}
              <div className={`absolute top-0 right-0 w-32 h-32 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2 -z-10 ${isAttempted ? 'bg-slate-200' : 'bg-emerald-200'}`}></div>

              <div className="flex justify-between items-start mb-6">
                <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${isAttempted ? 'bg-slate-100 text-slate-500' : 'bg-emerald-100 text-emerald-700'}`}>
                  {q.course}
                </div>
                <div className="text-xl">{isAttempted ? '🔒' : '⏱️'}</div>
              </div>

              <h3 className="text-xl font-bold text-slate-800 leading-tight mb-2 group-hover:text-emerald-600 transition-colors line-clamp-2">
                {q.title}
              </h3>
              
              <div className="flex gap-4 mb-8 text-sm font-bold text-slate-500">
                <div className="flex items-center gap-1">
                  <span>⌚</span> {q.timeLimit} mins
                </div>
                <div className="flex items-center gap-1">
                  <span>🎯</span> {q.questionsCount || 10} Qs
                </div>
              </div>

              <button 
                disabled={isAttempted} 
                onClick={() => navigate(`/student/quiz/${q.id}`)} 
                className={`w-full py-4 rounded-2xl font-black text-sm transition-all ${
                  isAttempted 
                    ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                    : 'bg-slate-900 text-white hover:bg-emerald-500 shadow-xl shadow-emerald-100 group-hover:scale-105'
                }`}
              >
                {isAttempted ? 'Already Attempted' : 'Start Quiz Now'}
              </button>
            </div>
          )
        })}
      </div>

      {quizzes.length === 0 && (
        <div className="text-center py-20 glass-card rounded-[40px] border-dashed border-2">
          <p className="text-slate-400 text-lg italic">No quizzes available for your course yet.</p>
        </div>
      )}
    </div>
  )
}

export default AvailableQuizzes
