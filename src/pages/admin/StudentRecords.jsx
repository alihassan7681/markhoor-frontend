import { useEffect, useState } from 'react'
import api from '../../api/axios'
import toast from 'react-hot-toast'
import { FaFileInvoice, FaGraduationCap, FaSearch } from 'react-icons/fa'

const AdminStudentRecords = () => {
  const [reports, setReports] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    api.get('/admin/reports/students')
      .then(res => setReports(res.data || []))
      .catch(() => toast.error('Failed to load student records'))
      .finally(() => setLoading(false))
  }, [])

  const filtered = reports.filter(r => 
    r.name.toLowerCase().includes(search.toLowerCase()) || 
    r.srNo.toLowerCase().includes(search.toLowerCase())
  )

  if (loading) return (
    <div className="flex h-64 items-center justify-center">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#0077ff] border-t-transparent"></div>
    </div>
  )

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Student <span className="text-[#0077ff]">Performance Reports</span>
          </h1>
          <p className="text-slate-500 font-medium tracking-tight">Administrative overview of all student test records.</p>
        </div>

        <div className="relative group">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#0077ff] transition-colors" />
          <input 
            type="text" 
            placeholder="Search by name or serial..." 
            className="pl-11 pr-6 py-3 rounded-2xl bg-white border border-slate-100 shadow-sm focus:ring-4 focus:ring-[#0077ff]/10 focus:border-[#0077ff] outline-none transition-all w-full md:w-80 font-bold text-sm text-slate-700"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="grid gap-6">
        {filtered.map((student) => (
          <div key={student.id} className="glass-card rounded-[32px] p-8 transition-all hover:shadow-xl hover:shadow-[#0077ff]/5 group overflow-hidden relative">
            {/* Decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#0077ff]/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 group-hover:bg-[#0077ff]/10 transition-colors"></div>
            
            <div className="flex flex-col lg:flex-row lg:items-center gap-8 relative z-10">
              {/* Student Basic Info */}
              <div className="lg:w-1/4 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="h-14 w-14 rounded-2xl bg-slate-100 flex items-center justify-center text-[#0077ff] text-2xl group-hover:bg-[#0077ff] group-hover:text-white transition-all duration-500">
                    <FaGraduationCap />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-slate-900 leading-tight">{student.name}</h3>
                    <p className="text-xs font-black uppercase tracking-widest text-slate-400">SR#: {student.srNo}</p>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-bold text-slate-500 flex items-center gap-2">
                    <span className="w-4 h-4 rounded bg-slate-100 flex items-center justify-center text-[8px]">📧</span> {student.email}
                  </p>
                  <p className="text-xs font-bold text-slate-500 flex items-center gap-2">
                    <span className="w-4 h-4 rounded bg-slate-100 flex items-center justify-center text-[8px]">📚</span> {student.course}
                  </p>
                </div>
              </div>

              {/* Performance Summary */}
              <div className="lg:flex-1">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Tests Taken</p>
                    <p className="text-xl font-black text-slate-900">{student.attempts.length}</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100">
                    <p className="text-[10px] font-black uppercase tracking-widest text-emerald-400 mb-1">Pass Rate</p>
                    <p className="text-xl font-black text-emerald-600">
                      {student.attempts.length ? ((student.attempts.filter(a => a.isPassed).length / student.attempts.length) * 100).toFixed(0) : 0}%
                    </p>
                  </div>
                  <div className="p-4 rounded-2xl bg-blue-50 border border-blue-100">
                    <p className="text-[10px] font-black uppercase tracking-widest text-blue-400 mb-1">Avg Score</p>
                    <p className="text-xl font-black text-blue-600">
                      {student.attempts.length ? (student.attempts.reduce((s, a) => s + a.percentage, 0) / student.attempts.length).toFixed(0) : 0}%
                    </p>
                  </div>
                  <div className="p-4 rounded-2xl bg-[#0077ff]/5 border border-[#0077ff]/10">
                    <p className="text-[10px] font-black uppercase tracking-widest text-[#0077ff]/60 mb-1">Last Score</p>
                    <p className="text-xl font-black text-[#0077ff]">
                      {student.attempts.length ? student.attempts[student.attempts.length - 1].percentage.toFixed(0) : 0}%
                    </p>
                  </div>
                </div>

                {/* History Table-ish */}
                <div className="space-y-2">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1 mb-2 flex items-center gap-2">
                    <FaFileInvoice className="text-[#0077ff]" /> Detailed History
                  </p>
                  {student.attempts.length > 0 ? (
                    <div className="grid md:grid-cols-2 gap-2">
                      {student.attempts.map((a, i) => (
                        <div key={i} className="flex items-center justify-between p-3 bg-white border border-slate-100 rounded-xl">
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-bold text-slate-800 truncate">{a.quizTitle}</p>
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">
                              {new Date(a.date).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="flex items-center gap-3 ml-4">
                            <div className="text-right">
                              <p className="text-xs font-black text-slate-900 leading-none">{a.marks}/{a.totalMarks}</p>
                              <p className={`text-[8px] font-black uppercase tracking-widest ${a.isPassed ? 'text-emerald-500' : 'text-red-500'}`}>
                                {a.isPassed ? 'Pass' : 'Fail'}
                              </p>
                            </div>
                            <div className={`h-8 w-1 rounded-full ${a.isPassed ? 'bg-emerald-500' : 'bg-red-500'}`} />
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6 border-2 border-dashed border-slate-100 rounded-2xl">
                      <p className="text-xs font-bold text-slate-400 italic">No tests attempted yet.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="glass-card rounded-[40px] p-20 text-center flex flex-col items-center border-dashed border-2">
            <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center text-4xl mb-6 grayscale group-hover:grayscale-0 transition-all">🕵️‍♂️</div>
            <h3 className="text-2xl font-black text-slate-800 mb-2">No students match your search</h3>
            <p className="text-slate-400 font-medium tracking-tight">Try searching by a different name or serial number.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminStudentRecords
