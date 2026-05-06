const Loader = ({ fullPage = false, color = 'blue' }) => {
  const colorMap = {
    blue: 'border-[#2563eb]',
    purple: 'border-[#7c3aed]',
    green: 'border-[#16a34a]',
    gold: 'border-[#f5a623]',
  }

  const spinner = (
    <div
      className={`h-9 w-9 animate-spin rounded-full border-4 border-gray-200 border-t-transparent ${colorMap[color] || colorMap.blue}`}
    />
  )

  if (fullPage) return <div className="flex min-h-[60vh] items-center justify-center">{spinner}</div>
  return <div className="flex items-center justify-center p-4">{spinner}</div>
}

export default Loader
