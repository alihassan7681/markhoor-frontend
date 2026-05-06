import { Link } from 'react-router-dom'
import { IoRocketOutline, IoHomeOutline } from 'react-icons/io5'
import { FaExclamationTriangle } from 'react-icons/fa'

const NotFound = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-20 relative overflow-hidden font-sans">
      {/* Background Blobs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-200/40 blur-[80px] rounded-full pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-300/30 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="relative z-10 text-center max-w-2xl mx-auto space-y-8 animate-slide-up">
        {/* Animated Icon Container */}
        <div className="relative inline-block">
          <div className="absolute inset-0 bg-blue-500/20 blur-2xl rounded-full scale-150 animate-pulse"></div>
          <div className="relative bg-white w-24 h-24 md:w-32 md:h-32 rounded-[2rem] shadow-2xl flex items-center justify-center border border-slate-100 mb-8 mx-auto">
            <FaExclamationTriangle className="text-4xl md:text-6xl text-blue-600 animate-bounce" />
          </div>
        </div>

        <h1 className="text-7xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 leading-none">
          404
        </h1>
        
        <div className="space-y-4">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
            Oops! Page Not Found
          </h2>
          <p className="text-base md:text-lg text-slate-500 max-w-md mx-auto leading-relaxed">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            to="/" 
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-[#2b5aed] text-white font-bold text-lg hover:bg-blue-700 transition-all shadow-[0_8px_20px_rgba(43,90,237,0.3)] hover:-translate-y-1 active:scale-95"
          >
            <IoHomeOutline className="text-xl" /> Back to Home
          </Link>
          <Link 
            to="/contact" 
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-white text-slate-900 border-2 border-slate-100 font-bold text-lg hover:bg-slate-50 transition-all hover:-translate-y-1 active:scale-95"
          >
            <IoRocketOutline className="text-xl" /> Contact Support
          </Link>
        </div>

        {/* Suggestion Links */}
        <div className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm font-bold text-slate-400 uppercase tracking-widest">
            <Link to="/courses" className="hover:text-blue-600 transition-colors">Courses</Link>
            <Link to="/about" className="hover:text-blue-600 transition-colors">About Us</Link>
            <Link to="/registration" className="hover:text-blue-600 transition-colors">Apply Now</Link>
            <Link to="/verify" className="hover:text-blue-600 transition-colors">Verify Cert</Link>
        </div>
      </div>
    </div>
  )
}

export default NotFound
