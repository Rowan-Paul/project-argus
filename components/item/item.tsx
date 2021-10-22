import Link from 'next/link'
import Image from 'next/image'
import { titleCase } from '../../lib/utils'

interface IItemProps {
  url: string
  image?: string
  title: string
  subtitle?: string
}

const Item = (props: IItemProps): JSX.Element => {
  return (
    <Link href={props.url}>
      <a className="text-center no-underline bg-accent rounded-b-xl pb-2">
        {props.image ? (
          <Image src={props.image} alt="Poster" width="185px" height="272px" />
        ) : (
          <div style={{ height: '272px', width: '185px' }} />
        )}
        {props.subtitle && <span className="text-xs">{props.subtitle}</span>}
        <span className="block px-2">{titleCase(props.title)}</span>
      </a>
    </Link>
  )
}

export default Item
