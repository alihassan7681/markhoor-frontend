import { useEffect, useState } from 'react'
import api from '../../api/axios'
import toast from 'react-hot-toast'
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa'

const blank = { name: '', description: '', duration: '', fee: 0, isActive: true, image: '', imageFile: null }

const getCourseImage = (courseName) => {
  if (!courseName) return null;
  const name = courseName.toLowerCase();
  if (name.includes('web')) return '/webdevelopment.png';
  if (name.includes('graphic') || name.includes('design')) return '/GraphicDesigning.png';
  if (name.includes('digital') || name.includes('marketing')) return '/DigitalMarketing.png';
  if (name.includes('app') || name.includes('mobile')) return '/MobileAppDevelopmen.png';
  if (name.includes('freelance')) return '/freelancing.png';
  if (name.includes('office') || name.includes('management')) return '/officemagment.png';
  return null;
}

const resolveImageUrl = (url) => {
  if (!url) return null;
  if (url.startsWith('/uploads/')) return `http://localhost:5000${url}`;
  return url;
}

const AdminCourses = () => {
  const [courses, setCourses] = useState([])
  const [form, setForm] = useState(blank)
  const [editingId, setEditingId] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(true)

  const load = () => {
    setLoading(true)
    api.get('/courses/all')
       .then((res) => setCourses(res.data))
       .finally(() => setLoading(false))
  }
  useEffect(() => { load() }, [])

  const submit = async (e) => {
    e.preventDefault()
    try {
      const payload = form.imageFile ? new FormData() : { ...form };
      if (form.imageFile) {
        payload.append('name', form.name);
        payload.append('description', form.description);
        payload.append('duration', form.duration);
        payload.append('fee', form.fee);
        payload.append('isActive', form.isActive);
        payload.append('coverImage', form.imageFile);
      } else {
        delete payload.imageFile;
      }

      const headers = form.imageFile ? { 'Content-Type': 'multipart/form-data' } : {};

      if (editingId) {
        await api.put(`/courses/${editingId}`, payload, { headers })
        toast.success('Course updated successfully')
      } else {
        await api.post('/courses', payload, { headers })
        toast.success('Course added successfully')
      }
      setForm(blank); setEditingId(''); setShowModal(false); load()
    } catch (err) {
      toast.error('Failed to save course')
    }
  }

  const del = async (id) => { 
    if (window.confirm('Are you sure you want to delete this course?')) { 
      try {
        await api.delete(`/courses/${id}`); 
        toast.success('Course deleted')
        load() 
      } catch {
        toast.error('Failed to delete course')
      }
    } 
  }

  return (
    <div className="space-y-8 animate-slide-up pb-10 px-2 sm:px-4">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Manage <span className="text-blue-600">Courses</span></h1>
          <p className="text-slate-500 font-medium text-sm sm:text-base">Add or edit courses shown on the website.</p>
        </div>
        <button 
          onClick={() => { setForm(blank); setEditingId(''); setShowModal(true) }} 
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-blue-600 text-white font-bold text-sm hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200 flex items-center justify-center gap-2"
        >
          <FaPlus /> Add New Course
        </button>
      </div>

      {/* Table section */}
      <div className="glass-card rounded-[32px] sm:rounded-[40px] overflow-hidden border-white/60 shadow-2xl">
        {loading ? (
          <div className="p-10 sm:p-20 text-center font-bold text-slate-400">Loading courses...</div>
        ) : courses.length === 0 ? (
          <div className="p-10 sm:p-20 text-center space-y-4">
            <div className="text-5xl sm:text-6xl">📚</div>
            <p className="text-slate-400 font-medium italic text-sm sm:text-base">No courses found in the system.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-900 text-white font-bold uppercase tracking-widest text-[10px]">
                <tr>
                  <th className="px-6 py-4 sm:px-8 sm:py-5">Course Image & Name</th>
                  <th className="px-6 py-4 sm:px-8 sm:py-5 hidden md:table-cell">Duration</th>
                  <th className="px-6 py-4 sm:px-8 sm:py-5">Fee (PKR)</th>
                  <th className="px-6 py-4 sm:px-8 sm:py-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {courses.map((c) => (
                  <tr key={c._id} className="hover:bg-blue-50/30 transition-all group">
                    <td className="px-6 py-4 sm:px-8 sm:py-6">
                      <div className="flex items-center gap-3 sm:gap-4">
                        <div className="h-10 w-10 sm:h-12 sm:w-12 shrink-0 rounded-xl bg-slate-100 overflow-hidden border border-slate-200">
                          {c.image || getCourseImage(c.name) ? (
                            <img src={resolveImageUrl(c.image || getCourseImage(c.name))} alt={c.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-[10px] text-slate-400 text-center leading-tight">No Img</div>
                          )}
                        </div>
                        <div>
                          <p className="font-black text-slate-900 text-base sm:text-lg leading-tight group-hover:text-blue-600 transition-colors">{c.name}</p>
                          <p className="text-xs text-slate-500 mt-1 md:hidden">{c.duration}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 sm:px-8 sm:py-6 hidden md:table-cell">
                      <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg font-bold text-xs whitespace-nowrap">
                        {c.duration || '-'}
                      </span>
                    </td>
                    <td className="px-6 py-4 sm:px-8 sm:py-6 font-bold text-slate-700 whitespace-nowrap">
                      Rs. {c.fee || 0}
                    </td>
                    <td className="px-6 py-4 sm:px-8 sm:py-6 text-right space-x-2 whitespace-nowrap">
                      <button onClick={() => { setEditingId(c._id); setForm(c); setShowModal(true) }} className="h-8 w-8 sm:h-10 sm:w-10 rounded-xl inline-flex items-center justify-center bg-slate-100 text-slate-600 hover:bg-blue-600 hover:text-white transition-all">
                        <FaEdit />
                      </button>
                      <button onClick={() => del(c._id)} className="h-8 w-8 sm:h-10 sm:w-10 rounded-xl inline-flex items-center justify-center bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-all">
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm animate-fade-in overflow-y-auto">
          <div className="w-full max-w-xl rounded-[32px] bg-white p-6 sm:p-8 shadow-2xl border border-white/50 animate-slide-up my-8">
            <h3 className="mb-6 text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              {editingId ? 'Edit Course Details' : 'Add New Course'}
            </h3>
            <form onSubmit={submit} className="space-y-4">
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-1 block">Course Name</label>
                <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full rounded-2xl bg-slate-50 border-2 border-transparent px-4 py-3 text-sm sm:text-base outline-none focus:bg-white focus:border-blue-600 transition-all font-semibold" />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-1 block">Duration</label>
                  <input required placeholder="e.g. 3 Months" value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} className="w-full rounded-2xl bg-slate-50 border-2 border-transparent px-4 py-3 text-sm sm:text-base outline-none focus:bg-white focus:border-blue-600 transition-all font-semibold" />
                </div>
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-1 block">Fee (PKR)</label>
                  <input required type="number" value={form.fee} onChange={(e) => setForm({ ...form, fee: Number(e.target.value) })} className="w-full rounded-2xl bg-slate-50 border-2 border-transparent px-4 py-3 text-sm sm:text-base outline-none focus:bg-white focus:border-blue-600 transition-all font-semibold" />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-1 block">Course Image</label>
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center p-4 bg-slate-50 rounded-2xl border-2 border-transparent focus-within:border-blue-600 transition-all">
                  {/* File Upload Option */}
                  <div className="flex-1 w-full">
                    <label className="block text-xs font-bold text-slate-600 mb-2">Upload from Laptop</label>
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={(e) => setForm({ ...form, imageFile: e.target.files[0], image: '' })} 
                      className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-all cursor-pointer"
                    />
                  </div>
                  
                  <div className="hidden sm:block w-px h-12 bg-slate-200"></div>
                  <div className="sm:hidden w-full h-px bg-slate-200 my-2"></div>
                  
                  {/* URL Text Option */}
                  <div className="flex-1 w-full">
                    <label className="block text-xs font-bold text-slate-600 mb-2">Or paste URL directly</label>
                    <input 
                      placeholder="/webdevelopment.png" 
                      value={form.image || ''} 
                      onChange={(e) => setForm({ ...form, image: e.target.value, imageFile: null })} 
                      className="w-full rounded-xl bg-white border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-600 transition-all font-medium placeholder-slate-300" 
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-1 block">Description</label>
                <textarea rows="4" required value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full rounded-2xl bg-slate-50 border-2 border-transparent px-4 py-3 text-sm sm:text-base outline-none focus:bg-white focus:border-blue-600 transition-all font-semibold resize-none" />
              </div>

              <div className="pt-6 flex gap-3 justify-end border-t border-slate-100">
                <button type="button" onClick={() => setShowModal(false)} className="px-6 py-3 rounded-xl font-bold text-slate-500 hover:bg-slate-50 transition-colors text-sm sm:text-base">Cancel</button>
                <button type="submit" className="px-8 py-3 rounded-xl bg-blue-600 text-white font-black hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200 text-sm sm:text-base">
                  {editingId ? 'Update Course' : 'Save Course'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminCourses
