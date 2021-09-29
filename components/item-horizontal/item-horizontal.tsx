import Image from 'next/image'
import Link from 'next/link'

interface IItemHorizontalProps {
  item: {
    name?: string
    title?: string
    episode_number?: number
    release_date?: string
    air_date?: string
    overview?: string
  }
  image: string
  season?: number
  url?: string
  handleClick?: React.MouseEventHandler<HTMLButtonElement>
}

const ItemHorizontal = (props: IItemHorizontalProps): JSX.Element => {
  return (
    <div className="grid md:grid-cols-6 gap-4 p-4 bg-accent rounded-2xl">
      <div className="col-span-2">
        {props.url ? (
          <Link href={props.url}>
            <a>
              <Image
                src={`https://image.tmdb.org/t/p/w1280/${props.image}`}
                alt={`${props.item?.name} poster`}
                width={1280}
                height={720}
              />
            </a>
          </Link>
        ) : (
          <Image
            src={`https://image.tmdb.org/t/p/w1280/${props.image}`}
            alt={`${props.item?.title} poster`}
            width={256}
            height={384}
          />
        )}
      </div>
      <div className="col-span-4">
        {props.url ? (
          <Link href={props.url}>
            <a>
              <h3>{`${props?.season}x${props.item?.episode_number} ${props.item?.name}`}</h3>
            </a>
          </Link>
        ) : (
          <h3>{props.item?.title ? props.item.title : props.item?.name}</h3>
        )}

        <p>
          {props.item?.release_date
            ? `Release date: ${formatDate(props.item.release_date)}`
            : `Premiered: ${formatDate(props.item?.air_date)}`}
        </p>
        <p>{props.item?.overview}</p>
      </div>
      {props.handleClick ? (
        <div className="flex flex-col text-center justify-center">
          <span onClick={props.handleClick} className="p-5 rounded-lg cursor-pointer text-white bg-blue-400">
            Add movie
          </span>
        </div>
      ) : (
        ''
      )}
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

export default ItemHorizontal
