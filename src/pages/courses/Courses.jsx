import { useEffect, useMemo, useState } from 'react'
import api from '../../api/axios'
import toast from 'react-hot-toast'
import { FaEdit, FaTrash, FaPlus, FaSearch } from 'react-icons/fa'

const initialForm = { name: '', duration: '', price: '', studentsEnrolled: 0, imageUrl: '' }

const Courses = () => {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(initialForm)

  const fetchData = async () => {
    setLoading(true)
    try {
      const res = await api.get('/courses')
      setItems(res.data || [])
    } catch {
      toast.error('Unable to fetch courses.')
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => { fetchData() }, [])

  const filtered = useMemo(() => items.filter((c) => String(c.name || c.courseName || '').toLowerCase().includes(search.toLowerCase())), [items, search])
  
  const openCreate = () => { setEditing(null); setForm(initialForm); setShowModal(true) }
  const openEdit = (item) => { 
    setEditing(item); 
    setForm({ 
      name: item.name || item.courseName || '', 
      duration: item.duration || '', 
      price: item.price || '', 
      studentsEnrolled: item.studentsEnrolled || 0,
      imageUrl: item.imageUrl || ''
    }); 
    setShowModal(true) 
  }

  const save = async (e) => {
    e.preventDefault()
    const payload = { ...form, price: Number(form.price), studentsEnrolled: Number(form.studentsEnrolled) }
    try {
      if (editing) await api.put(`/courses/${editing._id || editing.id}`, payload)
      else await api.post('/courses', payload)
      toast.success(editing ? 'Course updated successfully.' : 'Course added successfully.')
      setShowModal(false); fetchData()
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save course.')
    }
  }

  const remove = async (item) => {
    if (!window.confirm(`Delete course ${item.name || item.courseName}?`)) return
    try { 
      await api.delete(`/courses/${item._id || item.id}`); 
      toast.success('Course deleted successfully.'); 
      fetchData() 
    } catch { 
      toast.error('Failed to delete course.') 
    }
  }

  return (
    <div className="space-y-8 animate-slide-up">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Course <span className="text-[#0077ff]">Management</span></h1>
          <p className="text-slate-500 font-medium">Add, edit, or remove courses from the platform.</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              value={search} 
              onChange={(e) => setSearch(e.target.value)} 
              placeholder="Search courses..." 
              className="w-full md:w-64 rounded-xl bg-white border border-slate-200 pl-10 pr-4 py-3 text-sm font-medium outline-none focus:border-[#0077ff] focus:ring-4 focus:ring-blue-500/10 transition-all shadow-sm" 
            />
          </div>
          <button onClick={openCreate} className="px-6 py-3 rounded-xl bg-[#0077ff] text-white font-bold text-sm hover:bg-blue-600 transition-colors shadow-lg shadow-blue-200 flex items-center gap-2">
            <FaPlus /> Add Course
          </button>
        </div>
      </div>

      <div className="glass-card rounded-[40px] overflow-hidden border-white/60 shadow-2xl">
        {loading ? (
          <div className="p-20 text-center font-bold text-slate-400">Loading courses...</div>
        ) : filtered.length === 0 ? (
          <div className="p-20 text-center space-y-4">
            <div className="text-6xl">📚</div>
            <p className="text-slate-400 font-medium italic">No courses found matching your search.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-900 text-white font-bold uppercase tracking-widest text-[10px]">
                <tr>
                  <th className="px-8 py-5">Image</th>
                  <th className="px-8 py-5">Course Name</th>
                  <th className="px-8 py-5">Duration</th>
                  <th className="px-8 py-5">Price (PKR)</th>
                  <th className="px-8 py-5">Students</th>
                  <th className="px-8 py-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((c) => (
                  <tr key={c._id || c.id} className="hover:bg-blue-50/30 transition-all group">
                    <td className="px-8 py-4">
                      <div className="h-12 w-12 rounded-xl bg-slate-100 overflow-hidden border border-slate-200">
                        {c.imageUrl ? (
                          <img src={c.imageUrl} alt={c.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-xs text-slate-400">None</div>
                        )}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <p className="font-black text-slate-900 text-lg leading-none group-hover:text-[#0077ff] transition-colors">{c.name || c.courseName}</p>
                    </td>
                    <td className="px-8 py-6">
                      <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg font-bold text-xs">
                        {c.duration || '-'}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <p className="font-bold text-slate-700">{c.price ? `Rs. ${c.price}` : '-'}</p>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-green-500"></span>
                        <span className="font-bold text-slate-600">{c.studentsEnrolled ?? 0}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right space-x-2">
                      <button onClick={() => openEdit(c)} className="h-10 w-10 rounded-xl inline-flex items-center justify-center bg-slate-100 text-slate-600 hover:bg-[#0077ff] hover:text-white transition-all">
                        <FaEdit />
                      </button>
                      <button onClick={() => remove(c)} className="h-10 w-10 rounded-xl inline-flex items-center justify-center bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-all">
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

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-lg rounded-[32px] bg-white p-8 shadow-2xl border border-white/50 animate-slide-up">
            <h3 className="mb-6 text-2xl font-black text-slate-900 tracking-tight">
              {editing ? 'Edit Course' : 'Create New Course'}
            </h3>
            <form className="space-y-4" onSubmit={save}>
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-1 block">Course Name</label>
                <input required value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} className="w-full rounded-2xl bg-slate-50 border-2 border-transparent px-4 py-3 outline-none focus:bg-white focus:border-[#0077ff] transition-all font-semibold text-slate-800" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-1 block">Duration</label>
                  <input required value={form.duration} onChange={(e) => setForm((p) => ({ ...p, duration: e.target.value }))} className="w-full rounded-2xl bg-slate-50 border-2 border-transparent px-4 py-3 outline-none focus:bg-white focus:border-[#0077ff] transition-all font-semibold text-slate-800" />
                </div>
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-1 block">Fee / Price</label>
                  <input required type="number" value={form.price} onChange={(e) => setForm((p) => ({ ...p, price: e.target.value }))} className="w-full rounded-2xl bg-slate-50 border-2 border-transparent px-4 py-3 outline-none focus:bg-white focus:border-[#0077ff] transition-all font-semibold text-slate-800" />
                </div>
              </div>
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-1 block">Students Enrolled</label>
                <input type="number" value={form.studentsEnrolled} onChange={(e) => setForm((p) => ({ ...p, studentsEnrolled: e.target.value }))} className="w-full rounded-2xl bg-slate-50 border-2 border-transparent px-4 py-3 outline-none focus:bg-white focus:border-[#0077ff] transition-all font-semibold text-slate-800" />
              </div>
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-1 block">Image URL (Optional)</label>
                <input placeholder="/webdevelopment.png" value={form.imageUrl} onChange={(e) => setForm((p) => ({ ...p, imageUrl: e.target.value }))} className="w-full rounded-2xl bg-slate-50 border-2 border-transparent px-4 py-3 outline-none focus:bg-white focus:border-[#0077ff] transition-all font-semibold text-slate-800 text-sm" />
                <p className="text-xs text-slate-400 mt-1 ml-1">E.g., /webdevelopment.png, /GraphicDesigning.png</p>
              </div>

              <div className="pt-6 flex gap-3 justify-end border-t border-slate-100">
                <button type="button" onClick={() => setShowModal(false)} className="px-6 py-3 rounded-xl font-bold text-slate-500 hover:bg-slate-50 transition-colors">Cancel</button>
                <button type="submit" className="px-8 py-3 rounded-xl bg-[#0077ff] text-white font-black hover:bg-blue-600 transition-colors shadow-lg shadow-blue-200">
                  {editing ? 'Update Course' : 'Save Course'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Courses
