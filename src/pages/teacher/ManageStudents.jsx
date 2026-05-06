import { useEffect, useState } from 'react'
import api from '../../api/axios'
import toast from 'react-hot-toast'

const blank = { 
  name: '', 
  fatherName: '', 
  srNo: '', 
  course: '', 
  email: '', 
  password: '' 
}

const ManageStudents = () => {
  const [students, setStudents] = useState([])
  const [form, setForm] = useState(blank)
  const [editingId, setEditingId] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const loadStudents = async () => {
    try {
      const res = await api.get('/teacher/students')
      setStudents(res.data)
    } catch (err) {
      console.error('Error loading students:', err)
    }
  }

  useEffect(() => {
    loadStudents()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      if (editingId) {
        await api.put(`/teacher/students/${editingId}`, form)
        toast.success('Student updated successfully!')
      } else {
        await api.post('/teacher/students', form)
        toast.success('Student added successfully!')
      }
      setForm(blank)
      setEditingId(null)
      loadStudents()
    } catch (err) {
      const msg = err.response?.data?.error || 'Failed to save student'
      setError(msg)
      toast.error(msg)
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (student) => {
    setEditingId(student._id)
    setForm({
      name: student.name,
      fatherName: student.fatherName || '',
      srNo: student.srNo,
      course: student.course,
      email: student.email,
      password: '' // Keep empty unless teacher wants to change it
    })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const cancelEdit = () => {
    setEditingId(null)
    setForm(blank)
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this student account?')) {
      try {
        await api.delete(`/teacher/students/${id}`)
        loadStudents()
        toast.success('Student deleted successfully')
      } catch (err) {
        toast.error('Failed to delete student')
      }
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#1e3a5f]">Manage Students (Portal Access)</h1>
      </div>

      <div className="rounded-xl bg-white p-6 shadow-sm border border-slate-100">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-slate-700">
            {editingId ? 'Edit Student Details' : 'Add New Student for Portal'}
          </h2>
          {editingId && (
            <button 
              onClick={cancelEdit}
              className="text-sm font-medium text-slate-500 hover:text-slate-700"
            >
              Cancel Edit
            </button>
          )}
        </div>
        <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-3">
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-600">Full Name</label>
            <input 
              className="w-full rounded-lg border border-slate-200 p-2.5 focus:ring-2 focus:ring-[#7c3aed] focus:outline-none" 
              placeholder="Student Name" 
              value={form.name} 
              onChange={(e) => setForm({ ...form, name: e.target.value })} 
              required
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-600">Father Name</label>
            <input 
              className="w-full rounded-lg border border-slate-200 p-2.5 focus:ring-2 focus:ring-[#7c3aed] focus:outline-none" 
              placeholder="Father Name" 
              value={form.fatherName} 
              onChange={(e) => setForm({ ...form, fatherName: e.target.value })} 
              required
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-600">Serial Number (Unique)</label>
            <input 
              className="w-full rounded-lg border border-slate-200 p-2.5 focus:ring-2 focus:ring-[#7c3aed] focus:outline-none" 
              placeholder="e.g. 1001" 
              value={form.srNo} 
              onChange={(e) => setForm({ ...form, srNo: e.target.value })} 
              required
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-600">Course</label>
            <input 
              className="w-full rounded-lg border border-slate-200 p-2.5 focus:ring-2 focus:ring-[#7c3aed] focus:outline-none" 
              placeholder="e.g. Web Development" 
              value={form.course} 
              onChange={(e) => setForm({ ...form, course: e.target.value })} 
              required
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-600">Email (for Login)</label>
            <input 
              className="w-full rounded-lg border border-slate-200 p-2.5 focus:ring-2 focus:ring-[#7c3aed] focus:outline-none" 
              type="email"
              placeholder="email@example.com" 
              value={form.email} 
              onChange={(e) => setForm({ ...form, email: e.target.value })} 
              required
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-600">
              {editingId ? 'New Password (Optional)' : 'Password'}
            </label>
            <input 
              className="w-full rounded-lg border border-slate-200 p-2.5 focus:ring-2 focus:ring-[#7c3aed] focus:outline-none" 
              type="password"
              placeholder={editingId ? 'Leave blank to keep current' : 'Create Password'} 
              value={form.password} 
              onChange={(e) => setForm({ ...form, password: e.target.value })} 
              required={!editingId}
            />
          </div>
          
          <div className="md:col-span-3 pt-2">
            {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
            <button 
              disabled={loading}
              className="w-full md:w-auto px-8 py-3 rounded-lg bg-[#7c3aed] text-white font-semibold hover:bg-[#6d28d9] transition-colors disabled:opacity-50"
            >
              {loading ? 'Saving...' : editingId ? 'Update Student Details' : 'Create Student Account'}
            </button>
          </div>
        </form>
      </div>

      <div className="rounded-xl bg-white shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <h2 className="text-lg font-semibold text-slate-700">Student List</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-600 font-medium">
              <tr className="text-left border-b border-slate-100">
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Serial No</th>
                <th className="px-6 py-4">Course</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {students.map((s) => (
                <tr key={s._id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-800">{s.name}</td>
                  <td className="px-6 py-4 text-slate-600">{s.srNo}</td>
                  <td className="px-6 py-4 text-slate-600">{s.course}</td>
                  <td className="px-6 py-4 text-slate-600">{s.email}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                      s.status === 'verified' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {s.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-3">
                    <button 
                      onClick={() => handleEdit(s)}
                      className="text-blue-500 hover:text-blue-700 font-medium"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(s._id)}
                      className="text-red-500 hover:text-red-700 font-medium"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {students.length === 0 && (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-slate-400">
                    No students added yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default ManageStudents
