import { signIn } from 'next-auth/client'
import { useState } from 'react'
import { mutate } from 'swr'
import MaterialIcon from '../../lib/materialIcons'

export default function Add({ type, id, session, text }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const addToHistory = () => {
    if (!session) {
      signIn()
    } else {
      setLoading(true)
      fetch(`/api/history/${session.id}/${type}/${id}`, {
        method: 'POST',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: session.id,
        }),
      })
        .then((res) => {
          setLoading(false)
          if (res.status === 201) {
            mutate(`/api/history/${session.id}/${type}/${id}`)
          } else {
            setError(true)
          }
        })
        .catch((err) => {
          setLoading(false)
          setError(true)
        })
    }
  }

  if (loading) {
    return (
      <span className="pl-2">
        <MaterialIcon request="Pending" />
      </span>
    )
  }
  if (error) {
    console.log(error)
    return <span className="pl-2">Something went wrong...</span>
  }

  return (
    <span className="pl-2 cursor-pointer" onClick={addToHistory}>
      <MaterialIcon request="AddPlaylist" />
      {text ? ' Add to history' : ''}
    </span>
  )
}
