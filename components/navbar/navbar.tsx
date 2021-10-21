import Link from 'next/link'
import Image from 'next/image'
import { signIn, signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import ConditionalLink from '../../lib/ConditionalLink'

interface INavItemProps {
  link?: string
  icon?: string
  name?: string
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}

interface ISessionUser {
  name: string
  id: string
  image?: string
  email: string
}

const Navbar = (): JSX.Element => {
  const { data: session, status } = useSession()
  const router = useRouter()
  const user: ISessionUser = session?.user as ISessionUser

  useEffect(() => {
    if (status === 'authenticated' && !session?.initialized && router.pathname !== '/settings/account') {
      fetch(`/api/users/${session.user.id}`)
        .then((res) => res.json())
        .then((res) => !res.initialized && router.push('/settings/account'))
    }
  }, [router, session, status])

  return (
    <nav className="bg-primary p-4 border-b-2 border-solid border-accent no-underline">
      <ul className="flex items-center align-middle justify-end gap-1">
        <li className="inline-block mr-auto">
          <Link href="/">
            <a className="no-underline">project-argus</a>
          </Link>
        </li>

        <NavItem link="/shows" name="Shows" />
        <NavItem link="/movies" name="Movies" />
        {status === 'authenticated' ? (
          <>
            <NavItem link={`/users/${user.name}`} icon={user?.image ? user.image : '/assets/icons/person.svg'} />
            <NavItem link="/settings/account" icon={'/assets/icons/settings.svg'} />
            <NavItem icon="/assets/icons/signout.svg" onClick={() => signOut()} />
          </>
        ) : (
          <NavItem icon="/assets/icons/signin.svg" onClick={() => signIn()} />
        )}
      </ul>
    </nav>
  )
}

const NavItem = (props: INavItemProps): JSX.Element => {
  return (
    <ConditionalLink href={props.link} condition={props.link}>
      <li className="">
        {props.icon ? (
          <span
            className="text-text-color no-underline icon-button h-8 w-8 bg-accent hover:bg-bg-hover rounded-2xl p-1 flex items-center justify-center cursor-pointer"
            onClick={props.onClick}
          >
            <Image src={props.icon} alt="Sign in svg" width="20px" height="20px" />
          </span>
        ) : (
          <span className="text-text-color no-underline hover:bg-accent p-2 rounded-2xl">{props.name}</span>
        )}
      </li>
    </ConditionalLink>
  )
}

export default Navbar
