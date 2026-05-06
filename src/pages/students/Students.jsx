import { useEffect, useMemo, useState } from 'react'
import api from '../../api/axios'
import Loader from '../../components/Loader'

const initialForm = { name: '', email: '', phone: '', course: '', status: 'Active' }

const Students = ({ notify }) => {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(initialForm)

  const fetchData = async () => {
    setLoading(true)
    try {
      const res = await api.get('/students')
      setItems(res.data || [])
    } catch {
      notify('Unable to fetch students.', 'error')
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchData()
  }, [])

  const filtered = useMemo(() => items.filter((s) => String(s.name || '').toLowerCase().includes(search.toLowerCase())), [items, search])
  const pageCount = Math.max(1, Math.ceil(filtered.length / 10))
  const rows = filtered.slice((page - 1) * 10, page * 10)
  useEffect(() => setPage(1), [search])

  const openCreate = () => {
    setEditing(null)
    setForm(initialForm)
    setShowModal(true)
  }
  const openEdit = (item) => {
    setEditing(item)
    setForm({
      name: item.name || '',
      email: item.email || '',
      phone: item.phone || '',
      course: item.course || item.courseName || '',
      status: item.status || 'Active',
    })
    setShowModal(true)
  }

  const save = async (e) => {
    e.preventDefault()
    try {
      if (editing) await api.put(`/students/${editing._id || editing.id}`, form)
      else await api.post('/students', form)
      notify(editing ? 'Student updated successfully.' : 'Student added successfully.')
      setShowModal(false)
      fetchData()
    } catch (error) {
      notify(error.response?.data?.message || 'Failed to save student.', 'error')
    }
  }

  const remove = async (item) => {
    if (!window.confirm(`Delete student ${item.name}?`)) return
    try {
      await api.delete(`/students/${item._id || item.id}`)
      notify('Student deleted successfully.')
      fetchData()
    } catch {
      notify('Failed to delete student.', 'error')
    }
  }

  if (loading) return <Loader />

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 rounded-2xl bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search students by name..." className="w-full rounded-lg border border-slate-200 px-4 py-2 outline-none focus:border-[#1e3a5f] sm:max-w-xs" />
        <button onClick={openCreate} className="rounded-lg bg-[#1e3a5f] px-4 py-2 text-sm font-semibold text-white">Add Student</button>
      </div>

      <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
        {filtered.length === 0 ? <div className="p-10 text-center text-slate-500">No students found.</div> : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-[#1e3a5f] text-left text-white"><tr><th className="px-4 py-3">Name</th><th className="px-4 py-3">Email</th><th className="px-4 py-3">Phone</th><th className="px-4 py-3">Course</th><th className="px-4 py-3">Status</th><th className="px-4 py-3">Actions</th></tr></thead>
              <tbody>
                {rows.map((s) => (
                  <tr key={s._id || s.id} className="border-t border-slate-100">
                    <td className="px-4 py-3">{s.name}</td><td className="px-4 py-3">{s.email}</td><td className="px-4 py-3">{s.phone}</td><td className="px-4 py-3">{s.course || s.courseName || '-'}</td><td className="px-4 py-3">{s.status || '-'}</td>
                    <td className="px-4 py-3"><div className="flex gap-2"><button onClick={() => openEdit(s)} className="rounded bg-amber-100 px-3 py-1">Edit</button><button onClick={() => remove(s)} className="rounded bg-red-100 px-3 py-1 text-red-700">Delete</button></div></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {pageCount > 1 && <div className="flex items-center justify-end gap-2"><button onClick={() => setPage((p) => p - 1)} disabled={page === 1} className="rounded border border-slate-300 px-3 py-1 disabled:opacity-50">Prev</button><span className="text-sm text-slate-600">{page} / {pageCount}</span><button onClick={() => setPage((p) => p + 1)} disabled={page === pageCount} className="rounded border border-slate-300 px-3 py-1 disabled:opacity-50">Next</button></div>}

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
            <h3 className="mb-4 text-xl font-semibold text-[#1e3a5f]">{editing ? 'Edit Student' : 'Add Student'}</h3>
            <form className="grid gap-3" onSubmit={save}>
              {['name', 'email', 'phone', 'course'].map((key) => <input key={key} required type={key === 'email' ? 'email' : 'text'} placeholder={key[0].toUpperCase() + key.slice(1)} value={form[key]} onChange={(e) => setForm((p) => ({ ...p, [key]: e.target.value }))} className="rounded-lg border border-slate-200 px-4 py-2 outline-none focus:border-[#1e3a5f]" />)}
              <select value={form.status} onChange={(e) => setForm((p) => ({ ...p, status: e.target.value }))} className="rounded-lg border border-slate-200 px-4 py-2 outline-none focus:border-[#1e3a5f]"><option>Active</option><option>Inactive</option></select>
              <div className="mt-2 flex justify-end gap-2"><button type="button" onClick={() => setShowModal(false)} className="rounded-lg border border-slate-300 px-4 py-2">Cancel</button><button className="rounded-lg bg-[#1e3a5f] px-4 py-2 text-white">{editing ? 'Update' : 'Create'}</button></div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Students
