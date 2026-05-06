// import { Link } from 'react-router-dom'
// import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaArrowRight } from 'react-icons/fa'

// const PublicFooter = () => (
//   <footer className="relative mt-24 bg-[#0a0f1a] text-white pt-20 pb-10 overflow-hidden">
//     {/* Decorative Elements */}
//     <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#0077ff] to-transparent opacity-50"></div>
//     <div className="absolute -top-24 -left-24 w-64 h-64 bg-blue-600/10 blur-[100px] rounded-full"></div>
//     <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-600/5 blur-[120px] rounded-full"></div>

//     <div className="mx-auto max-w-7xl px-6 relative z-10">
//       <div className="grid gap-12 md:gap-8 lg:grid-cols-4 pb-16">
        
//         {/* Brand Column */}
//         <div className="space-y-8">
//           <Link to="/" className="flex items-center gap-3 group">
//             <div className="h-12 w-12 rounded-2xl bg-white p-1.5 overflow-hidden shadow-[0_0_20px_rgba(255,255,255,0.1)] group-hover:scale-105 transition-transform duration-500">
//               <img src="/markhoor-logo-.png" alt="Logo" className="w-full h-full object-contain" />
//             </div>
//             <h3 className="text-2xl font-black tracking-tighter text-white">
//               Markhor <span className="text-[#0077ff]">Institute</span>
//             </h3>
//           </Link>
//           <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
//             Empowering the next generation of tech leaders through industry-standard training and professional development in Sahiwal.
//           </p>
//           <div className="flex gap-3">
//             {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube].map((Icon, i) => (
//               <a key={i} href="#" className="h-10 w-10 rounded-xl bg-slate-800/50 flex items-center justify-center text-slate-400 hover:bg-[#0077ff] hover:text-white transition-all duration-300 border border-slate-700/50">
//                 <Icon size={16} />
//               </a>
//             ))}
//           </div>
//         </div>

//         {/* Quick Links */}
//         <div>
//           <h4 className="text-lg font-bold mb-8 relative inline-block">
//             Explore
//             <span className="absolute -bottom-2 left-0 w-8 h-1 bg-[#0077ff] rounded-full"></span>
//           </h4>
//           <ul className="space-y-4">
//             {[
//               { to: '/', label: 'Home' },
//               { to: '/courses', label: 'All Courses' },
//               { to: '/books', label: 'Study Material' },
//               { to: '/verify', label: 'Verify Certificate' },
//               { to: '/registration', label: 'Online Admission' }
//             ].map((link, i) => (
//               <li key={i}>
//                 <Link to={link.to} className="text-slate-400 hover:text-[#0077ff] text-sm font-medium transition-colors flex items-center gap-2 group">
//                   <FaArrowRight size={10} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
//                   {link.label}
//                 </Link>
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* Legal & Support */}
//         <div>
//           <h4 className="text-lg font-bold mb-8 relative inline-block">
//             Support
//             <span className="absolute -bottom-2 left-0 w-8 h-1 bg-[#0077ff] rounded-full"></span>
//           </h4>
//           <ul className="space-y-4">
//             {[
//               { to: '/about', label: 'About Us' },
//               { to: '/contact', label: 'Contact Support' },
//               { to: '/privacy-policy', label: 'Privacy Policy' },
//               { to: '/cookies-policy', label: 'Cookies Policy' }
//             ].map((link, i) => (
//               <li key={i}>
//                 <Link to={link.to} className="text-slate-400 hover:text-[#0077ff] text-sm font-medium transition-colors flex items-center gap-2 group">
//                   <FaArrowRight size={10} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
//                   {link.label}
//                 </Link>
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* Contact Info */}
//         <div>
//           <h4 className="text-lg font-bold mb-8 relative inline-block">
//             Get in Touch
//             <span className="absolute -bottom-2 left-0 w-8 h-1 bg-[#0077ff] rounded-full"></span>
//           </h4>
//           <div className="space-y-6">
//             <div className="flex gap-4 items-start group">
//               <div className="h-10 w-10 rounded-xl bg-slate-800/50 flex items-center justify-center text-[#0077ff] shrink-0 border border-slate-700/50 group-hover:bg-[#0077ff] group-hover:text-white transition-all">
//                 <FaMapMarkerAlt />
//               </div>
//               <div>
//                 <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Address</p>
//                 <p className="text-sm text-slate-300">Opposite Govt College, Sahiwal, Pakistan</p>
//               </div>
//             </div>
//             <div className="flex gap-4 items-start group">
//               <div className="h-10 w-10 rounded-xl bg-slate-800/50 flex items-center justify-center text-[#0077ff] shrink-0 border border-slate-700/50 group-hover:bg-[#0077ff] group-hover:text-white transition-all">
//                 <FaPhoneAlt />
//               </div>
//               <div>
//                 <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Phone</p>
//                 <p className="text-sm text-slate-300">+92 300 0000000</p>
//               </div>
//             </div>
//             <div className="flex gap-4 items-start group">
//               <div className="h-10 w-10 rounded-xl bg-slate-800/50 flex items-center justify-center text-[#0077ff] shrink-0 border border-slate-700/50 group-hover:bg-[#0077ff] group-hover:text-white transition-all">
//                 <FaEnvelope />
//               </div>
//               <div>
//                 <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Email</p>
//                 <p className="text-sm text-slate-300">info@markhorcollege.com</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Bottom Bar */}
//       <div className="pt-8 border-t border-slate-800/50 flex flex-col md:flex-row justify-between items-center gap-4 text-center">
//         <p className="text-slate-500 text-xs font-medium">
//           © 2026 Markhor Institute. Crafted with ❤️ for professional excellence.
//         </p>
//         <div className="flex gap-6">
//           <Link to="/privacy-policy" className="text-slate-500 hover:text-white text-[10px] uppercase tracking-widest transition-colors font-bold">Privacy</Link>
//           <Link to="/cookies-policy" className="text-slate-500 hover:text-white text-[10px] uppercase tracking-widest transition-colors font-bold">Cookies</Link>
//           <Link to="/contact" className="text-slate-500 hover:text-white text-[10px] uppercase tracking-widest transition-colors font-bold">Support</Link>
//         </div>
//       </div>
//     </div>
//   </footer>
// )

// export default PublicFooter






import { Link } from 'react-router-dom'
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa'

const PublicFooter = () => (
  <footer className="w-full bg-[#0a0f1a] text-white pt-12 pb-9 mt-24">
    <div className="w-full px-6 md:px-12 lg:px-16">

      {/* Top Row — tagline left, social icons right */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6 mb-10">
        <p className="text-sm text-white/50 leading-relaxed max-w-sm">
          Empowering the next generation of tech leaders through
          industry-standard training in Sahiwal, Pakistan.
        </p>
        <div className="flex flex-wrap gap-3">
          {[
            { Icon: FaFacebookF,  label: 'Facebook'  },
            { Icon: FaTwitter,    label: 'Twitter'   },
            { Icon: FaInstagram,  label: 'Instagram' },
            { Icon: FaLinkedinIn, label: 'LinkedIn'  },
            { Icon: FaYoutube,    label: 'YouTube'   },
          ].map(({ Icon, label }) => (
            <a
              key={label}
              href="#"
              aria-label={label}
              className="h-11 w-11 rounded-xl bg-white/[0.07] border border-white/10 flex items-center justify-center text-white/60 hover:bg-[#0077ff] hover:text-white hover:border-[#0077ff] transition-all duration-200"
            >
              <Icon size={16} />
            </a>
          ))}
        </div>
      </div>

      {/* Logo Row — logo image + wordmark */}
      <div className="flex items-center gap-4 md:gap-7">
        <div className="h-16 w-16 sm:h-20 sm:w-20 md:h-28 md:w-28 flex items-center justify-center shrink-0 overflow-hidden">
          <img
            src="/markhoor-logo-.png"
            alt="Markhor Institute Logo"
            className="w-full h-full object-contain p-2 md:p-3"
          />
        </div>
        <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-none text-white">
          Markhor <span className="text-[#0077ff]">Institute</span>
        </h2>
      </div>

      {/* Bottom Bar */}
      <div className="mt-10 pt-5 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <p className="text-xs text-white/30">
          © 2026 Markhor Institute. Crafted with ❤️ for professional excellence.
        </p>
        <div className="flex flex-wrap justify-center sm:justify-end gap-4 sm:gap-6">
          {[
            { to: '/privacy-policy', label: 'Privacy Policy' },
            { to: '/cookies-policy', label: 'Cookies Policy' },
            { to: '/contact',        label: 'Support'        },
          ].map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className="text-xs text-white/30 hover:text-white/80 transition-colors"
            >
              {label}
            </Link>
          ))}
        </div>
      </div>

    </div>
  </footer>
)

export default PublicFooter