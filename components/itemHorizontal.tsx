import Image from 'next/image'
import Link from 'next/link'
import { OnClickButton } from './buttons'

export default function ItemHorizontal({
  item,
  image,
  url,
  season,
  handleClick,
}) {
  return (
    <div className="grid md:grid-cols-6 gap-4 p-4 bg-accent rounded-2xl">
      <div className="col-span-2 md:col-span-1">
        {url ? (
          <Link href={url}>
            <a>
              <Image
                src={`https://image.tmdb.org/t/p/w1280/${image}`} //185x278
                alt={`${item.name} poster`}
                width={1280}
                height={720}
              />
            </a>
          </Link>
        ) : (
          <Image
            src={`https://image.tmdb.org/t/p/w1280/${image}`} //185x278
            alt={`${item.title} poster`}
            width={256}
            height={384}
          />
        )}
      </div>
      <div className="col-span-5">
        {url ? (
          <Link href={url}>
            <a>
              <h3>{`${season}x${item.episode_number} ${item.name}`}</h3>
            </a>
          </Link>
        ) : (
          <h3>{item.title ? item.title : item.name}</h3>
        )}

        <p>
          {item.release_date
            ? `Release date: ${formatDate(item.release_date)}`
            : `Premiered: ${formatDate(item.air_date)}`}
        </p>
        <p>{item.overview}</p>
        {handleClick ? (
          <OnClickButton text="Add item" onClick={handleClick} />
        ) : (
          ''
        )}
      </div>
    </div>
  )
}

function formatDate(dateString) {
  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }
  return new Date(dateString).toLocaleString([], options)
}
