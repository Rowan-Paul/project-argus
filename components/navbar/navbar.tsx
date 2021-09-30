import Link from 'next/link'
import Image from 'next/image'
import { signIn, signOut, useSession } from 'next-auth/react'

interface INavItemProps {
  link?: string
  icon: string
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
  const user: ISessionUser = session?.user as ISessionUser

  return (
    <nav className="bg-primary p-4 border-b-2 border-solid border-accent no-underline">
      <ul className="flex items-center align-middle justify-end">
        <li className="inline-block mr-auto">
          <Link href="/">
            <a className="no-underline">project-argus</a>
          </Link>
        </li>

        {status === 'authenticated' ? (
          <>
            <NavItem link={`/users/${user.name}`} icon={user?.image ? user.image : '/assets/svg/person.svg'} />
            <NavItem link="/settings/account" icon={'/assets/svg/settings.svg'} />
            <NavItem icon="/assets/svg/signout.svg" onClick={() => signOut()} />
          </>
        ) : (
          <NavItem icon="/assets/svg/signin.svg" onClick={() => signIn()} />
        )}
      </ul>
    </nav>
  )
}

const NavItem = (props: INavItemProps): JSX.Element => {
  if (props.link) {
    return (
      <li className="w-10 flex items-center justify-center">
        <Link href={props.link}>
          <a className="text-text-color no-underline icon-button h-8 w-8 bg-accent hover:bg-bg-hover rounded-2xl p-1 m-1 flex items-center justify-center cursor-pointer">
            <Image src={props.icon} alt="Sign in svg" width="20px" height="20px" />
          </a>
        </Link>
      </li>
    )
  }

  return (
    <li className="w-10 flex items-center justify-center">
      <span
        className="text-text-color no-underline icon-button h-8 w-8 bg-accent hover:bg-bg-hover rounded-2xl p-1 m-1 flex items-center justify-center cursor-pointer"
        onClick={props.onClick}
      >
        <Image src={props.icon} alt="Sign in svg" width="20px" height="20px" />
      </span>
    </li>
  )
}

export default Navbar
