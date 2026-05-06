const Loader = ({ fullPage = false }) => (
  <div className={`flex items-center justify-center ${fullPage ? 'min-h-screen' : 'py-8'}`}>
    <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#1e3a5f] border-t-transparent" />
  </div>
)

export default Loader
