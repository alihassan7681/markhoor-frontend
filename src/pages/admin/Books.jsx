import { useEffect, useState } from 'react'
import api from '../../api/axios'
import toast from 'react-hot-toast'
import { FaEdit, FaTrash, FaBookOpen } from 'react-icons/fa'

const emptyBook = { title: '', author: '', description: '', category: '', fileUrl: '', thumbnail: '', isPublic: true }

const Books = () => {
  const [books, setBooks] = useState([])
  const [form, setForm] = useState(emptyBook)
  const [editingId, setEditingId] = useState(null)
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const loadBooks = async () => {
    try {
      const { data } = await api.get('/books')
      setBooks(data)
    } catch (err) {
      toast.error('Failed to load books')
    }
  }

  useEffect(() => { loadBooks() }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      if (editingId) {
        await api.put(`/books/${editingId}`, form)
        toast.success('Book updated!')
      } else {
        await api.post('/books', form)
        toast.success('Book added!')
      }
      setForm(emptyBook)
      setEditingId(null)
      setShowModal(false)
      loadBooks()
    } catch (err) {
      toast.error('Failed to save book')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this book?')) return
    try {
      await api.delete(`/books/${id}`)
      toast.success('Book deleted')
      loadBooks()
    } catch (err) {
      toast.error('Failed to delete')
    }
  }

  return (
    <div className="space-y-8 animate-slide-up">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Study <span className="text-emerald-500">Material</span></h1>
          <p className="text-slate-500 font-medium">Manage library books, notes, and public resources.</p>
        </div>
        <button 
          onClick={() => { setForm(emptyBook); setEditingId(null); setShowModal(true) }} 
          className="px-6 py-3 rounded-xl bg-emerald-500 text-white font-bold text-sm hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-200 flex items-center gap-2"
        >
          <FaBookOpen /> Add Material
        </button>
      </div>

      <div className="glass-card rounded-[40px] overflow-hidden border-white/60 shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-900 text-white font-bold uppercase tracking-widest text-[10px]">
              <tr>
                <th className="px-8 py-5">Image</th>
                <th className="px-8 py-5">Title</th>
                <th className="px-8 py-5">Category</th>
                <th className="px-8 py-5">Author</th>
                <th className="px-8 py-5">Public</th>
                <th className="px-8 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {books.map((b) => (
                <tr key={b._id} className="hover:bg-emerald-50/30 transition-all group">
                  <td className="px-8 py-4">
                    <div className="h-12 w-12 rounded-xl bg-slate-100 overflow-hidden border border-slate-200">
                      <img src={b.thumbnail || '/books.png'} alt={b.title} className="w-full h-full object-cover" />
                    </div>
                  </td>
                  <td className="px-8 py-6 font-black text-slate-900 text-lg group-hover:text-emerald-600 transition-colors">
                    {b.title}
                  </td>
                  <td className="px-8 py-6">
                    <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg font-bold text-xs">
                      {b.category || 'General'}
                    </span>
                  </td>
                  <td className="px-8 py-6 font-medium text-slate-600">{b.author || '-'}</td>
                  <td className="px-8 py-6">
                    <span className={`h-3 w-3 inline-block rounded-full ${b.isPublic ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]' : 'bg-slate-300'}`}></span>
                  </td>
                  <td className="px-8 py-6 text-right space-x-2">
                    <button onClick={() => { setEditingId(b._id); setForm(b); setShowModal(true) }} className="h-10 w-10 rounded-xl inline-flex items-center justify-center bg-slate-100 text-slate-600 hover:bg-emerald-500 hover:text-white transition-all">
                      <FaEdit />
                    </button>
                    <button onClick={() => handleDelete(b._id)} className="h-10 w-10 rounded-xl inline-flex items-center justify-center bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-all">
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {books.length === 0 && (
            <div className="p-20 text-center space-y-4">
              <div className="text-6xl">📚</div>
              <p className="text-slate-400 font-medium italic">No study materials found.</p>
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-2xl rounded-[32px] bg-white p-8 shadow-2xl border border-white/50 animate-slide-up">
            <h3 className="mb-6 text-2xl font-black text-slate-900 tracking-tight">
              {editingId ? 'Edit Material' : 'Add New Material'}
            </h3>
            <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
              <div className="md:col-span-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-1 block">Title</label>
                <input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full rounded-2xl bg-slate-50 border-2 border-transparent px-4 py-3 outline-none focus:bg-white focus:border-emerald-500 transition-all font-semibold" />
              </div>
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-1 block">Author</label>
                <input value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} className="w-full rounded-2xl bg-slate-50 border-2 border-transparent px-4 py-3 outline-none focus:bg-white focus:border-emerald-500 transition-all font-semibold" />
              </div>
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-1 block">Category</label>
                <input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full rounded-2xl bg-slate-50 border-2 border-transparent px-4 py-3 outline-none focus:bg-white focus:border-emerald-500 transition-all font-semibold" />
              </div>
              <div className="md:col-span-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-1 block">File URL (PDF link)</label>
                <input required value={form.fileUrl} onChange={(e) => setForm({ ...form, fileUrl: e.target.value })} className="w-full rounded-2xl bg-slate-50 border-2 border-transparent px-4 py-3 outline-none focus:bg-white focus:border-emerald-500 transition-all font-semibold" />
              </div>
              <div className="md:col-span-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-1 block">Thumbnail URL</label>
                <input placeholder="/books.png" value={form.thumbnail} onChange={(e) => setForm({ ...form, thumbnail: e.target.value })} className="w-full rounded-2xl bg-slate-50 border-2 border-transparent px-4 py-3 outline-none focus:bg-white focus:border-emerald-500 transition-all font-semibold" />
              </div>
              <div className="md:col-span-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-1 block">Description</label>
                <textarea rows="3" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full rounded-2xl bg-slate-50 border-2 border-transparent px-4 py-3 outline-none focus:bg-white focus:border-emerald-500 transition-all font-semibold resize-none" />
              </div>
              <div className="md:col-span-2 flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <input type="checkbox" id="isPublic" checked={form.isPublic} onChange={(e) => setForm({ ...form, isPublic: e.target.checked })} className="h-5 w-5 rounded accent-emerald-500" />
                <label htmlFor="isPublic" className="text-sm font-bold text-slate-700 cursor-pointer">Show on Public Website</label>
              </div>
              <div className="md:col-span-2 pt-4 flex justify-end gap-3 border-t border-slate-100">
                <button type="button" onClick={() => setShowModal(false)} className="px-6 py-3 rounded-xl font-bold text-slate-500 hover:bg-slate-50 transition-colors">Cancel</button>
                <button disabled={loading} className="px-8 py-3 rounded-xl bg-emerald-500 text-white font-black hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-200">
                  {editingId ? 'Update Material' : 'Save Material'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Books
