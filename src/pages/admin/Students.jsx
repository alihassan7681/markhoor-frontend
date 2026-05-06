import { useEffect, useState } from 'react'
import api from '../../api/axios'
import toast from 'react-hot-toast'

const blank = { name: '', fatherName: '', srNo: '', course: '', email: '', phone: '', address: '', qualification: '', status: 'pending' }

const Students = () => {
  const [students, setStudents] = useState([])
  const [form, setForm] = useState(blank)
  const [editingId, setEditingId] = useState('')
  const [loading, setLoading] = useState(false)
  const [tab, setTab] = useState('list')

  const load = () => api.get('/admin/students').then((res) => setStudents(res.data))
  useEffect(() => { load() }, [])

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      if (editingId) {
        await api.put(`/admin/students/${editingId}`, form)
        toast.success('Student updated!')
      } else {
        await api.post('/admin/students', form)
        toast.success('Student added!')
      }
      setForm(blank); setEditingId(''); setTab('list'); load()
    } catch (err) {
      toast.error(err.response?.data?.error || 'Operation failed')
    } finally {
      setLoading(false)
    }
  }

  const del = async (id) => { 
    if (window.confirm('Delete student record?')) { 
      try {
        await api.delete(`/admin/students/${id}`); 
        load();
        toast.success('Record deleted')
      } catch (err) {
        toast.error('Failed to delete')
      }
    } 
  }

  return (
    <div className="space-y-8 animate-slide-up">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Student <span className="text-[#0077ff]">Management</span></h1>
          <p className="text-slate-500 font-medium">Add, edit, or manage institute student records.</p>
        </div>
        
        <div className="glass-card p-1.5 rounded-2xl flex bg-white/50">
          <button onClick={() => setTab('list')} className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${tab === 'list' ? 'bg-[#0077ff] text-white shadow-lg shadow-blue-100' : 'text-slate-500 hover:text-slate-900'}`}>View All</button>
          <button onClick={() => { setTab('add'); setEditingId(''); setForm(blank) }} className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${tab === 'add' ? 'bg-[#0077ff] text-white shadow-lg shadow-blue-100' : 'text-slate-500 hover:text-slate-900'}`}>+ Add New</button>
        </div>
      </div>

      {tab === 'add' ? (
        <div className="glass-card rounded-[40px] p-8 md:p-12 border-white/60 animate-slide-up">
          <h2 className="text-2xl font-black text-slate-900 mb-8">{editingId ? 'Edit Student Details' : 'New Student Registration'}</h2>
          <form onSubmit={submit} className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
              <input className="w-full rounded-2xl bg-slate-50 border-2 border-transparent p-4 focus:bg-white focus:border-[#0077ff] focus:outline-none transition-all" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Father's Name</label>
              <input className="w-full rounded-2xl bg-slate-50 border-2 border-transparent p-4 focus:bg-white focus:border-[#0077ff] focus:outline-none transition-all" value={form.fatherName} onChange={(e) => setForm({ ...form, fatherName: e.target.value })} required />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Serial No (ID)</label>
              <input className="w-full rounded-2xl bg-slate-50 border-2 border-transparent p-4 focus:bg-white focus:border-[#0077ff] focus:outline-none transition-all" value={form.srNo} onChange={(e) => setForm({ ...form, srNo: e.target.value })} required />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Course Name</label>
              <input className="w-full rounded-2xl bg-slate-50 border-2 border-transparent p-4 focus:bg-white focus:border-[#0077ff] focus:outline-none transition-all" value={form.course} onChange={(e) => setForm({ ...form, course: e.target.value })} required />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Contact No</label>
              <input className="w-full rounded-2xl bg-slate-50 border-2 border-transparent p-4 focus:bg-white focus:border-[#0077ff] focus:outline-none transition-all" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Status</label>
              <select className="w-full rounded-2xl bg-slate-50 border-2 border-transparent p-4 focus:bg-white focus:border-[#0077ff] focus:outline-none transition-all appearance-none" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
                <option value="pending">Pending</option>
                <option value="verified">Verified</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            <div className="md:col-span-2 lg:col-span-3 pt-6 flex gap-4">
              <button disabled={loading} className="btn-premium px-12 py-4 text-lg shadow-xl shadow-blue-100">{loading ? 'Saving...' : editingId ? 'Update Record' : 'Save Student'}</button>
              <button type="button" onClick={() => setTab('list')} className="px-10 py-4 rounded-2xl font-bold border-2 border-slate-200 hover:bg-slate-50 transition-all text-lg text-slate-600">Cancel</button>
            </div>
          </form>
        </div>
      ) : (
        <div className="glass-card rounded-[40px] overflow-hidden border-white/60 shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-900 text-white font-bold uppercase tracking-widest text-[10px]">
                <tr>
                  <th className="px-8 py-5">Student / Info</th>
                  <th className="px-8 py-5">Course</th>
                  <th className="px-8 py-5">Contact</th>
                  <th className="px-8 py-5 text-center">Status</th>
                  <th className="px-8 py-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {students.map((s) => (
                  <tr key={s._id} className="hover:bg-blue-50/30 transition-all group">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-2xl bg-slate-100 flex items-center justify-center font-black text-slate-400 group-hover:bg-[#0077ff] group-hover:text-white transition-all">
                          {s.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-black text-slate-900 text-lg leading-none">{s.name}</p>
                          <p className="text-xs text-slate-400 font-bold mt-1 uppercase tracking-tighter">Sr: {s.srNo}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <p className="font-bold text-slate-700">{s.course}</p>
                      <p className="text-xs text-slate-400">{new Date(s.registeredAt).toLocaleDateString()}</p>
                    </td>
                    <td className="px-8 py-6">
                      <p className="font-medium text-slate-600">{s.phone || 'No phone'}</p>
                      <p className="text-xs text-slate-400">{s.email || 'No email'}</p>
                    </td>
                    <td className="px-8 py-6 text-center">
                      <span className={`inline-block px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                        s.status === 'completed' ? 'bg-green-50 text-green-600 border-green-100' : 
                        s.status === 'verified' ? 'bg-blue-50 text-[#0077ff] border-blue-100' : 'bg-orange-50 text-orange-600 border-orange-100'
                      }`}>
                        {s.status}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right space-x-2">
                      <button onClick={() => { setEditingId(s._id); setForm({ ...blank, ...s }); setTab('add') }} className="h-10 w-10 rounded-xl bg-slate-100 text-slate-600 hover:bg-[#0077ff] hover:text-white transition-all">✏️</button>
                      <button onClick={() => del(s._id)} className="h-10 w-10 rounded-xl bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-all">🗑️</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {students.length === 0 && (
            <div className="p-20 text-center space-y-4">
              <div className="text-6xl">🔍</div>
              <p className="text-slate-400 font-medium italic">No students found in the database.</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Students
