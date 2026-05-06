import { useState } from 'react'
import api from '../../api/axios'

const VerifyCertificate = () => {
  const [certId, setCertId] = useState('')
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const verify = async (e) => {
    e.preventDefault()
    setError('')
    setResult(null)
    if (!certId) return setError('Please enter certificate ID')
    
    setLoading(true)
    try {
      const { data } = await api.get(`/public/verify/${certId}`)
      setResult(data.student)
    } catch {
      setError('Invalid Certificate ID. Please check and try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-4xl py-12">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8 animate-slide-up">
          <div className="space-y-4">
            <h1 className="text-5xl font-black text-slate-900 leading-tight">
              Certificate <br />
              <span className="text-[#0077ff]">Verification</span>
            </h1>
            <p className="text-slate-500 text-lg">
              Verify the authenticity of Markhor Institute certificates. Enter the Student Serial No or Registration No to check details.
            </p>
          </div>
          
          <div className="p-6 rounded-[32px] bg-blue-50 border border-blue-100 flex items-center gap-4">
            <div className="text-3xl">🛡️</div>
            <p className="text-sm font-medium text-blue-700">All our certificates are digitally signed and verifiable online to ensure credibility.</p>
          </div>
        </div>

        <div className="glass-card rounded-[40px] p-8 md:p-10 shadow-2xl animate-slide-up">
          <form onSubmit={verify} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Serial / Registration No</label>
              <div className="relative">
                <input 
                  className="w-full rounded-2xl bg-slate-50 border-2 border-transparent p-5 focus:bg-white focus:border-[#0077ff] focus:outline-none transition-all text-lg font-bold" 
                  value={certId} 
                  onChange={(e) => setCertId(e.target.value)} 
                  placeholder="e.g. MK-2026-123" 
                />
              </div>
            </div>
            
            <button 
              disabled={loading}
              className="btn-premium w-full !py-5 text-lg shadow-xl shadow-blue-100"
            >
              {loading ? 'Verifying...' : 'Verify Now'}
            </button>
          </form>

          {error && (
            <div className="mt-8 p-6 rounded-2xl bg-red-50 border border-red-100 text-red-600 text-center animate-pulse font-bold">
              ❌ {error}
            </div>
          )}

          {result && (
            <div className="mt-8 space-y-6 animate-slide-up">
              <div className="p-1 rounded-2xl bg-gradient-to-r from-green-400 to-blue-500">
                <div className="bg-white rounded-[14px] p-6 space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</p>
                      <p className="text-green-600 font-black text-lg">✓ VALID CERTIFICATE</p>
                    </div>
                    <div className="h-12 w-12 rounded-xl bg-slate-900 flex items-center justify-center text-white font-black text-xl">M</div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Student Name</p>
                      <p className="font-bold text-slate-800">{result.name}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Course</p>
                      <p className="font-bold text-slate-800">{result.course}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Issue Date</p>
                      <p className="font-bold text-slate-800">{result.issueDate || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Sr No</p>
                      <p className="font-bold text-slate-800">{result.srNo}</p>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-center text-xs text-slate-400">Verification ID: {result._id}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default VerifyCertificate
