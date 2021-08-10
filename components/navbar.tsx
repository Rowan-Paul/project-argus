import { useRouter } from 'next/router'
import { signIn, signOut, useSession } from 'next-auth/client'

export default function Navbar() {
  const [session, loading] = useSession()
  const router = useRouter()

  if (session && router.pathname !== '/auth') {
    return (
      <p onClick={() => signOut()} className="cursor-pointer">
        Sign out
      </p>
    )
  } else {
    return (
      <p onClick={() => signIn()} className="cursor-pointer">
        Login
      </p>
    )
  }
}
