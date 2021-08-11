import { useEffect, useState } from 'react'
import { signIn, useSession } from 'next-auth/client'
import useSWR, { mutate } from 'swr'
import HistoryList from './historyList'
import MaterialIcon from '../lib/materialIcons'
import { arraysEqual } from '../lib/utils'

const fetcher = async (
  input: RequestInfo,
  init: RequestInit,
  ...args: any[]
) => {
  const res = await fetch(input, init)
  return res.json()
}

export default function History({ type, id }) {
  const [session, loadingSession] = useSession()
  const [loading, setLoading] = useState(false)
  const [addToHistoryError, setError] = useState(false)
  const [added, setAdded] = useState(false)
  const [history, setHistory] = useState([])
  const { data, error } = useSWR(
    `/api/history/${session?.id}/${type}/${id}`,
    fetcher
  )

  useEffect(() => {
    if (!arraysEqual(data, history) || data === undefined) {
      setHistory(data)
    }
  }, [data])

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

  if (added || history?.length > 0) {
    if (error && history?.length > 0) {
      setAdded(false)
      setHistory([])
    }

    return (
      <div className="text-white bg-black bg-opacity-75 text-xs p-3 m-2 inline-block divide-x-2 divide-solid">
        <MaterialIcon request="Check" /> Watched {history?.length} times
        <span className="ml-2 pl-2 cursor-pointer" onClick={addToHistory}>
          <MaterialIcon request="AddPlaylist" />
        </span>
        <HistoryList
          history={history}
          url={`/api/history/${session?.id}/${type}/${id}`}
        />
      </div>
    )
  }

  return (
    <div
      className="text-white bg-black bg-opacity-50 text-xs p-3 m-2 cursor-pointer inline-block"
      onClick={addToHistory}
    >
      <MaterialIcon request="AddPlaylist" /> Add to history
    </div>
  )
}
