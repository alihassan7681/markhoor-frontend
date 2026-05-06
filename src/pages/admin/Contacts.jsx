import { useEffect, useState } from 'react'
import api from '../../api/axios'

const Contacts = () => {
  const [contacts, setContacts] = useState([])
  const [filter, setFilter] = useState('all')
  const [selected, setSelected] = useState(null)
  const [loading, setLoading] = useState(true)

  const load = () => {
    api.get('/admin/contacts').then((res) => setContacts(res.data)).finally(() => setLoading(false))
  }
  useEffect(() => { load() }, [])

  const openMessage = async (contact) => {
    setSelected(contact)
    if (!contact.isRead) {
      await api.patch(`/admin/contacts/${contact._id}/read`)
      load()
    }
  }

  const rows = contacts.filter((c) => (filter === 'all' ? true : filter === 'read' ? c.isRead : !c.isRead))

  return (
    <div className="space-y-8 animate-slide-up pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Support <span className="text-red-500">Inbox</span></h1>
          <p className="text-slate-500 font-medium">Read and manage messages from the contact page.</p>
        </div>
        <div className="glass-card p-1.5 rounded-2xl flex bg-white/50">
          {['all', 'unread', 'read'].map((f) => (
            <button 
              key={f}
              onClick={() => setFilter(f)} 
              className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all capitalize ${filter === f ? 'bg-red-500 text-white shadow-lg shadow-red-200' : 'text-slate-500 hover:text-slate-900'}`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-[1.5fr_1fr] gap-8">
        <div className="glass-card rounded-[40px] overflow-hidden border-white/60 shadow-xl h-[600px] flex flex-col">
          <div className="p-6 bg-slate-50 border-b border-slate-100 font-black text-slate-900">
            Messages ({rows.length})
          </div>
          <div className="overflow-y-auto flex-1">
            {loading ? (
              <div className="p-10 text-center font-bold text-slate-400">Loading inbox...</div>
            ) : rows.length === 0 ? (
              <div className="p-20 text-center space-y-4">
                <div className="text-6xl">📭</div>
                <p className="text-slate-400 font-medium italic">No messages found.</p>
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {rows.map((c) => (
                  <div 
                    key={c._id} 
                    onClick={() => openMessage(c)}
                    className={`p-6 cursor-pointer transition-all hover:bg-slate-50 ${selected?._id === c._id ? 'bg-red-50/50 border-l-4 border-l-red-500' : 'border-l-4 border-l-transparent'} ${c.isRead ? 'opacity-70' : 'bg-white'}`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-3">
                        <div className={`h-10 w-10 rounded-full flex items-center justify-center font-black ${c.isRead ? 'bg-slate-100 text-slate-500' : 'bg-red-500 text-white'}`}>
                          {c.name.charAt(0)}
                        </div>
                        <div>
                          <p className={`font-bold ${c.isRead ? 'text-slate-700' : 'text-slate-900'}`}>{c.name}</p>
                          <p className="text-xs text-slate-500">{c.email}</p>
                        </div>
                      </div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        {new Date(c.createdAt || Date.now()).toLocaleDateString()}
                      </div>
                    </div>
                    <p className={`text-sm line-clamp-1 ml-13 pl-13 ${c.isRead ? 'text-slate-500 font-medium' : 'text-slate-800 font-bold'}`}>
                      {c.message}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div>
          {selected ? (
            <div className="glass-card rounded-[40px] p-8 border-white/60 shadow-xl sticky top-8 animate-fade-in">
              <div className="flex items-center gap-4 mb-8 pb-8 border-b border-slate-100">
                <div className="h-16 w-16 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center font-black text-2xl">
                  {selected.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-2xl font-black text-slate-900">{selected.name}</h3>
                  <p className="text-sm font-bold text-slate-500">{selected.email}</p>
                  <p className="text-xs font-bold text-[#0077ff] bg-blue-50 inline-block px-2 py-1 rounded-md mt-2">{selected.course}</p>
                </div>
              </div>
              <div className="space-y-4">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Message Content</p>
                <div className="bg-slate-50 rounded-3xl p-6 text-slate-700 leading-relaxed text-sm">
                  {selected.message}
                </div>
              </div>
            </div>
          ) : (
            <div className="glass-card rounded-[40px] p-8 border-white/60 shadow-xl h-full flex flex-col items-center justify-center text-center space-y-4 min-h-[400px]">
              <div className="h-24 w-24 rounded-full bg-slate-50 flex items-center justify-center text-4xl text-slate-300">
                📧
              </div>
              <div>
                <h3 className="font-bold text-slate-900">No Message Selected</h3>
                <p className="text-slate-500 text-sm mt-1">Select a message from the inbox to read its full contents.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Contacts
