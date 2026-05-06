const QuizCard = ({ quiz, onStart }) => {
  const now = new Date()
  const hasEnded = quiz.endTime ? now > new Date(quiz.endTime) : false
  const attempted = quiz.attemptStatus === 'submitted'
  const disabled = attempted || hasEnded

  const status = attempted ? 'Attempted' : hasEnded ? 'Expired' : 'Available'
  const statusClass = attempted
    ? 'bg-slate-200 text-slate-700'
    : hasEnded
      ? 'bg-red-100 text-red-700'
      : 'bg-emerald-100 text-emerald-700'

  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm">
      <div className="mb-2 flex items-center justify-between gap-2">
        <h3 className="text-lg font-semibold text-[#166534]">{quiz.title}</h3>
        <span className={`rounded-full px-2 py-1 text-xs font-semibold ${statusClass}`}>{status}</span>
      </div>
      <p className="mb-3 text-sm text-slate-500">{quiz.course || 'General Course'}</p>
      <div className="grid grid-cols-2 gap-2 text-sm text-slate-600">
        <p>Questions: {quiz.questionCount || quiz.totalQuestions || '-'}</p>
        <p>Time: {quiz.timeLimit} min</p>
        <p>Total Marks: {quiz.totalMarks}</p>
        <p>Pass Marks: {quiz.passingMarks ?? '-'}</p>
      </div>
      {(quiz.startTime || quiz.endTime) && (
        <p className="mt-2 text-xs text-slate-500">
          {quiz.startTime ? `Start: ${new Date(quiz.startTime).toLocaleString()}` : ''} {quiz.endTime ? `| End: ${new Date(quiz.endTime).toLocaleString()}` : ''}
        </p>
      )}
      <button
        onClick={() => onStart(quiz)}
        disabled={disabled}
        className="mt-4 w-full rounded-lg bg-[#16a34a] px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:bg-slate-300"
      >
        {attempted ? 'Already Attempted' : hasEnded ? 'Quiz Expired' : 'Start Quiz'}
      </button>
    </div>
  )
}

export default QuizCard
