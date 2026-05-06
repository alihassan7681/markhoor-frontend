import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto py-16 px-6 sm:px-12 animate-slide-up">
      <div className="glass-card rounded-[40px] p-8 md:p-12 border-white/60 shadow-2xl">
        <h1 className="text-4xl font-black text-slate-900 mb-8 tracking-tight">Privacy <span className="text-[#0077ff]">Policy</span></h1>
        
        <div className="space-y-8 text-slate-600 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-slate-800 mb-4">1. Introduction</h2>
            <p>Welcome to Markhor Institute. We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, and safeguard your data when you visit our website or use our services.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-800 mb-4">2. Information We Collect</h2>
            <p>We collect personal information that you voluntarily provide to us when you register on the website, express an interest in obtaining information about us or our products and services, or otherwise when you contact us.</p>
            <ul className="list-disc ml-6 mt-4 space-y-2">
              <li>Name and Contact Data (Email, Phone Number)</li>
              <li>Academic Information for Registration</li>
              <li>Payment Data for course fees</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-800 mb-4">3. How We Use Your Information</h2>
            <p>We use the information we collect to provide, operate, and maintain our website, improve user experience, and communicate with you regarding courses, certifications, and updates.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-800 mb-4">4. Data Security</h2>
            <p>We implement a variety of security measures to maintain the safety of your personal information. However, no method of transmission over the Internet is 100% secure.</p>
          </section>

          <section className="pt-8 border-t border-slate-100">
            <p className="text-sm font-medium">Last updated: May 2026</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
