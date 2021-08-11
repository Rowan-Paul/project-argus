import { useState } from 'react'
import { signIn, useSession } from 'next-auth/client'
import { mutate } from 'swr'
import HistoryList from './historyList'
import { AddIcon, AddPlaylistIcon, CheckIcon } from '../lib/materialIcons'

export default function History({ type, id, data, error }) {
  const [session, loadingSession] = useSession()
  const [loading, setLoading] = useState(false)
  const [addToHistoryError, setError] = useState(false)
  const [added, setAdded] = useState(false)

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
            setAdded(true)
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
      <div className="text-white bg-black bg-opacity-50 text-xs p-3 m-2 inline-block">
        Loading...
      </div>
    )
  }

  if (addToHistoryError) {
    return (
      <p className="text-red-700 font-bold ml-5">Something went wrong...</p>
    )
  }

  if (added || data?.length > 0) {
    return (
      <div className="text-white bg-black bg-opacity-75 text-xs p-3 m-2 inline-block divide-x-2 divide-solid">
        <span>
          <CheckIcon center={true} /> Watched {data?.length} times
        </span>
        <span className="ml-2 pl-2 cursor-pointer" onClick={addToHistory}>
          <AddPlaylistIcon center={true} />
        </span>
        <HistoryList history={data} />
      </div>
    )
  }

  return (
    <div
      className="text-white bg-black bg-opacity-50 text-xs p-3 m-2 cursor-pointer inline-block"
      onClick={addToHistory}
    >
      <AddPlaylistIcon center={true} /> Add to history
    </div>
  )
}
