import useSWR from 'swr'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/client'
import { arraysEqual } from '../../lib/utils'
import OverviewNew from './overviewNew'
import { BackdropOverlay } from '../backdrop'
import OverviewExisting from './overviewExisting'
import Loading from '../loading'

const fetcher = async (
  input: RequestInfo,
  init: RequestInit,
  ...args: any[]
) => {
  const res = await fetch(input, init)
  return res.json()
}

export default function History({ type, id }) {
  const [history, setHistory] = useState([])
  const [session, loading] = useSession()
  const { data, error } = useSWR(
    session ? `/api/history/${session?.id}/${type}/${id}` : null,
    fetcher
  )

  useEffect(() => {
    if (!arraysEqual(data, history) || data === undefined) {
      setHistory(data)
    }
  }, [data])

  if (loading) {
    return (
      <BackdropOverlay
        onClick={() => {}}
        icon=""
        text={
          <span className="w-6">
            <Loading small={true} />
          </span>
        }
      />
    )
  }

  if (history?.length > 0) {
    if (error && history?.length > 0) {
      setHistory([])
    }

    return (
      <OverviewExisting
        type={type}
        id={id}
        session={session}
        history={history}
      />
    )
  }

  return <OverviewNew type={type} id={id} session={session} />
}
