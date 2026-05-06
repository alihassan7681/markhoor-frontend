const QuestionDisplay = ({ question, index, total, selectedAnswer, onSelect }) => {
  const options = question.questionType === 'truefalse' ? ['True', 'False'] : question.options || []

  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm">
      <div className="mb-3 flex items-center justify-between gap-2">
        <p className="text-sm font-semibold text-[#166534]">Question {index + 1} / {total}</p>
        <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-700">
          {question.questionType === 'truefalse' ? 'True/False' : 'MCQ'}
        </span>
      </div>
      <h3 className="mb-3 text-lg font-semibold text-slate-800">{question.questionText}</h3>
      <p className="mb-4 text-xs text-slate-500">Marks: {question.marks}</p>
      <div className="space-y-2">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => onSelect(question._id, option)}
            className={`w-full rounded-lg border px-4 py-3 text-left text-sm transition ${
              selectedAnswer === option
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  )
}

export default QuestionDisplay
