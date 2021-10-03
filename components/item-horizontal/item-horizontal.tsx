import Image from 'next/image'
import ConditionalLink from '../../lib/ConditionalLink'

interface IItemHorizontalProps {
  title: string
  name: string
  description: string
  subtitle: string
  image?: string
  url?: string
  handleClick?: React.MouseEventHandler<HTMLDivElement>
  type?: string
}

const ItemHorizontal = (props: IItemHorizontalProps): JSX.Element => {
  return (
    <ConditionalLink href={props.url} condition={props.url}>
      <div className="grid md:grid-cols-6 gap-4 p-4 bg-accent rounded-2xl">
        <div className="col-span-2">
          <Image
            src={`https://image.tmdb.org/t/p/w1280/${props.image}`}
            alt={`${props.name} poster`}
            width={props.url ? 1280 : 256}
            height={props.url ? 720 : 384}
          />
        </div>
        <div className="col-span-4">
          <h3>{props.title}</h3>

          <p>{props.subtitle}</p>
          <p className="line-clamp-6">{props.description}</p>
        </div>
        {props.handleClick && (
          <div className="col-span-6 p-5 bg-blue-700 cursor-pointer" onClick={props.handleClick}>
            Add {props.type}
          </div>
        )}
      </div>
    </ConditionalLink>
  )
}

export default ItemHorizontal
