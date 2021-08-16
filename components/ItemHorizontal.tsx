import Image from 'next/image'
import Link from 'next/link'

export default function ItemHorizontal({ item, image, url }) {
  return (
    <div className="md:grid grid-cols-3 gap-4 p-4 bg-accent rounded-2xl">
      <Link href={url}>
        <a>
          <Image
            src={`https://image.tmdb.org/t/p/w1280/${image}`} //185x278
            alt={`${item.title ? item.title : item.name} poster`}
            width={1280}
            height={720}
          />
        </a>
      </Link>
      <div className="col-span-2">
        <Link href={url}>
          <a>
            <h3>{item.title ? item.title : item.name}</h3>
          </a>
        </Link>

        <p>
          Release date:{' '}
          {formatDate(item.release_date ? item.release_date : item.air_date)}
        </p>
        <p>{item.overview}</p>
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
