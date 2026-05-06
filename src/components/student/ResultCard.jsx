import { Link } from 'react-router-dom'

const ResultCard = ({ item }) => {
  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-[#166534]">{item.quizTitle}</h3>
          <p className="text-xs text-slate-500">{item.date ? new Date(item.date).toLocaleString() : '-'}</p>
        </div>
        <span className={`rounded-full px-2 py-1 text-xs font-semibold ${item.isPassed ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
          {item.isPassed ? 'Pass' : 'Fail'}
        </span>
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2 text-sm text-slate-700">
        <p>Marks: {item.marks}/{item.totalMarks}</p>
        <p>Score: {item.percentage}%</p>
        <Link className="text-right font-semibold text-[#16a34a]" to={`/student/results/${item.attemptId}`}>View Detail</Link>
      </div>
    </div>
  )
}

export default ResultCard
