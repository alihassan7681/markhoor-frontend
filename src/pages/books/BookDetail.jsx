import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../../api/axios'
import Loader from '../../components/Loader'

const BookDetail = () => {
  const { id } = useParams()
  const [item, setItem] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get(`/books/${id}`)
        setItem(res.data)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [id])

  if (loading) return <Loader />
  if (!item) return <div className="rounded-xl bg-white p-4 shadow-sm">Book not found.</div>

  return <div className="rounded-xl bg-white p-4 shadow-sm">{item.title}</div>
}

export default BookDetail
