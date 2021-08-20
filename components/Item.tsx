import Link from 'next/link'

export default function Item({ title, url, image }) {
  return (
    <Link href={url}>
      <a className="text-center no-underline flex align-middle justify-center bg-accent">
        <div
          style={{
            background: `url(${tmdbUrlify(image)}) no-repeat center center`,
          }}
          className="h-poster-1/2 w-poster-1/2 md:h-poster-3/4 md:w-poster-3/4 lg:h-poster-90 lg:w-poster-90 bg-black"
        >
          <span className="line-clamp-2 md:line-clamp-1 text-white bg-black bg-opacity-50 text-xs px-3 py-2 bottom-0 block">
            {title}
          </span>
        </div>
      </a>
    </Link>
  )
}

function tmdbUrlify(image) {
  if (image?.indexOf('/') === 0) {
    return `https://image.tmdb.org/t/p/w185/${image}`
  } else {
    return image
  }
}
