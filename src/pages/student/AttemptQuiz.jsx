import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../../api/axios'

const AttemptQuiz = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [quiz, setQuiz] = useState(null)
  const [attemptId, setAttemptId] = useState('')
  const [answers, setAnswers] = useState({})
  const [index, setIndex] = useState(0)
  const [timeLeft, setTimeLeft] = useState(0)
  const [qTimeLeft, setQTimeLeft] = useState(0)

  useEffect(() => { 
    Promise.all([
      api.get(`/student/quizzes/${id}`), 
      api.post(`/student/quizzes/${id}/start`)
    ]).then(([q, a]) => { 
      setQuiz(q.data); 
      setAttemptId(a.data.attemptId); 
      setTimeLeft((q.data.timeLimit || 30) * 60) 
    }) 
  }, [id])

  // Total Timer
  useEffect(() => { 
    if (!quiz) return; 
    if (timeLeft <= 0) {
      submit(); 
      return;
    }
    const t = setInterval(() => setTimeLeft((v) => v - 1), 1000); 
    return () => clearInterval(t) 
  }, [timeLeft, quiz])

  // Per Question Timer
  useEffect(() => {
    if (!quiz) return;
    const currentQ = quiz.questions[index];
    if (currentQ?.timeLimit > 0) {
      setQTimeLeft(currentQ.timeLimit);
    } else {
      setQTimeLeft(0);
    }
  }, [index, quiz]);

  useEffect(() => {
    if (!quiz || qTimeLeft <= 0) return;
    const t = setInterval(() => {
      setQTimeLeft((v) => {
        if (v <= 1) {
          if (index < quiz.questions.length - 1) {
            setIndex(index + 1);
          } else {
            submit();
          }
          return 0;
        }
        return v - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [qTimeLeft, quiz, index]);

  const submit = async () => { 
    const payload = { 
      attemptId, 
      answers: Object.entries(answers).map(([questionId, selectedAnswer]) => ({ questionId, selectedAnswer })) 
    }; 
    const { data } = await api.post(`/student/quizzes/${id}/submit`, payload); 
    navigate(`/student/results/${data.result.attemptId}`) 
  }

  if (!quiz) return null
  const q = quiz.questions[index]

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 rounded-2xl bg-white p-6 shadow-sm border border-slate-100">
          <div>
            <h1 className="text-xl font-bold text-[#1e3a5f]">{quiz.title}</h1>
            <p className="text-sm text-slate-500">{quiz.course}</p>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-center">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Time Left</p>
              <p className={`text-2xl font-mono font-bold ${timeLeft < 60 ? 'text-red-500 animate-pulse' : 'text-[#7c3aed]'}`}>
                {formatTime(timeLeft)}
              </p>
            </div>
            <div className="text-center border-l pl-6">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Progress</p>
              <p className="text-2xl font-bold text-slate-700">{index + 1} / {quiz.questions.length}</p>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
          <div className="space-y-6">
            <div className="rounded-2xl bg-white p-8 shadow-sm border border-slate-100 min-h-[400px] flex flex-col">
              <div className="flex-1">
                <span className="inline-block px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-bold mb-4">
                  Question {index + 1}
                </span>
                {qTimeLeft > 0 && (
                  <div className="float-right flex items-center gap-2 px-3 py-1 rounded-lg bg-orange-50 text-orange-600 border border-orange-100 animate-pulse">
                    <span className="text-xs font-bold uppercase">Question Timer:</span>
                    <span className="font-mono font-bold">{qTimeLeft}s</span>
                  </div>
                )}
                <h3 className="text-xl font-medium text-slate-800 leading-relaxed mb-8">
                  {q.questionText}
                </h3>
                <div className="space-y-3">
                  {q.options.map((o) => (
                    <button 
                      key={o} 
                      onClick={() => setAnswers({ ...answers, [q._id]: o })} 
                      className={`group relative flex items-center w-full rounded-xl border-2 p-4 text-left transition-all ${
                        answers[q._id] === o 
                          ? 'border-[#7c3aed] bg-[#f5f3ff] text-[#7c3aed]' 
                          : 'border-slate-100 hover:border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <span className={`mr-4 flex h-6 w-6 items-center justify-center rounded-full border-2 transition-colors ${
                        answers[q._id] === o ? 'border-[#7c3aed] bg-[#7c3aed] text-white' : 'border-slate-300'
                      }`}>
                        {answers[q._id] === o && <div className="h-2 w-2 rounded-full bg-white" />}
                      </span>
                      <span className="font-medium">{o}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-12 flex justify-between pt-6 border-t border-slate-50">
                <button 
                  disabled={index === 0}
                  onClick={() => setIndex((i) => Math.max(0, i - 1))}
                  className="px-6 py-2 font-semibold text-slate-600 hover:text-slate-900 disabled:opacity-30"
                >
                  ← Previous
                </button>
                <button 
                  disabled={index === quiz.questions.length - 1}
                  onClick={() => setIndex((i) => Math.min(quiz.questions.length - 1, i + 1))}
                  className="px-8 py-2 rounded-lg bg-slate-800 text-white font-semibold hover:bg-slate-900 disabled:opacity-30"
                >
                  Next Question →
                </button>
              </div>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-100">
              <h3 className="font-bold text-slate-800 mb-4">Question Map</h3>
              <div className="grid grid-cols-5 gap-2">
                {quiz.questions.map((item, i) => (
                  <button 
                    key={item._id} 
                    onClick={() => setIndex(i)} 
                    className={`h-10 w-10 rounded-lg text-xs font-bold transition-all ${
                      index === i ? 'ring-2 ring-[#7c3aed] ring-offset-2' : ''
                    } ${
                      answers[item._id] ? 'bg-green-500 text-white' : 'bg-slate-100 text-slate-400'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t border-slate-50">
                <button 
                  onClick={() => window.confirm(`You have answered ${Object.keys(answers).length} out of ${quiz.questions.length} questions. Are you sure you want to submit?`) && submit()} 
                  className="w-full rounded-xl bg-[#16a34a] py-4 text-white font-bold shadow-lg shadow-green-100 hover:bg-[#15803d] hover:shadow-none transition-all"
                >
                  Finish & Submit
                </button>
              </div>
            </div>

            <div className="rounded-2xl bg-slate-800 p-6 text-white">
              <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Instructions</h4>
              <ul className="text-xs space-y-2 text-slate-300">
                <li>• Do not refresh the page</li>
                <li>• Quiz will auto-submit when timer ends</li>
                <li>• You can jump between questions</li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}

export default AttemptQuiz
