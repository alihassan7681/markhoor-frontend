import { useEffect, useState } from 'react'
import api from '../../api/axios'
import { FaUser, FaEnvelope, FaPhone, FaCommentAlt, FaMapMarkerAlt, FaClock, FaPaperPlane } from 'react-icons/fa'
import toast from 'react-hot-toast'

const Contact = () => {
  const [courses, setCourses] = useState([])
  const [form, setForm] = useState({ name: '', email: '', phone: '', course: '', message: '' })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    api.get('/public/courses').then((res) => setCourses(res.data))
  }, [])

  const submit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.phone || !form.message) return toast.error('Please fill all required fields')
    
    setLoading(true)
    try {
      await api.post('/public/contact', form)
      toast.success('Your message has been sent successfully!')
      setForm({ name: '', email: '', phone: '', course: '', message: '' })
    } catch (err) {
      toast.error('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-16 py-10 animate-slide-up">
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight">
          Get In <span className="text-[#0077ff]">Touch</span>
        </h1>
        <p className="text-slate-500 text-base md:text-lg max-w-2xl mx-auto">
          Have questions? Our team is here to help you choose the right path for your career.
        </p>
      </div>

      <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr] items-start">
        {/* Contact Form */}
        <div className="glass-card rounded-[40px] p-8 md:p-12 border-white/60 shadow-2xl bg-white/40">
          <form onSubmit={submit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                <div className="relative">
                  <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                  <input 
                    required 
                    className="w-full rounded-2xl bg-white border-2 border-slate-100 pl-12 pr-4 py-4 outline-none focus:border-[#0077ff] focus:ring-4 focus:ring-blue-50 transition-all font-semibold" 
                    placeholder="John Doe" 
                    value={form.name} 
                    onChange={(e) => setForm({ ...form, name: e.target.value })} 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                <div className="relative">
                  <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                  <input 
                    required 
                    type="email"
                    className="w-full rounded-2xl bg-white border-2 border-slate-100 pl-12 pr-4 py-4 outline-none focus:border-[#0077ff] focus:ring-4 focus:ring-blue-50 transition-all font-semibold" 
                    placeholder="hello@example.com" 
                    value={form.email} 
                    onChange={(e) => setForm({ ...form, email: e.target.value })} 
                  />
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Phone Number</label>
                <div className="relative">
                  <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                  <input 
                    required 
                    className="w-full rounded-2xl bg-white border-2 border-slate-100 pl-12 pr-4 py-4 outline-none focus:border-[#0077ff] focus:ring-4 focus:ring-blue-50 transition-all font-semibold" 
                    placeholder="+92 300 0000000" 
                    value={form.phone} 
                    onChange={(e) => setForm({ ...form, phone: e.target.value })} 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Interested Course</label>
                <select 
                  className="w-full rounded-2xl bg-white border-2 border-slate-100 px-4 py-4 outline-none focus:border-[#0077ff] focus:ring-4 focus:ring-blue-50 transition-all font-semibold appearance-none" 
                  value={form.course} 
                  onChange={(e) => setForm({ ...form, course: e.target.value })}
                >
                  <option value="">Select a Course</option>
                  {courses.map((course) => <option key={course._id} value={course.name}>{course.name}</option>)}
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Message</label>
              <div className="relative">
                <FaCommentAlt className="absolute left-4 top-5 text-slate-300" />
                <textarea 
                  required 
                  rows="5" 
                  className="w-full rounded-2xl bg-white border-2 border-slate-100 pl-12 pr-4 py-4 outline-none focus:border-[#0077ff] focus:ring-4 focus:ring-blue-50 transition-all font-semibold resize-none" 
                  placeholder="Tell us about your goals..." 
                  value={form.message} 
                  onChange={(e) => setForm({ ...form, message: e.target.value })} 
                />
              </div>
            </div>

            <button 
              disabled={loading}
              className="w-full sm:w-auto px-10 py-5 rounded-2xl bg-[#0077ff] text-white font-black text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 flex items-center justify-center gap-3 group"
            >
              {loading ? 'Sending...' : 'Send Message'}
              <FaPaperPlane className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </form>
        </div>

        {/* Info Cards */}
        <div className="space-y-6">
          <div className="glass-card p-8 rounded-[32px] border-white/60 bg-white/40 space-y-4">
            <div className="h-12 w-12 rounded-2xl bg-blue-50 text-[#0077ff] flex items-center justify-center text-xl">
              <FaMapMarkerAlt />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">Our Location</h3>
              <p className="text-slate-500">Opposite Government College Sahiwal, Punjab, Pakistan</p>
            </div>
          </div>

          <div className="glass-card p-8 rounded-[32px] border-white/60 bg-white/40 space-y-4">
            <div className="h-12 w-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-xl">
              <FaPhone />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">Phone & Email</h3>
              <p className="text-slate-500">+92 300 0000000</p>
              <p className="text-slate-500">info@markhorcollege.com</p>
            </div>
          </div>

          <div className="glass-card p-8 rounded-[32px] border-white/60 bg-white/40 space-y-4">
            <div className="h-12 w-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center text-xl">
              <FaClock />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">Opening Hours</h3>
              <p className="text-slate-500">Monday - Saturday</p>
              <p className="text-slate-500">09:00 AM - 06:00 PM</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
