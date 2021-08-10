import Link from 'next/link'
import { useRouter } from 'next/router'
import { signIn, signOut, useSession } from 'next-auth/client'

export default function Navbar() {
  const [session, loading] = useSession()
  const router = useRouter()

  if (session) {
    return (
      <div className="list-none mx-2">
        <li className="float-left">
          <Link href="/">
            <a>project-argus</a>
          </Link>
        </li>
        <li className="float-right cursor-pointer" onClick={() => signOut()}>
          Sign out
        </li>
      </div>
    )
  } else {
    return (
      <div className="list-none mx-2">
        <li className="float-left">
          <Link href="/">
            <a>project-argus</a>
          </Link>
        </li>
        <li className="float-right cursor-pointer" onClick={() => signIn()}>
          Sign in
        </li>
      </div>
    )
  }
}
