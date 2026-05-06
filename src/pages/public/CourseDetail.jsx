import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import api from '../../api/axios'

const getCourseImage = (courseName) => {
  if (!courseName) return '/webdevelopment.png';
  const name = courseName.toLowerCase();
  if (name.includes('web')) return '/webdevelopment.png';
  if (name.includes('graphic') || name.includes('design')) return '/GraphicDesigning.png';
  if (name.includes('digital') || name.includes('marketing')) return '/DigitalMarketing.png';
  if (name.includes('app') || name.includes('mobile')) return '/MobileAppDevelopmen.png';
  if (name.includes('freelance')) return '/freelancing.png';
  if (name.includes('office') || name.includes('management')) return '/officemagment.png';
  return 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop';
}

const resolveImageUrl = (url) => {
  if (!url) return null;
  if (url.startsWith('/uploads/')) return `http://localhost:5000${url}`;
  return url;
}

const CourseDetail = () => {
  const { id } = useParams()
  const [course, setCourse] = useState(null)
  const [related, setRelated] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([api.get(`/public/courses/${id}`), api.get('/public/courses')])
      .then(([detail, list]) => {
        setCourse(detail.data)
        setRelated(list.data.filter((item) => item._id !== id).slice(0, 3))
      })
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <div className="p-20 text-center font-bold text-slate-400">Loading course details...</div>
  if (!course) return <div className="p-20 text-center text-red-500 font-bold">Course not found</div>

  return (
    <div className="space-y-12 pb-20 animate-slide-up">
      <div className="relative rounded-[40px] overflow-hidden bg-slate-900">
        <div className="absolute inset-0 opacity-40">
          <img 
            src={resolveImageUrl(course.image || getCourseImage(course.name))} 
            alt={course.name} 
            className="w-full h-full object-cover blur-sm" 
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent"></div>
        
        <div className="relative z-10 p-12 lg:p-20 flex flex-col md:flex-row gap-10 items-center">
          <div className="shrink-0 w-64 h-64 rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20">
            <img 
              src={resolveImageUrl(course.image || getCourseImage(course.name))} 
              alt={course.name} 
              className="w-full h-full object-cover" 
            />
          </div>
          <div className="space-y-6 text-center md:text-left">
            <span className="px-4 py-1.5 rounded-full bg-blue-500 text-white font-bold text-sm tracking-widest uppercase">
              Professional Course
            </span>
            <h1 className="text-5xl lg:text-6xl font-black text-white">{course.name}</h1>
            <p className="text-xl text-blue-200 font-bold">{course.duration || '3 Months'}</p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-[2fr_1fr] gap-8">
        <div className="glass-card rounded-[40px] p-10 border-white/60 space-y-8">
          <div>
            <h2 className="text-3xl font-black text-slate-900 mb-4">Course <span className="text-[#0077ff]">Overview</span></h2>
            <p className="text-slate-600 leading-relaxed text-lg">{course.description}</p>
          </div>
          
          <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100 flex items-center justify-between">
            <div>
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Course Fee</p>
              <Link to="/contact" className="text-4xl font-black text-[#0077ff] hover:underline">Contact Us</Link>
            </div>
            <Link to="/registration" className="btn-premium px-10 py-5 text-xl shadow-xl shadow-blue-200">
              Enroll Now
            </Link>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-2xl font-black text-slate-900 px-4">Related <span className="text-[#0077ff]">Courses</span></h3>
          <div className="grid gap-4">
            {related.map((c) => (
              <Link key={c._id} to={`/courses/${c._id}`} className="glass-card p-4 rounded-3xl flex gap-4 items-center group hover:-translate-y-1 transition-transform border-white/60">
                <div className="h-16 w-16 rounded-2xl overflow-hidden shrink-0">
                  <img src={resolveImageUrl(c.image || getCourseImage(c.name))} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                </div>
                <div>
                  <p className="font-bold text-slate-900 group-hover:text-[#0077ff] transition-colors">{c.name}</p>
                  <p className="text-xs text-slate-500">{c.duration || '3 Months'}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CourseDetail
