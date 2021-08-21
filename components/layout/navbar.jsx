import Link from 'next/link'
import Image from 'next/image'
import { useSession } from 'next-auth/client'
import { useState, useEffect, useRef } from 'react'
import { CSSTransition } from 'react-transition-group'
import MaterialIcon from '../../lib/materialIcons'

export default function NavbarUI() {
  const [session, loading] = useSession()

  return (
    <Navbar>
      <NavItem icon={<MaterialIcon request="Home" />} url="/" />
      {session ? (
        <>
          <NavItem
            icon={
              session.user?.image ? (
                <Image
                  src={session.user?.image}
                  alt="Profile picture"
                  width={32}
                  height={32}
                />
              ) : (
                <MaterialIcon request="Person" />
              )
            }
            url={`/users/${session.user?.name}`}
          />
          <NavItem icon={<MaterialIcon request="Settings" />}>
            <DropdownMenu></DropdownMenu>
          </NavItem>
        </>
      ) : (
        <NavItem
          icon={<MaterialIcon request="SignIn" />}
          url="/api/auth/signin"
        />
      )}
    </Navbar>
  )
}

function Navbar(props) {
  return (
    <>
      <nav className="h-16 bg-primary p-1 border-b-2 border-solid border-accent">
        <ul className="list-none m-0 p-0 max-w-full h-full flex items-center align-middle justify-end">
          <Link href="/">
            <a className="no-underline text-text-color ml-2 mr-auto">
              project-argus
            </a>
          </Link>
          {props.children}
        </ul>
      </nav>
    </>
  )
}

function NavItem(props) {
  const [open, setOpen] = useState(false)

  if (props.children) {
    return (
      <li className="w-10 flex items-center justify-center cursor-pointer">
        <span
          className="text-text-color no-underline icon-button h-8 w-8 bg-accent rounded-2xl p-1 m-1 flex items-center justify-center "
          onClick={() => setOpen(!open)}
        >
          {props.icon}
        </span>

        {open && props.children}
      </li>
    )
  } else {
    return (
      <Link href={props.url ? props.url : ''}>
        <li className="w-10 flex items-center justify-center cursor-pointer">
          <a
            className="text-text-color no-underline icon-button h-8 w-8 bg-accent rounded-2xl p-1 m-1 flex items-center justify-center "
            onClick={() => setOpen(!open)}
          >
            {props.icon}
          </a>
        </li>
      </Link>
    )
  }
}

function DropdownMenu() {
  const [activeMenu, setActiveMenu] = useState('main')
  const [menuHeight, setMenuHeight] = useState(null)
  const dropdownRef = useRef(null)

  useEffect(() => {
    setMenuHeight(dropdownRef.current?.firstChild.offsetHeight)
  }, [])

  function calcHeight(el) {
    const height = el.offsetHeight

    setMenuHeight(height)
  }

  function DropdownItem(props) {
    return (
      <Link href={props.url ? props.url : ''}>
        <span
          className="text-text-color no-underline menu-item h-12 flex items-center rounded-lg p-2 hover:bg-bg-hover"
          onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}
        >
          <span className="icon-button mr-2">{props.leftIcon}</span>
          {props.children}
          <span className="icon-right ml-auto">{props.rightIcon}</span>
        </span>
      </Link>
    )
  }

  return (
    <div
      className="dropdown z-50 absolute top-14 w-80 bg-primary border-b-2 border-solid border-accent rounded-lg overflow-hidden"
      style={{ height: menuHeight }}
      ref={dropdownRef}
    >
      <CSSTransition
        in={activeMenu === 'main'}
        timeout={500}
        classNames="menu-primary"
        unmountOnExit
        onEnter={calcHeight}
      >
        <div className="w-full box-border p-4">
          <DropdownItem
            leftIcon={<MaterialIcon request="Person" />}
            url="/auth/account-details"
          >
            Account Settings
          </DropdownItem>
          <DropdownItem
            leftIcon={<MaterialIcon request="SignOut" />}
            url="/api/auth/signout"
          >
            Sign Out
          </DropdownItem>
        </div>
      </CSSTransition>
    </div>
  )
}
