import useSWR from 'swr'
import Loading from './loading'
import Item from './item'

const fetcher = async (
  input: RequestInfo,
  init: RequestInit,
  ...args: any[]
) => {
  const res = await fetch(input, init)
  return res.json()
}

export default function Discover({ url, type }) {
  const { data, error } = useSWR(url, fetcher)

  if (error) return <div>Failed to load</div>
  if (!data) {
    return (
      <>
        <h2 className="my-5">{type}</h2>
        <Loading small={false} />
      </>
    )
  }

  return (
    <div className="m-5 md:my-5">
      <h2>{type}</h2>
      <div className="p-6 mt-2 grid gap-6 grid-flow-col grid-cols-auto auto-cols-10 overflow-x-auto overflow-y-hidden scrollbar md:scrollbar-thin scrollbar-thumb-gray-400 hover:scrollbar-thumb-gray-700 scrollbar-track-white scrollbar-thumb-rounded-full bg-accent rounded-2xl">
        {Object.values(data.results).map((item: any) => (
          <Item
            key={item.title ? item.title : item.name}
            title={item.title ? item.title : item.name}
            url={`${item.title ? 'movies' : 'shows'}/${
              item.title
                ? item.title
                    .replace(/[^a-zA-Z0-9 !]+/g, '')
                    .replace(/\s+/g, '-')
                    .toLowerCase()
                : item.name
                    .replace(/[^a-zA-Z0-9 !]+/g, '')
                    .replace(/\s+/g, '-')
                    .toLowerCase()
            }-${
              item.release_date
                ? item.release_date.split('-')[0]
                : item.first_air_date.split('-')[0]
            }`}
            image={item.poster_path}
          />
        ))}
      </div>
    </div>
  )
}
