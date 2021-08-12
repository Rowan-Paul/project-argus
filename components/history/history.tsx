import useSWR from 'swr'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/client'
import { arraysEqual } from '../../lib/utils'
import OverviewNew from './overviewNew'
import BackgroundOverlay from '../backgroundOverlay'
import OverviewExisting from './overviewExisting'

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
      <BackgroundOverlay onClick={() => {}} icon="Pending" text="Loading..." />
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
