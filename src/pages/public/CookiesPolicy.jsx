import React from 'react';

const CookiesPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto py-16 px-6 sm:px-12 animate-slide-up">
      <div className="glass-card rounded-[40px] p-8 md:p-12 border-white/60 shadow-2xl">
        <h1 className="text-4xl font-black text-slate-900 mb-8 tracking-tight">Cookies <span className="text-[#0077ff]">Policy</span></h1>
        
        <div className="space-y-8 text-slate-600 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-slate-800 mb-4">1. What Are Cookies?</h2>
            <p>Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and provide information to the owners of the site.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-800 mb-4">2. How We Use Cookies</h2>
            <p>Markhor Institute uses cookies to:</p>
            <ul className="list-disc ml-6 mt-4 space-y-2">
              <li>Keep you signed in to the Student/Admin Portal</li>
              <li>Understand how you use our website (Analytics)</li>
              <li>Remember your preferences and settings</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-800 mb-4">3. Types of Cookies We Use</h2>
            <div className="grid sm:grid-cols-2 gap-4 mt-4">
              <div className="p-4 bg-slate-50 rounded-2xl">
                <h4 className="font-bold text-slate-900 mb-1">Essential Cookies</h4>
                <p className="text-sm">Required for the website to function (e.g., login sessions).</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl">
                <h4 className="font-bold text-slate-900 mb-1">Performance Cookies</h4>
                <p className="text-sm">Help us improve the website by collecting anonymous usage data.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-800 mb-4">4. Managing Cookies</h2>
            <p>You can set your browser to refuse all or some browser cookies, or to alert you when websites set or access cookies. If you disable cookies, please note that some parts of this website may become inaccessible or not function properly.</p>
          </section>

          <section className="pt-8 border-t border-slate-100">
            <p className="text-sm font-medium">Last updated: May 2026</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default CookiesPolicy;
