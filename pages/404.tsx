import { useRouter } from 'next/router'
import Link from 'next/link'

import CenterLayout from '../components/center-layout/center-layout'

const Custom404 = (): JSX.Element => {
  const router = useRouter()

  if (router.query?.movie && router.query.movie !== 'new') {
    return (
      <>
        <h1>Movie not found</h1>
        <p>
          Perhaps you got the year wrong or it doesn&apos;t exist yet? <br></br>
          <Link href={`/movies/new?movie=${router.query.movie}`}>
            <a>You can always add a new movie here.</a>
          </Link>
        </p>
      </>
    )
  }

  return (
    <>
      <h1>Not found</h1>
      <p>Are you lost?</p>
    </>
  )
}

export default Custom404

Custom404.getLayout = function getLayout(page: JSX.Element) {
  return <CenterLayout>{page}</CenterLayout>
}