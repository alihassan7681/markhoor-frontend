import { useEffect, useState } from 'react'
import api from '../../api/axios'
import toast from 'react-hot-toast'

const Admissions = () => {
  const [admissions, setAdmissions] = useState([])
  const [loading, setLoading] = useState(true)

  const loadAdmissions = async () => {
    try {
      const { data } = await api.get('/admin/students')
      // Filter for students with 'pending' status (online applicants)
      const pending = data.filter(s => s.status === 'pending')
      setAdmissions(pending)
    } catch (err) {
      toast.error('Failed to load admissions')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { loadAdmissions() }, [])

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await api.put(`/admin/students/${id}`, { status: newStatus })
      toast.success(`Application ${newStatus}!`)
      loadAdmissions()
    } catch (err) {
      toast.error('Failed to update status')
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this application?')) return
    try {
      await api.delete(`/admin/students/${id}`)
      toast.success('Application deleted')
      loadAdmissions()
    } catch (err) {
      toast.error('Failed to delete')
    }
  }

  if (loading) return <div className="p-10 text-center">Loading applications...</div>

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#1e3a5f]">Online Admission Applications</h1>
        <span className="rounded-full bg-blue-100 px-4 py-1 text-sm font-bold text-blue-700">
          {admissions.length} New Applications
        </span>
      </div>

      <div className="grid gap-6">
        {admissions.map((app) => (
          <div key={app._id} className="rounded-2xl bg-white p-6 shadow-sm border border-slate-100 hover:border-blue-200 transition-all">
            <div className="flex flex-col md:flex-row justify-between gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-slate-800">{app.name}</h3>
                  <p className="text-slate-500 font-medium">Applied for: <span className="text-[#7c3aed]">{app.course}</span></p>
                </div>
                
                <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
                  <div>
                    <p className="text-slate-400 uppercase text-[10px] font-bold">Father's Name</p>
                    <p className="text-slate-700">{app.fatherName}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 uppercase text-[10px] font-bold">Phone</p>
                    <p className="text-slate-700">{app.phone}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 uppercase text-[10px] font-bold">Qualification</p>
                    <p className="text-slate-700">{app.qualification || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 uppercase text-[10px] font-bold">Address</p>
                    <p className="text-slate-700">{app.address || 'N/A'}</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-center gap-2 border-t md:border-t-0 md:border-l pt-4 md:pt-0 md:pl-6">
                <p className="text-xs text-slate-400 mb-2">Submitted: {new Date(app.registeredAt).toLocaleDateString()}</p>
                <button 
                  onClick={() => handleStatusUpdate(app._id, 'verified')}
                  className="rounded-xl bg-green-500 px-6 py-2 text-white font-bold hover:bg-green-600 transition-colors"
                >
                  Approve & Verify
                </button>
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleDelete(app._id)}
                    className="flex-1 rounded-xl bg-red-50 px-4 py-2 text-red-600 font-semibold hover:bg-red-100 transition-colors"
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {admissions.length === 0 && (
          <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-slate-100">
            <p className="text-slate-400 italic">No pending admission applications found.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Admissions
