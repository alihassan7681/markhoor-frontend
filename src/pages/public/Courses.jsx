import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../../api/axios'

const Courses = () => {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/public/courses').then((res) => {
      setCourses(res.data)
      setLoading(false)
    })
  }, [])

  const getCourseImage = (courseName) => {
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

  if (loading) return <div className="text-center py-20">Loading courses...</div>

  return (
    <div className="space-y-16 py-10">
      <div className="text-center space-y-4 animate-slide-up">
        <h1 className="text-5xl font-black text-slate-900 leading-tight">
          Explore Our <span className="text-[#0077ff]">Professional</span> Courses
        </h1>
        <p className="text-slate-500 text-lg max-w-2xl mx-auto">
          Gain industry-relevant skills with our hands-on courses. From coding to creative arts, we have it all.
        </p>
      </div>

      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
        {courses.map((c, i) => (
          <div 
            key={c._id} 
            className="glass-card rounded-[40px] overflow-hidden group hover:-translate-y-4 transition-all duration-500 border-white/60 animate-slide-up"
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            <div className="relative h-64 overflow-hidden bg-slate-100">
              <img 
                src={resolveImageUrl(c.image || getCourseImage(c.name))} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                alt={c.name}
              />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-4 py-1 rounded-full text-xs font-bold text-slate-900">
                {c.duration || '3 Months'}
              </div>
            </div>
            
            <div className="p-8 space-y-6">
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-slate-800 group-hover:text-[#0077ff] transition-colors">{c.name}</h3>
                <p className="text-slate-500 text-sm line-clamp-2">{c.description}</p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Price</p>
                  <Link to="/contact" className="text-xl font-black text-[#0077ff] hover:underline">Contact Us</Link>
                </div>
                <Link to={`/courses/${c._id}`} className="px-6 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-sm hover:bg-[#0077ff] transition-all">
                  Enroll Now
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Courses
