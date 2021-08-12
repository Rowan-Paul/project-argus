import { signIn } from 'next-auth/client'
import { useState } from 'react'
import { mutate } from 'swr'
import BackgroundOverlay from './backgroundOverlay'
import HistoryAddSpecific from './historyAddSpecific'

export default function HistoryAddNew({ type, id, session }) {
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
      <BackgroundOverlay onClick={() => {}} icon="Pending" text="Loading..." />
    )
  }
  if (error) {
    return (
      <BackgroundOverlay
        onClick={() => {}}
        icon="Error"
        text="Something went wrong..."
      />
    )
  }

  return (
    <BackgroundOverlay
      onClick={addToHistory}
      icon="AddPlaylist"
      text="Add to history"
    />
  )
}
