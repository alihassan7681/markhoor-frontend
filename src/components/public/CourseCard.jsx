import { Link } from 'react-router-dom'

const CourseCard = ({ course }) => (
  <article className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
    <div className="h-32 rounded-lg bg-gradient-to-r from-[#1e3a5f] to-[#2563eb]" />
    <h3 className="mt-3 font-semibold text-[#1e3a5f]">{course.name}</h3>
    <p className="mt-1 text-sm text-slate-600">{course.description}</p>
    <div className="mt-3 flex items-center justify-between text-sm">
      <span>{course.duration || 'Flexible'}</span>
      <span className="font-semibold text-[#f5a623]">PKR {course.fee || 0}</span>
    </div>
    <Link to={`/courses/${course._id}`} className="mt-3 inline-block rounded bg-[#1e3a5f] px-3 py-2 text-sm text-white">Learn More</Link>
  </article>
)

export default CourseCard
