import { useEffect, useState } from 'react'
import api from '../../api/axios'
import toast from 'react-hot-toast'
import { FaEdit, FaTrash, FaPlus, FaPowerOff } from 'react-icons/fa'

const blank = { name: '', email: '', password: '', subject: '', phone: '' }

const Teachers = () => {
  const [teachers, setTeachers] = useState([])
  const [form, setForm] = useState(blank)
  const [editingId, setEditingId] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(false)

  const load = () => api.get('/admin/teachers').then((res) => setTeachers(res.data))
  useEffect(() => { load() }, [])

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      if (editingId) {
        await api.put(`/admin/teachers/${editingId}`, form)
        toast.success('Teacher updated successfully')
      } else {
        await api.post('/admin/teachers', form)
        toast.success('Teacher added successfully')
      }
      setForm(blank)
      setEditingId('')
      setShowModal(false)
      load()
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to save teacher')
    } finally {
      setLoading(false)
    }
  }

  const del = async (id) => { 
    if (window.confirm('Delete this teacher?')) { 
      try {
        await api.delete(`/admin/teachers/${id}`)
        toast.success('Teacher deleted')
        load() 
      } catch {
        toast.error('Failed to delete')
      }
    } 
  }
  
  const toggle = async (id) => { 
    try {
      await api.patch(`/admin/teachers/${id}/toggle`)
      toast.success('Status updated')
      load() 
    } catch {
      toast.error('Failed to update status')
    }
  }

  return (
    <div className="space-y-8 animate-slide-up">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Teacher <span className="text-purple-600">Management</span></h1>
          <p className="text-slate-500 font-medium">Manage teacher accounts, access, and statuses.</p>
        </div>
        <button 
          onClick={() => { setForm(blank); setEditingId(''); setShowModal(true) }} 
          className="px-6 py-3 rounded-xl bg-purple-600 text-white font-bold text-sm hover:bg-purple-700 transition-colors shadow-lg shadow-purple-200 flex items-center gap-2"
        >
          <FaPlus /> Add Teacher
        </button>
      </div>

      <div className="glass-card rounded-[40px] overflow-hidden border-white/60 shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-900 text-white font-bold uppercase tracking-widest text-[10px]">
              <tr>
                <th className="px-8 py-5">Teacher</th>
                <th className="px-8 py-5">Contact</th>
                <th className="px-8 py-5">Subject</th>
                <th className="px-8 py-5 text-center">Status</th>
                <th className="px-8 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {teachers.map((t) => (
                <tr key={t._id} className="hover:bg-purple-50/30 transition-all group">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center font-black group-hover:bg-purple-600 group-hover:text-white transition-colors">
                        {t.name.charAt(0)}
                      </div>
                      <p className="font-black text-slate-900 text-lg leading-none">{t.name}</p>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <p className="font-bold text-slate-700">{t.email}</p>
                    <p className="text-xs text-slate-500">{t.phone || 'No phone'}</p>
                  </td>
                  <td className="px-8 py-6">
                    <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg font-bold text-xs">
                      {t.subject || 'General'}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-center">
                    <span className={`inline-block px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                      t.isActive ? 'bg-green-50 text-green-600 border-green-100' : 'bg-red-50 text-red-600 border-red-100'
                    }`}>
                      {t.isActive ? 'Active' : 'Suspended'}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right space-x-2">
                    <button onClick={() => toggle(t._id)} title={t.isActive ? "Suspend" : "Activate"} className={`h-10 w-10 rounded-xl inline-flex items-center justify-center transition-all ${t.isActive ? 'bg-slate-100 text-slate-600 hover:bg-orange-500 hover:text-white' : 'bg-green-50 text-green-600 hover:bg-green-600 hover:text-white'}`}>
                      <FaPowerOff />
                    </button>
                    <button onClick={() => { setEditingId(t._id); setForm({ ...blank, ...t, password: '' }); setShowModal(true) }} className="h-10 w-10 rounded-xl inline-flex items-center justify-center bg-slate-100 text-slate-600 hover:bg-purple-600 hover:text-white transition-all">
                      <FaEdit />
                    </button>
                    <button onClick={() => del(t._id)} className="h-10 w-10 rounded-xl inline-flex items-center justify-center bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-all">
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {teachers.length === 0 && (
            <div className="p-20 text-center space-y-4">
              <div className="text-6xl">👨‍🏫</div>
              <p className="text-slate-400 font-medium italic">No teachers found in the system.</p>
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-lg rounded-[32px] bg-white p-8 shadow-2xl border border-white/50 animate-slide-up">
            <h3 className="mb-6 text-2xl font-black text-slate-900 tracking-tight">
              {editingId ? 'Edit Teacher' : 'Add New Teacher'}
            </h3>
            <form onSubmit={submit} className="space-y-4">
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-1 block">Full Name</label>
                <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full rounded-2xl bg-slate-50 border-2 border-transparent px-4 py-3 outline-none focus:bg-white focus:border-purple-600 transition-all font-semibold" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-1 block">Email</label>
                  <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full rounded-2xl bg-slate-50 border-2 border-transparent px-4 py-3 outline-none focus:bg-white focus:border-purple-600 transition-all font-semibold" />
                </div>
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-1 block">Password</label>
                  <input required={!editingId} type="password" placeholder={editingId ? '(leave blank to keep)' : ''} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="w-full rounded-2xl bg-slate-50 border-2 border-transparent px-4 py-3 outline-none focus:bg-white focus:border-purple-600 transition-all font-semibold" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-1 block">Subject</label>
                  <input required value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className="w-full rounded-2xl bg-slate-50 border-2 border-transparent px-4 py-3 outline-none focus:bg-white focus:border-purple-600 transition-all font-semibold" />
                </div>
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-1 block">Phone</label>
                  <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full rounded-2xl bg-slate-50 border-2 border-transparent px-4 py-3 outline-none focus:bg-white focus:border-purple-600 transition-all font-semibold" />
                </div>
              </div>
              <div className="pt-4 flex justify-end gap-3 border-t border-slate-100">
                <button type="button" onClick={() => setShowModal(false)} className="px-6 py-3 rounded-xl font-bold text-slate-500 hover:bg-slate-50 transition-colors">Cancel</button>
                <button disabled={loading} className="px-8 py-3 rounded-xl bg-purple-600 text-white font-black hover:bg-purple-700 transition-colors shadow-lg shadow-purple-200">
                  {editingId ? 'Update Teacher' : 'Save Teacher'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Teachers
