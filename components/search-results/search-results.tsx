import { useRouter } from 'next/router'
import { useState } from 'react'
import ItemHorizontal from '../item-horizontal/item-horizontal'
import Loading from '../loading/loading'

interface ISearchResultsProps {}

const SearchResults = (props: any): JSX.Element => {
  const [loading, setLoading] = useState<boolean>()
  const [error, setError] = useState<boolean>()
  const router = useRouter()

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

  if (loading) {
    return <Loading />
  }
  if (error) {
    return <p className="text-red-400">Failed to add</p>
  }

  return (
    <div className="grid lg:grid-cols-2 gap-6 mt-2">
      {Object.values(props.results)
        .slice(0, 6)
        .map((item: any) => (
          <ItemHorizontal
            key={item.poster_path}
            item={item}
            image={item.poster_path}
            handleClick={() => handleClick(item)}
          />
        ))}
    </div>
  )
}

export default SearchResults
