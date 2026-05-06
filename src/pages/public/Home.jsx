import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { FaLaptopCode, FaChalkboardTeacher, FaBriefcase, FaGraduationCap, FaQuoteLeft, FaQuestionCircle, FaCheckCircle, FaStar, FaBrain, FaMobileAlt, FaDatabase, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { BsPatchCheckFill } from 'react-icons/bs'
import { MdOutlineComputer, MdOutlineSupportAgent } from 'react-icons/md'
import { HiOutlineArrowRight } from 'react-icons/hi'
import { IoRocketOutline } from 'react-icons/io5'

const testimonials = [
  { name: 'Ali Raza', course: 'Web Development', review: 'Markhor Institute transformed my career. I came with zero knowledge and now I am working as a full-stack developer at a reputable software house.' },
  { name: 'Ayesha Khan', course: 'Graphic Design', review: 'The instructors are amazing! The hands-on projects helped me build a strong portfolio. I started freelancing before even completing the course.' },
  { name: 'Usman Tariq', course: 'Digital Marketing', review: 'The student portal makes learning so easy. The quizzes and study materials provided are top-notch. Highly recommended for anyone in Sahiwal.' },
  { name: 'Fatima Bilal', course: 'AI & Machine Learning', review: 'The depth of knowledge provided here is unmatched. The career counseling helped me secure my first international remote job.' },
  { name: 'Hassan Jamil', course: 'App Development', review: 'Practical learning from day one. I published my first React Native app to the Play Store before the course even ended!' },
];

const Home = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-32 pb-20 overflow-hidden font-sans">
      {/* 1. HERO SECTION */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-32 bg-white">
        {/* Background Blobs */}
        <div className="absolute top-10 right-20 w-48 h-48 md:w-64 md:h-64 bg-cyan-200/40 blur-[60px] md:blur-[80px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-0 right-1/4 w-72 h-72 md:w-96 md:h-96 bg-blue-300/30 blur-[80px] md:blur-[100px] rounded-full pointer-events-none"></div>

        <div className="grid gap-12 lg:grid-cols-2 items-center relative z-10 px-4">
          
          {/* LEFT SIDE: Text Content */}
          <div className="space-y-6 md:space-y-8 animate-slide-up text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#e8f2fc] text-slate-600 font-medium text-xs md:text-sm">
              <span className="text-yellow-500">⚡</span> 
              Career-Focused Training Institute 
              <span className="text-yellow-400">⭐</span>
            </div>
            
            <h1 className="text-[2.8rem] xs:text-[3.5rem] md:text-[5rem] lg:text-[5.5rem] font-black text-black leading-[1.1] tracking-tight">
              Empowering <br className="hidden xs:block" />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-600">Careers</span> <br className="hidden xs:block" />
              Building Skills
            </h1>
            
            <p className="text-base md:text-lg text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Markhor Computer College Sahiwal - Developing highly skilled, professionally competent, and industry-ready individuals through <span className="font-bold text-blue-600">Government Job Preparation</span> and <span className="font-bold text-blue-600">Digital Professional Skills</span>.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/contact" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-[#2b5aed] text-white font-bold text-lg hover:bg-blue-700 transition-all shadow-[0_8px_20px_rgba(43,90,237,0.3)] hover:-translate-y-1">
                <IoRocketOutline className="text-xl" /> Free Consultation
              </Link>
              <Link to="/courses" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-white text-slate-900 border-2 border-slate-100 font-bold text-lg hover:bg-slate-50 transition-all hover:-translate-y-1">
                Explore Courses
              </Link>
            </div>
          </div>

          {/* RIGHT SIDE: Floating Cards Stack */}
          <div className="relative h-[400px] md:h-[500px] hidden lg:block scale-90 xl:scale-100">
            {/* Card 1: Web Dev */}
            <div className="absolute top-0 right-32 w-64 bg-white rounded-3xl p-5 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] border border-slate-50 z-10 transition-transform hover:-translate-y-2">
              <div className="h-12 w-12 rounded-xl bg-[#4169e1] text-white flex items-center justify-center text-xl mb-3 shadow-lg shadow-blue-200">
                <FaLaptopCode />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">Web Development</h3>
              <p className="text-xs text-slate-400 font-medium">3.2K enrolled</p>
            </div>

            {/* Card 2: AI & ML */}
            <div className="absolute top-[100px] right-4 w-64 bg-white rounded-3xl p-5 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] border border-slate-50 z-20 transition-transform hover:-translate-y-2">
              <div className="h-12 w-12 rounded-xl bg-[#3f51b5] text-white flex items-center justify-center text-xl mb-3 shadow-lg shadow-indigo-200">
                <FaBrain />
              </div>
              <div className="flex justify-between items-end">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">AI & ML</h3>
                  <p className="text-xs text-white select-none">.</p>
                </div>
                <HiOutlineArrowRight className="text-[#0077ff] text-lg mb-1" />
              </div>
            </div>

            {/* Card 3: App Dev */}
            <div className="absolute top-[200px] right-36 w-64 bg-white rounded-3xl p-5 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] border border-slate-50 z-30 transition-transform hover:-translate-y-2">
              <div className="h-12 w-12 rounded-xl bg-[#4d70ff] text-white flex items-center justify-center text-xl mb-3 shadow-lg shadow-blue-200">
                <FaMobileAlt />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">App Development</h3>
              <p className="text-xs text-slate-400 font-medium">1.8K enrolled</p>
            </div>

            {/* Card 4: Data Science */}
            <div className="absolute top-[310px] right-8 w-64 bg-white rounded-3xl p-5 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] border border-slate-50 z-40 transition-transform hover:-translate-y-2">
              <div className="h-12 w-12 rounded-xl bg-[#2740cf] text-white flex items-center justify-center text-xl mb-3 shadow-lg shadow-blue-300">
                <FaDatabase />
              </div>
              <div className="flex justify-between items-end">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">Data Science</h3>
                  <p className="text-xs text-slate-400 font-medium">2.5K enrolled</p>
                </div>
                <HiOutlineArrowRight className="text-[#0077ff] text-lg mb-1" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STATS SECTION */}
      <section className="px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {[
            { label: 'Active Students', value: '1,200+', icon: <FaGraduationCap /> },
            { label: 'Courses Offered', value: '12+', icon: <FaLaptopCode /> },
            { label: 'Certified Alumni', value: '500+', icon: <BsPatchCheckFill /> },
            { label: 'Expert Trainers', value: '15+', icon: <FaChalkboardTeacher /> },
          ].map((stat, i) => (
            <div key={i} className="glass-card rounded-[24px] md:rounded-[32px] p-6 md:p-8 text-center animate-slide-up group hover:bg-[#0077ff] transition-all duration-500" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="text-2xl md:text-3xl text-blue-400 mb-3 md:mb-4 flex justify-center group-hover:text-white/50 transition-colors">{stat.icon}</div>
              <p className="text-2xl md:text-4xl font-black text-[#1e293b] group-hover:text-white transition-colors">{stat.value}</p>
              <p className="text-[10px] md:text-xs font-bold text-slate-400 mt-1 md:mt-2 uppercase tracking-widest group-hover:text-white/70 transition-colors">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. WHY CHOOSE US */}
      <section className="space-y-12 md:space-y-16 px-4">
        <div className="text-center space-y-4">
          <p className="text-blue-600 font-bold tracking-widest uppercase text-[10px] md:text-sm">Our Features</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">Why Choose <span className="text-[#0077ff]">Markhor?</span></h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-sm md:text-lg leading-relaxed">We don't just teach coding; we build professionals who are ready to take on the global tech industry.</p>
        </div>

        <div className="grid gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[
            { title: 'Modern Labs', icon: <MdOutlineComputer />, desc: 'Fully equipped computer labs with high-speed internet and modern hardware to ensure a seamless learning experience.' },
            { title: 'Expert Faculty', icon: <FaChalkboardTeacher />, desc: 'Learn from industry professionals with years of practical experience and deep knowledge of current market trends.' },
            { title: 'Job Placement', icon: <FaBriefcase />, desc: 'Dedicated career counseling, interview preparation, and job placement support for our top-performing graduates.' },
            { title: 'Hands-on Projects', icon: <FaLaptopCode />, desc: 'Work on real-world projects that you can add directly to your professional portfolio to attract clients.' },
            { title: '24/7 Support', icon: <MdOutlineSupportAgent />, desc: 'Our dedicated student portal allows you to access learning materials and reach out to instructors anytime.' },
            { title: 'Certification', icon: <FaGraduationCap />, desc: 'Receive a verifiable digital and physical certificate upon successful completion of your professional course.' },
          ].map((feat, i) => (
            <div key={i} className="glass-card p-8 md:p-10 rounded-[32px] md:rounded-[40px] hover:-translate-y-2 transition-all duration-500 border-white/60 group">
              <div className="h-14 w-14 md:h-16 md:w-16 rounded-2xl bg-blue-50 text-[#0077ff] flex items-center justify-center text-2xl md:text-3xl mb-6 group-hover:bg-[#0077ff] group-hover:text-white transition-colors shadow-sm">
                {feat.icon}
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-slate-800 mb-3 md:mb-4 tracking-tight">{feat.title}</h3>
              <p className="text-sm md:text-base text-slate-500 leading-relaxed">{feat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. HOW IT WORKS */}
      <section className="relative mx-4 rounded-[40px] md:rounded-[50px] bg-white p-8 md:p-12 lg:p-20 shadow-2xl border border-slate-100">
        <div className="text-center space-y-3 md:space-y-4 mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-tight">Your Path to <span className="text-[#0077ff]">Success</span></h2>
          <p className="text-sm md:text-lg text-slate-500">Follow these simple steps to kickstart your career.</p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 relative">
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-1 bg-blue-50 -translate-y-1/2 -z-10"></div>
          
          {[
            { step: '01', title: 'Register Online', desc: 'Fill out our simple admission form from the comfort of your home.' },
            { step: '02', title: 'Get Counseled', desc: 'Our experts will guide you to choose the best course for your goals.' },
            { step: '03', title: 'Learn & Build', desc: 'Attend practical classes and build real-world projects.' },
            { step: '04', title: 'Get Certified', desc: 'Pass your final exams and receive your verifiable certificate.' },
          ].map((s, i) => (
            <div key={i} className="relative text-center space-y-3 md:space-y-4">
              <div className="h-16 w-16 md:h-20 md:w-20 mx-auto rounded-full bg-white border-4 border-[#0077ff] flex items-center justify-center text-xl md:text-2xl font-black text-[#0077ff] shadow-lg shadow-blue-100">
                {s.step}
              </div>
              <h3 className="text-lg md:text-xl font-bold text-slate-800 tracking-tight">{s.title}</h3>
              <p className="text-xs md:text-sm text-slate-500 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. TESTIMONIALS (Premium Slider) */}
      <section className="space-y-16">
        <div className="text-center space-y-4">
          <p className="text-blue-600 font-bold tracking-widest uppercase text-sm">Success Stories</p>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">What Our <span className="text-[#0077ff]">Students Say</span></h2>
        </div>

        <div className="max-w-4xl mx-auto relative px-4 sm:px-12">
          {/* Arrows */}
          <button 
            onClick={() => setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
            className="absolute -left-2 sm:left-0 top-1/2 -translate-y-1/2 h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-white shadow-xl flex items-center justify-center text-blue-600 hover:bg-blue-600 hover:text-white transition-all z-20 group"
          >
            <FaChevronLeft className="group-hover:scale-110 transition-transform" />
          </button>
          
          <button 
            onClick={() => setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)}
            className="absolute -right-2 sm:right-0 top-1/2 -translate-y-1/2 h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-white shadow-xl flex items-center justify-center text-blue-600 hover:bg-blue-600 hover:text-white transition-all z-20 group"
          >
            <FaChevronRight className="group-hover:scale-110 transition-transform" />
          </button>

          <div className="overflow-hidden rounded-[40px] p-2">
            <div 
              className="flex transition-transform duration-700 cubic-bezier(0.4, 0, 0.2, 1)"
              style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}
            >
              {testimonials.map((t, i) => (
                <div key={i} className="w-full shrink-0 px-2 sm:px-4">
                  <div className="glass-card p-10 md:p-16 rounded-[40px] relative mt-12 text-center flex flex-col items-center border-white/60">
                    <div className="absolute -top-12 h-24 w-24 rounded-full border-4 border-white overflow-hidden shadow-2xl">
                      <img src={`https://i.pravatar.cc/150?img=${i+30}`} alt={t.name} className="w-full h-full object-cover" />
                    </div>
                    <FaQuoteLeft className="text-blue-100 text-6xl absolute top-10 left-10 opacity-30" />
                    <div className="pt-6 space-y-6 relative z-10">
                      <div className="flex justify-center text-yellow-400 text-lg">
                        {[...Array(5)].map((_, i) => <FaStar key={i} />)}
                      </div>
                      <p className="text-slate-600 leading-relaxed text-lg sm:text-xl md:text-2xl font-medium italic">
                        "{t.review}"
                      </p>
                      <div className="pt-6 border-t border-slate-100 w-1/2 mx-auto">
                        <h4 className="font-black text-slate-900 text-xl tracking-tight">{t.name}</h4>
                        <p className="text-sm font-bold text-[#0077ff] uppercase tracking-widest mt-1">{t.course}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-3 mt-8">
            {testimonials.map((_, i) => (
              <button 
                key={i} 
                onClick={() => setCurrentTestimonial(i)}
                className={`h-2.5 rounded-full transition-all duration-500 ${currentTestimonial === i ? 'w-10 bg-blue-600 shadow-lg shadow-blue-200' : 'w-2.5 bg-blue-200 hover:bg-blue-300'}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 6. FAQ SECTION */}
      <section className="mx-4 glass-card rounded-[40px] md:rounded-[50px] p-8 md:p-12 lg:p-20 border-white/60">
        <div className="text-center space-y-4 mb-12 md:mb-16">
          <FaQuestionCircle className="text-4xl md:text-5xl text-[#0077ff] mx-auto mb-2 md:mb-4" />
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Frequently Asked <span className="text-[#0077ff]">Questions</span></h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-4 md:space-y-6">
          {[
            { q: 'Do I need prior experience to join?', a: 'Not at all! Our courses are designed for beginners. We start from the basics and take you to an advanced professional level.' },
            { q: 'Are the certificates verifiable?', a: 'Yes, every certificate issued by Markhor Institute has a unique Serial Number that can be verified online through our portal.' },
            { q: 'Is there any job guarantee?', a: 'We provide 100% job placement assistance, interview preparation, and portfolio building, which highly increases your chances of getting hired.' },
            { q: 'Can I access lectures online?', a: 'Yes! Registered students get access to our Student Portal where they can find study materials, attempt quizzes, and check their progress.' },
          ].map((faq, i) => (
            <div key={i} className="bg-white p-5 md:p-6 rounded-2xl md:rounded-3xl shadow-sm border border-slate-100 hover:border-blue-200 transition-colors">
              <h3 className="text-base md:text-lg font-bold text-slate-800 flex items-center gap-3">
                <FaCheckCircle className="text-[#0077ff] shrink-0" /> {faq.q}
              </h3>
              <p className="text-sm md:text-base text-slate-500 mt-2 pl-7">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 7. CTA SECTION */}
      <section className="relative mx-4 rounded-[40px] md:rounded-[50px] bg-slate-900 p-10 md:p-16 lg:p-24 overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 md:w-96 md:h-96 bg-blue-500/20 blur-[80px] md:blur-[100px] rounded-full"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 md:w-96 md:h-96 bg-purple-500/10 blur-[80px] md:blur-[100px] rounded-full"></div>
        
        <div className="relative z-10 text-center max-w-3xl mx-auto space-y-8 md:space-y-10">
          <h2 className="text-3xl xs:text-4xl md:text-5xl lg:text-7xl font-black text-white leading-[1.2] tracking-tight">
            Ready to start your <br /> <span className="text-[#0077ff]">Success Story?</span>
          </h2>
          <p className="text-slate-400 text-base md:text-xl px-2">
            Limited seats available for the upcoming 2026 Batch. Don't miss your chance to be a part of the most trusted institute.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/registration" className="w-full sm:w-auto px-10 py-5 md:px-12 md:py-6 rounded-full bg-white text-slate-900 font-black text-lg md:text-xl hover:scale-105 transition-transform shadow-xl">
              Apply Now Online
            </Link>
            <Link to="/contact" className="w-full sm:w-auto px-10 py-5 md:px-12 md:py-6 rounded-full bg-transparent border-2 border-slate-700 text-white font-black text-lg md:text-xl hover:bg-slate-800 transition-colors text-center">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
