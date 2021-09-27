import Link from 'next/link'
import Image from 'next/image'

interface IItemProps {
  url: string
  image: string
  title: string
}

const Item = (props: IItemProps): JSX.Element => {
  return (
    <Link href={props.url}>
      <a className="text-center no-underline bg-accent rounded-b-xl pb-2">
        {props.image ? (
          <Image src={tmdbUrlify(props.image)} alt="Poster" width="185px" height="272px" />
        ) : (
          <div style={{ height: '272px', width: '185px' }} />
        )}
        <span>{props.title}</span>
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

export default Item
