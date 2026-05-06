import { useState } from 'react'
import api from '../../api/axios'
import toast from 'react-hot-toast'

const Registration = () => {
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    name: '',
    fatherName: '',
    phone: '',
    email: '',
    course: '',
    address: '',
    qualification: ''
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await api.post('/public/register', form)
      toast.success('Registration successful! Admin will contact you soon.')
      setForm({ name: '', fatherName: '', phone: '', email: '', course: '', address: '', qualification: '' })
    } catch (err) {
      toast.error(err.response?.data?.error || 'Registration failed.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-4xl py-12 relative">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 -z-10 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-50"></div>
      
      <div className="grid lg:grid-cols-[1fr_1.5fr] gap-12 items-start">
        <div className="space-y-8 animate-slide-up">
          <div className="space-y-4">
            <h1 className="text-5xl font-black text-slate-900 leading-tight">
              Start Your <br />
              <span className="text-[#0077ff]">Journey</span> with Us
            </h1>
            <p className="text-slate-500 text-lg">
              Fill out the form to apply for admission. Our team will review your application and contact you within 24 hours.
            </p>
          </div>
          
          <div className="space-y-6">
            <div className="flex gap-4 items-center">
              <div className="h-12 w-12 rounded-2xl bg-blue-50 flex items-center justify-center text-2xl">📝</div>
              <div>
                <p className="font-bold text-slate-800">Quick Process</p>
                <p className="text-sm text-slate-500">Takes less than 2 minutes to apply.</p>
              </div>
            </div>
            <div className="flex gap-4 items-center">
              <div className="h-12 w-12 rounded-2xl bg-blue-50 flex items-center justify-center text-2xl">🎓</div>
              <div>
                <p className="font-bold text-slate-800">Expert Guidance</p>
                <p className="text-sm text-slate-500">Get counseling for your career path.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="glass-card rounded-[40px] p-8 md:p-12 animate-slide-up shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#0077ff] to-[#00d4ff]"></div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                <input 
                  className="w-full rounded-2xl bg-slate-50 border-2 border-transparent p-4 focus:bg-white focus:border-[#0077ff] focus:outline-none transition-all" 
                  placeholder="John Doe"
                  value={form.name}
                  onChange={(e) => setForm({...form, name: e.target.value})}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Father's Name</label>
                <input 
                  className="w-full rounded-2xl bg-slate-50 border-2 border-transparent p-4 focus:bg-white focus:border-[#0077ff] focus:outline-none transition-all" 
                  placeholder="Father name"
                  value={form.fatherName}
                  onChange={(e) => setForm({...form, fatherName: e.target.value})}
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">WhatsApp No</label>
                <input 
                  className="w-full rounded-2xl bg-slate-50 border-2 border-transparent p-4 focus:bg-white focus:border-[#0077ff] focus:outline-none transition-all" 
                  placeholder="0300 0000000"
                  value={form.phone}
                  onChange={(e) => setForm({...form, phone: e.target.value})}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Email</label>
                <input 
                  className="w-full rounded-2xl bg-slate-50 border-2 border-transparent p-4 focus:bg-white focus:border-[#0077ff] focus:outline-none transition-all" 
                  type="email"
                  placeholder="example@mail.com"
                  value={form.email}
                  onChange={(e) => setForm({...form, email: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Desired Course</label>
              <select 
                className="w-full rounded-2xl bg-slate-50 border-2 border-transparent p-4 focus:bg-white focus:border-[#0077ff] focus:outline-none transition-all appearance-none"
                value={form.course}
                onChange={(e) => setForm({...form, course: e.target.value})}
                required
              >
                <option value="">Choose your course...</option>
                <option value="Web Development">Web Development</option>
                <option value="Graphic Designing">Graphic Designing</option>
                <option value="Digital Marketing">Digital Marketing</option>
                <option value="App Development">App Development</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Address</label>
              <input 
                className="w-full rounded-2xl bg-slate-50 border-2 border-transparent p-4 focus:bg-white focus:border-[#0077ff] focus:outline-none transition-all" 
                placeholder="City/Area"
                value={form.address}
                onChange={(e) => setForm({...form, address: e.target.value})}
                required
              />
            </div>

            <button 
              disabled={loading}
              className="btn-premium w-full !py-5 text-xl shadow-xl shadow-blue-100"
            >
              {loading ? 'Processing...' : 'Submit Application'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Registration
