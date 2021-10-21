import Link from 'next/link'
import Image from 'next/image'
import { signIn, signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React, { useRef, useEffect, useState } from 'react'
import ConditionalLink from '../../lib/ConditionalLink'

interface INavItemProps {
  link?: string
  icon?: string
  name?: string
  dropdownItems?: dropdownItem[]
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}

interface dropdownItem {
  name: string
  link: string
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

        <NavItem
          name="Shows"
          dropdownItems={[
            { name: 'Discover', link: '/shows' },
            { name: 'Search', link: '/shows/search' },
          ]}
        />
        <NavItem
          name="Movies"
          dropdownItems={[
            { name: 'Discover', link: '/movies' },
            { name: 'Search', link: '/movies/search' },
          ]}
        />
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
  const [isOpen, setIsOpen] = useState<boolean>()
  const handleClick = () => {
    setIsOpen(!isOpen)
  }

  const dropdown = useRef(null)
  useOutsideAlerter(dropdown)

  function useOutsideAlerter(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setIsOpen(false)
        }
      }

      document.addEventListener('mousedown', handleClickOutside)
      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }, [ref])
  }

  return (
    <li ref={dropdown}>
      {props.icon ? (
        <ConditionalLink href={props.link} condition={props.link}>
          <span
            className="text-text-color no-underline icon-button h-8 w-8 bg-accent hover:bg-bg-hover rounded-2xl p-1 flex items-center justify-center cursor-pointer"
            onClick={props.onClick}
          >
            <Image src={props.icon} alt="Icon" width="20px" height="20px" />
          </span>
        </ConditionalLink>
      ) : (
        <>
          <span className={`flex align-middle text-text-color no-underline p-2 cursor-pointer`} onClick={handleClick}>
            {props.name}
            {props.dropdownItems && (
              <Image
                src="/assets/icons/expand-more.svg"
                alt="Dropdown icon"
                width="20px"
                height="20px"
                className={isOpen ? 'dropdownOpen' : 'dropdown'}
              />
            )}
          </span>
          {props.dropdownItems && (
            <span
              className={`absolute bg-accent rounded-b-2xl overflow-hidden z-50 ${
                isOpen ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {props.dropdownItems.map((item) => (
                <Link href={item.link} key={item.name}>
                  <a className="no-underline" onClick={() => setIsOpen(false)}>
                    <div className="p-3 hover:bg-bg-hover">{item.name}</div>
                  </a>
                </Link>
              ))}
            </span>
          )}
        </>
      )}
    </li>
  )
}

export default Navbar
