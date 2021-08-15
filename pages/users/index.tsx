import { useSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import Loading from '../../components/loading'

export default function Users() {
  const [session, loading] = useSession()
  const router = useRouter()

  if (!loading) {
    if (session?.user?.name) {
      router.push(`/users/${session.user?.name}`)
    } else {
      router.push('/')
    }
  }

  return <Loading small={false} />
}
