import { useEffect, useState } from 'react'
import api from '../../api/axios'

const PublicBooks = () => {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)

  const resolveUrl = (url) => {
    if (!url) return '#';
    if (url.startsWith('/uploads/')) return `http://localhost:5000${url}`;
    return url;
  }

  useEffect(() => {
    api.get('/public/books')
      .then((res) => setBooks(res.data))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="text-center py-20">Loading study material...</div>

  return (
    <div className="space-y-16 py-10">
      <div className="text-center space-y-4 animate-slide-up">
        <h1 className="text-5xl font-black text-slate-900 leading-tight">
          Study <span className="text-[#0077ff]">Material</span> Library
        </h1>
        <p className="text-slate-500 text-lg max-w-2xl mx-auto">
          Free access to our curated library of books, notes, and professional guides.
        </p>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {books.map((book, i) => (
          <div 
            key={book._id} 
            className="glass-card group flex flex-col rounded-[32px] p-6 hover:-translate-y-2 transition-all duration-300 border-white/60 animate-slide-up"
            style={{ animationDelay: `${i * 0.05}s` }}
          >
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-6 shadow-xl">
              <img 
                src={resolveUrl(book.thumbnail) || '/books.png'} 
                alt={book.title} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4">
                <span className="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider">
                  {book.category || 'General'}
                </span>
              </div>
            </div>

            <div className="flex-1 space-y-2">
              <h3 className="text-xl font-bold text-slate-800 leading-tight group-hover:text-[#0077ff] transition-colors line-clamp-2">
                {book.title}
              </h3>
              <p className="text-slate-400 text-xs font-medium italic">By {book.author || 'Markhor Institute'}</p>
            </div>

            <div className="mt-6">
              <a 
                href={resolveUrl(book.fileUrl)} 
                download
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 rounded-2xl bg-slate-900 py-4 text-white font-bold text-sm hover:bg-[#0077ff] transition-all shadow-lg"
              >
                <span>📥</span> Download PDF
              </a>
            </div>
          </div>
        ))}
      </div>

      {books.length === 0 && (
        <div className="text-center py-24 glass-card rounded-[40px] border-dashed border-2">
          <p className="text-slate-400 text-lg italic">Our library is being updated. Check back soon!</p>
        </div>
      )}
    </div>
  )
}

export default PublicBooks
