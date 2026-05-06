import { Link } from 'react-router-dom'
import { 
  FaRocket, FaRegLightbulb, FaHeart, FaUsers, FaSearch, 
  FaGraduationCap, FaCheckCircle, FaBuilding, FaHandshake, 
  FaTrophy, FaLaptopCode, FaMapMarkerAlt, FaGlobe 
} from 'react-icons/fa'

const About = () => {
  return (
    <div className="space-y-32 py-20 overflow-hidden font-sans">
      
      {/* 1. Mission & Vision */}
      <section className="grid gap-8 md:grid-cols-2 animate-slide-up">
        {/* Mission */}
        <div className="rounded-[40px] p-12 bg-[#2b5aed] text-white shadow-xl shadow-blue-200">
          <div className="h-16 w-16 rounded-2xl bg-white/20 flex items-center justify-center text-3xl mb-8">
            <FaRocket />
          </div>
          <h2 className="text-4xl font-black mb-6">Our Mission</h2>
          <p className="text-blue-100 text-lg leading-relaxed mb-8">
            To empower youth with professional competence, digital literacy, and career-oriented expertise, enabling them to achieve financial independence and long-term success.
          </p>
          <ul className="space-y-3 text-sm font-bold text-white/90">
            <li className="flex items-center gap-3"><FaCheckCircle className="text-blue-300"/> Professional Competence</li>
            <li className="flex items-center gap-3"><FaCheckCircle className="text-blue-300"/> Digital Literacy</li>
            <li className="flex items-center gap-3"><FaCheckCircle className="text-blue-300"/> Career-Oriented Expertise</li>
            <li className="flex items-center gap-3"><FaCheckCircle className="text-blue-300"/> Financial Independence</li>
          </ul>
        </div>

        {/* Vision */}
        <div className="rounded-[40px] p-12 bg-[#00a8cc] text-white shadow-xl shadow-cyan-200">
          <div className="h-16 w-16 rounded-2xl bg-white/20 flex items-center justify-center text-3xl mb-8">
            <FaRegLightbulb />
          </div>
          <h2 className="text-4xl font-black mb-6">Our Vision</h2>
          <p className="text-cyan-50 text-lg leading-relaxed mb-8">
            To become the most trusted and leading career development institute in Sahiwal, producing skilled professionals capable of competing in both national and international markets.
          </p>
          <ul className="space-y-3 text-sm font-bold text-white/90">
            <li className="flex items-center gap-3"><FaCheckCircle className="text-cyan-200"/> Most Trusted Institute in Sahiwal</li>
            <li className="flex items-center gap-3"><FaCheckCircle className="text-cyan-200"/> National & International Competence</li>
            <li className="flex items-center gap-3"><FaCheckCircle className="text-cyan-200"/> Career Development Excellence</li>
            <li className="flex items-center gap-3"><FaCheckCircle className="text-cyan-200"/> Skilled Professional Production</li>
          </ul>
        </div>
      </section>

      {/* 2. Core Values */}
      <section className="space-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-black text-slate-900">Our Core Values</h2>
          <p className="text-slate-500 text-lg">The principles that guide everything we do</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {[
            { title: 'Excellence', icon: <FaHeart />, color: 'text-red-500', bg: 'bg-red-50', desc: 'We strive for excellence in everything we do, maintaining the highest standards in education', bullets: ['Quality First', 'Continuous Improvement', 'Benchmarking'] },
            { title: 'Innovation', icon: <FaRocket />, color: 'text-orange-500', bg: 'bg-orange-50', desc: 'Embracing new technologies and modern teaching methods to stay ahead of the curve', bullets: ['Tech Integration', 'Creative Thinking', 'Future Readiness'] },
            { title: 'Community', icon: <FaUsers />, color: 'text-blue-500', bg: 'bg-blue-50', desc: 'Building a supportive learning community where everyone grows together', bullets: ['Collaborative Learning', 'Mentorship', 'Alumni Network'] },
            { title: 'Integrity', icon: <FaSearch />, color: 'text-indigo-500', bg: 'bg-indigo-50', desc: 'Maintaining highest ethical standards in all our interactions and operations', bullets: ['Transparency', 'Accountability', 'Honesty'] }
          ].map((v, i) => (
            <div key={i} className="bg-[#f8fafc] rounded-[32px] p-8 hover:-translate-y-2 transition-transform shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
              <div className={`h-12 w-12 rounded-xl flex items-center justify-center text-xl mb-6 ${v.bg} ${v.color}`}>
                {v.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{v.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-6 h-20">{v.desc}</p>
              <ul className="space-y-2">
                {v.bullets.map((b, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-xs font-bold text-slate-600">
                    <span className={`h-1.5 w-1.5 rounded-full bg-current ${v.color}`}></span> {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Leadership */}
      <section className="space-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-black text-slate-900">Meet Our Leadership</h2>
          <p className="text-slate-500 text-lg">Experienced professionals dedicated to your success</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {[
            { name: 'Dr. Ahmed Khan', role: 'Director & Founder', qual: 'PhD in Education, Harvard University', exp: '25+ years Experience', tag: 'Educational Leadership', color: 'bg-[#2b5aed]' },
            { name: 'Prof. Sarah Ali', role: 'Academic Head', qual: 'M.Phil Computer Science, MIT', exp: '15+ years Experience', tag: 'Curriculum Development', color: 'bg-[#1d4ed8]' },
            { name: 'Eng. Hassan Raza', role: 'Technical Lead', qual: 'MS Software Engineering, Stanford', exp: '12+ years Experience', tag: 'Full Stack Development', color: 'bg-[#10b981]' },
            { name: 'Dr. Fatima Malik', role: 'Research Head', qual: 'PhD Management Sciences', exp: '18+ years Experience', tag: 'Educational Research', color: 'bg-[#ec4899]' }
          ].map((l, i) => (
            <div key={i} className="bg-white rounded-[32px] p-8 text-center shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 hover:shadow-xl transition-shadow">
              <div className={`h-24 w-24 mx-auto rounded-full flex items-center justify-center text-white text-4xl mb-6 ${l.color}`}>
                <FaGraduationCap />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-1">{l.name}</h3>
              <p className="text-[#0077ff] text-xs font-bold uppercase tracking-wider mb-3">{l.role}</p>
              <p className="text-slate-500 text-xs mb-2">{l.qual}</p>
              <p className="text-blue-600 bg-blue-50 inline-block px-3 py-1 rounded-full text-[10px] font-bold mb-6">{l.exp}</p>
              <p className="text-slate-600 text-xs font-semibold">{l.tag}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Our Story */}
      <section className="space-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-black text-slate-900">Our Story</h2>
        </div>

        <div className="bg-white rounded-[40px] p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
          <p className="text-slate-600 leading-relaxed text-center max-w-4xl mx-auto mb-12">
            Markhor Institute was founded in 2015 by Dr. Ahmed Khan and Prof. Sarah Ali with a vision to revolutionize vocational education in Pakistan. Starting from a small classroom with just 50 students, we have grown into one of the premier technical education institutes in the region.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-[#f8fafc] rounded-[24px] p-8 border border-slate-100">
              <h3 className="text-xl font-bold text-slate-900 mb-1">Dr. Ahmed Khan</h3>
              <p className="text-[#0077ff] text-sm font-bold mb-4">Founder & Chairman</p>
              <p className="text-slate-500 text-xs mb-6">PhD in Education from Harvard University. 20+ years in educational leadership.</p>
              <div className="bg-white p-4 rounded-xl text-slate-600 text-xs italic border border-slate-100">
                "Democratizing quality education for all socioeconomic backgrounds."
              </div>
            </div>
            <div className="bg-[#f8fafc] rounded-[24px] p-8 border border-slate-100">
              <h3 className="text-xl font-bold text-slate-900 mb-1">Prof. Sarah Ali</h3>
              <p className="text-[#0077ff] text-sm font-bold mb-4">Co-founder & Director</p>
              <p className="text-slate-500 text-xs mb-6">M.Phil Computer Science from MIT. Former Head of Software Engineering at TechCorp.</p>
              <div className="bg-white p-4 rounded-xl text-slate-600 text-xs italic border border-slate-100">
                "Bridging the gap between academia and industry requirements."
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="relative max-w-3xl mx-auto py-10">
            {/* Center Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-blue-200 -translate-x-1/2"></div>
            
            <div className="space-y-12">
              {[
                { year: '2015', title: 'Institute Founded', desc: 'Started with 2 classrooms and 50 students in Lahore', icon: <FaBuilding />, align: 'left' },
                { year: '2016', title: 'First Industry Partnership', desc: 'Collaborated with 5 leading tech companies', icon: <FaHandshake />, align: 'right' },
                { year: '2017', title: 'Campus Expansion', desc: 'Moved to 10,000 sq ft purpose-built campus', icon: <FaBuilding />, align: 'left' },
                { year: '2019', title: 'International Recognition', desc: 'Awarded "Best Technical Institute" by Education Excellence', icon: <FaTrophy />, align: 'right' },
                { year: '2021', title: 'Digital Transformation', desc: 'Launched online platform serving 1000+ remote students', icon: <FaLaptopCode />, align: 'left' },
                { year: '2023', title: 'Regional Expansion', desc: 'Opened branches in Karachi and Islamabad', icon: <FaMapMarkerAlt />, align: 'right' },
                { year: '2024', title: 'Global Partnerships', desc: 'Collaborations with universities in UK and Canada', icon: <FaGlobe />, align: 'left' }
              ].map((item, i) => (
                <div key={i} className={`relative flex items-center justify-between w-full ${item.align === 'left' ? 'flex-row-reverse' : ''}`}>
                  {/* Empty space for one side */}
                  <div className="w-5/12"></div>
                  
                  {/* Timeline Dot */}
                  <div className="absolute left-1/2 -translate-x-1/2 h-8 w-8 rounded-full bg-white border-4 border-[#0077ff] flex items-center justify-center z-10">
                    <div className="h-2 w-2 rounded-full bg-[#0077ff]"></div>
                  </div>

                  {/* Content Card */}
                  <div className="w-5/12">
                    <div className={`bg-white rounded-2xl p-6 shadow-lg border border-slate-100 ${item.align === 'left' ? 'text-right' : 'text-left'}`}>
                      <div className={`flex items-center gap-2 text-[#0077ff] font-black text-lg mb-2 ${item.align === 'left' ? 'justify-end' : ''}`}>
                        {item.icon} {item.year}
                      </div>
                      <h4 className="font-bold text-slate-900 text-sm mb-1">{item.title}</h4>
                      <p className="text-xs text-slate-500">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Box matching contact us request */}
      <section className="bg-slate-900 rounded-[40px] p-12 text-center text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500/20 blur-[80px] rounded-full"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-500/20 blur-[80px] rounded-full"></div>
        <div className="relative z-10 space-y-6 max-w-2xl mx-auto">
          <h2 className="text-4xl font-black">Want to know more?</h2>
          <p className="text-slate-300 text-lg">Reach out to us directly to get guidance on your career path.</p>
          <div className="pt-4">
            <Link to="/contact" className="px-10 py-4 rounded-xl bg-[#0077ff] text-white font-black text-lg hover:bg-blue-600 transition-colors inline-block">
              Contact Us Today
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
