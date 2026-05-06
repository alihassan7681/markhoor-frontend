import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user already accepted cookies
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 2000); // Show after 2 seconds
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookie-consent', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 left-6 right-6 md:left-auto md:max-w-md z-[100] animate-slide-up">
      <div className="glass-card p-6 rounded-[32px] border-white/60 shadow-[0_20px_50px_rgba(0,0,0,0.15)] bg-white/90 backdrop-blur-xl">
        <div className="flex items-start gap-4">
          <div className="h-12 w-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 text-2xl">
            🍪
          </div>
          <div className="space-y-3">
            <h4 className="text-lg font-black text-slate-900 tracking-tight">We value your privacy</h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. By clicking "Accept", you consent to our use of cookies. 
              <Link to="/cookies-policy" className="text-blue-600 font-bold hover:underline ml-1">Learn More</Link>
            </p>
            <div className="pt-2 flex gap-3">
              <button 
                onClick={acceptCookies}
                className="flex-1 px-6 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-sm hover:bg-black transition-all shadow-lg shadow-slate-200"
              >
                Accept All
              </button>
              <button 
                onClick={() => setIsVisible(false)}
                className="px-6 py-2.5 rounded-xl bg-slate-100 text-slate-600 font-bold text-sm hover:bg-slate-200 transition-all"
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
