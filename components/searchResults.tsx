import useSWR from 'swr'
import { useState } from 'react'
import router from 'next/router'
import Loading from './loading'
import ItemHorizontal from './itemHorizontal'

const fetcher = async (
  input: RequestInfo,
  init: RequestInit,
  ...args: any[]
) => {
  const res = await fetch(input, init)
  return res.json()
}

export default function SearchResults({ url }) {
  const { data, error } = useSWR(url, fetcher)
  const [loading, setLoading] = useState(false)
  const [addError, setError] = useState(false)

  const handleClick = (item) => {
    setLoading(true)
    fetch(
      item.title
        ? `/api/movies/${item.title
            .replace(/[^a-zA-Z0-9 !]+/g, '')
            .replace(/\s+/g, '-')
            .toLowerCase()}-${item.release_date.split('-')[0]}`
        : `/api/shows/${item.name
            .replace(/[^a-zA-Z0-9 !]+/g, '')
            .replace(/\s+/g, '-')
            .toLowerCase()}-${item.first_air_date.split('-')[0]}`,
      {
        method: 'POST',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          overview: item.overview,
          tmdb: item.id,
        }),
      }
    )
      .then((res) => {
        if (res.status === 201) {
          item.title
            ? router.push(
                `/movies/${item.title
                  .replace(/[^a-zA-Z0-9 !]+/g, '')
                  .replace(/\s+/g, '-')
                  .toLowerCase()}-${item.release_date.split('-')[0]}`
              )
            : router.push(
                `/shows/${item.name
                  .replace(/[^a-zA-Z0-9 !]+/g, '')
                  .replace(/\s+/g, '-')
                  .toLowerCase()}-${item.first_air_date.split('-')[0]}`
              )
        } else {
          setLoading(false)
          setError(true)
        }
      })
      .catch((err) => {
        setLoading(false)
        setError(true)
      })
  }

  if (error) return <div>Failed to load</div>
  if (!data) {
    return (
      <>
        <h2 className="my-5">Results</h2>
        <Loading small={false} />
      </>
    )
  }

  return (
    <div className="my-5 text-left">
      <h2>Results</h2>
      <div className="grid gap-6 mt-2">
        {addError ? (
          <p>Error</p>
        ) : loading ? (
          <Loading small={false} />
        ) : (
          Object.values(data.results)
            .slice(0, 6)
            .map((item: any) => (
              <ItemHorizontal
                key={item.title ? item.title : item.name}
                item={item}
                image={item.poster_path}
                handleClick={() => handleClick(item)}
              />
            ))
        )}
      </div>
    </div>
  )
}
