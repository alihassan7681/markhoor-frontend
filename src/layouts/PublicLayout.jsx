import { Outlet } from 'react-router-dom'
import { useState, useEffect } from 'react'
import PublicNavbar from '../components/public/PublicNavbar'
import PublicFooter from '../components/public/PublicFooter'
import CookieConsent from '../components/shared/CookieConsent'

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 z-50 p-3 md:p-4 rounded-2xl bg-[#0077ff] text-white shadow-xl shadow-blue-200 hover:-translate-y-1 hover:bg-blue-600 transition-all duration-300 flex items-center justify-center animate-fade-in"
      aria-label="Scroll to top"
    >
      <svg className="w-6 h-6 md:w-7 md:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 15l7-7 7 7" /></svg>
    </button>
  );
};

const PublicLayout = () => (
  <div className="min-h-screen bg-slate-50 selection:bg-[#0077ff]/20 selection:text-[#0077ff]">
    <PublicNavbar />
    <main className="mx-auto max-w-7xl px-4 py-12 relative">
      {/* Abstract Background Shapes */}
      <div className="absolute top-20 left-10 -z-10 w-64 h-64 bg-blue-100/50 rounded-full blur-3xl"></div>
      <div className="absolute bottom-40 right-10 -z-10 w-96 h-96 bg-purple-50 rounded-full blur-3xl"></div>
      
      <Outlet />
    </main>
    <PublicFooter />
    <ScrollToTop />
    <CookieConsent />
  </div>
)

export default PublicLayout
