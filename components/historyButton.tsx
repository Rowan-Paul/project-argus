import { useState } from 'react'
import { signIn, useSession } from 'next-auth/client'
import { mutate } from 'swr'

export default function AddToHistoryButton({ type, id, data, error }) {
  const [session, loadingSession] = useSession()
  const [loading, setLoading] = useState(false)
  const [addToHistoryError, setError] = useState(false)
  const [added, setAdded] = useState(false)

  const handleClick = () => {
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
      <div className="text-white bg-black bg-opacity-75 text-xs p-4 m-2 inline-block">
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
      <p className="text-white bg-black bg-opacity-75 text-xs p-4 m-2 inline-block divide-x-2  divide-solid">
        <span>✔Watched</span>
        <span
          className="ml-2 pl-2 cursor-pointer"
          onClick={() => handleClick()}
        >
          ➕
        </span>
      </p>
    )
  }

  return (
    <div
      className="text-white bg-black bg-opacity-75 text-xs p-4 m-2 cursor-pointer inline-block"
      onClick={() => handleClick()}
    >
      ➕Add to history
    </div>
  )
}
