import useSWR from 'swr'
import { useSession } from 'next-auth/client'
import History from './history'

const fetcher = (...args) => fetch(...args).then((res) => res.json())

export default function Backdrop({ path, id, type }) {
  const [session, loadingSession] = useSession()
  const { data, error } = useSWR(
    `/api/history/${session?.id}/${type}/${id}`,
    fetcher
  )

  return (
    <div
      style={{
        background: `url(${path}) no-repeat center center`,
        backgroundSize: 'cover',
        minHeight: '300px',
      }}
      className="min-h-439 md:col-span-2 md:rounded-xl lg:rounded-2xl"
    >
      <History type="movies" id={id} data={data} error={error} />
    </div>
  )
}
