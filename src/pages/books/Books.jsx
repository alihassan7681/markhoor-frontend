import { useEffect, useMemo, useState } from 'react'
import api from '../../api/axios'
import Loader from '../../components/Loader'

const initialForm = { title: '', author: '', category: '', cover: null, file: null }

const Books = ({ notify }) => {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(initialForm)

  const fetchData = async () => {
    setLoading(true)
    try {
      const res = await api.get('/books')
      setItems(res.data || [])
    } catch {
      notify('Unable to fetch books.', 'error')
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => { fetchData() }, [])

  const filtered = useMemo(() => items.filter((b) => String(b.title || '').toLowerCase().includes(search.toLowerCase())), [items, search])

  const openCreate = () => { setEditing(null); setForm(initialForm); setShowModal(true) }
  const openEdit = (item) => { setEditing(item); setForm({ title: item.title || '', author: item.author || '', category: item.category || '', cover: null, file: null }); setShowModal(true) }

  const save = async (e) => {
    e.preventDefault()
    const data = new FormData()
    data.append('title', form.title); data.append('author', form.author); data.append('category', form.category)
    if (form.cover) data.append('cover', form.cover)
    if (form.file) data.append('file', form.file)
    try {
      if (editing) await api.put(`/books/${editing._id || editing.id}`, data, { headers: { 'Content-Type': 'multipart/form-data' } })
      else await api.post('/books', data, { headers: { 'Content-Type': 'multipart/form-data' } })
      notify(editing ? 'Book updated successfully.' : 'Book added successfully.')
      setShowModal(false)
      fetchData()
    } catch (error) {
      notify(error.response?.data?.message || 'Failed to save book.', 'error')
    }
  }

  const remove = async (item) => {
    if (!window.confirm(`Delete book ${item.title}?`)) return
    try { await api.delete(`/books/${item._id || item.id}`); notify('Book deleted successfully.'); fetchData() } catch { notify('Failed to delete book.', 'error') }
  }

  if (loading) return <Loader />

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 rounded-2xl bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search books by title..." className="w-full rounded-lg border border-slate-200 px-4 py-2 outline-none focus:border-[#1e3a5f] sm:max-w-xs" />
        <button onClick={openCreate} className="rounded-lg bg-[#1e3a5f] px-4 py-2 text-sm font-semibold text-white">Add Book</button>
      </div>
      {filtered.length === 0 ? <div className="rounded-2xl bg-white p-10 text-center text-slate-500 shadow-sm">No books found.</div> : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((b) => (
            <div key={b._id || b.id} className="overflow-hidden rounded-2xl bg-white shadow-sm">
              <img src={b.coverUrl || b.cover || 'https://placehold.co/600x400?text=No+Cover'} alt={b.title} className="h-48 w-full object-cover" />
              <div className="p-4"><h3 className="text-lg font-semibold text-[#1e3a5f]">{b.title}</h3><p className="text-sm text-slate-600">Author: {b.author || '-'}</p><p className="mb-3 text-sm text-slate-600">Category: {b.category || '-'}</p><div className="flex gap-2"><button onClick={() => openEdit(b)} className="rounded bg-amber-100 px-3 py-1">Edit</button><button onClick={() => remove(b)} className="rounded bg-red-100 px-3 py-1 text-red-700">Delete</button></div></div>
            </div>
          ))}
        </div>
      )}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
            <h3 className="mb-4 text-xl font-semibold text-[#1e3a5f]">{editing ? 'Edit Book' : 'Add Book'}</h3>
            <form className="grid gap-3" onSubmit={save}>
              {['title', 'author', 'category'].map((key) => <input key={key} required placeholder={key[0].toUpperCase() + key.slice(1)} value={form[key]} onChange={(e) => setForm((p) => ({ ...p, [key]: e.target.value }))} className="rounded-lg border border-slate-200 px-4 py-2 outline-none focus:border-[#1e3a5f]" />)}
              <input type="file" accept="image/*" onChange={(e) => setForm((p) => ({ ...p, cover: e.target.files?.[0] || null }))} className="rounded-lg border border-slate-200 px-4 py-2" />
              <input type="file" accept="application/pdf" onChange={(e) => setForm((p) => ({ ...p, file: e.target.files?.[0] || null }))} className="rounded-lg border border-slate-200 px-4 py-2" />
              <div className="mt-2 flex justify-end gap-2"><button type="button" onClick={() => setShowModal(false)} className="rounded-lg border border-slate-300 px-4 py-2">Cancel</button><button className="rounded-lg bg-[#1e3a5f] px-4 py-2 text-white">{editing ? 'Update' : 'Create'}</button></div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Books
