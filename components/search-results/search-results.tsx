import { useRouter } from 'next/router'
import { useState } from 'react'
import { titleCase } from '../../lib/utils'
import ItemHorizontal from '../item-horizontal/item-horizontal'
import Loading from '../loading/loading'

interface ISearchResultsProps {
  results: any[]
  button?: boolean
}

const SearchResults = (props: ISearchResultsProps): JSX.Element => {
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
    return (
      <div className="text-center">
        <Loading />
        <p>This might take a while</p>
      </div>
    )
  }
  if (error) {
    return <p className="text-red-400">Failed to add</p>
  }

  return (
    <div className="grid md:grid-cols-2 gap-6 mt-2">
      {Object.values(props.results).map((item: any) => (
        <ItemHorizontal
          key={item.poster_path + item.title}
          name={item.title ? item.title : item.name}
          title={titleCase(item.title ? item.title : item.name)}
          subtitle={
            item.release_date
              ? `Release date: ${formatDate(item.release_date)}`
              : item.first_air_date
              ? `Release date: ${formatDate(item.first_air_date)}`
              : ''
          }
          description={item.overview}
          image={item.poster_path}
          handleClick={props.button ? () => handleClick(item) : undefined}
          type={item.title ? 'movie' : 'show'}
          url={props.button ? undefined : `/${item.title ? `movies/${item.title}` : `shows/${item.name}`}-${item.year}`}
        />
      ))}
    </div>
  )
}

function formatDate(dateString) {
  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }
  // @ts-ignore
  return new Date(dateString).toLocaleString([], options)
}

export default SearchResults
