const Toast = ({ toasts, removeToast }) => {
  const tone = {
    success: 'bg-green-600',
    error: 'bg-red-600',
    info: 'bg-blue-600',
  }

  return (
    <div className="fixed right-4 top-4 z-[110] space-y-2">
      {toasts.map((toast) => (
        <button
          key={toast.id}
          onClick={() => removeToast(toast.id)}
          className={`min-w-72 rounded-lg px-4 py-3 text-left text-sm font-medium text-white shadow-lg transition hover:opacity-95 ${tone[toast.type] || tone.info}`}
        >
          {toast.message}
        </button>
      ))}
    </div>
  )
}

export default Toast
