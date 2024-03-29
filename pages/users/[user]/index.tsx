import { GetStaticPaths, GetStaticProps } from 'next'
import Image from 'next/image'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

import prisma from '../../../lib/prisma'
import Layout from '../../../components/layout/layout'
import Loading from '../../../components/loading/loading'

interface IUserPageProps {
  user: {
    id: string
    name: string
    image?: string
    signUpDate: string
  }
}

const UserPage = (props: IUserPageProps): JSX.Element => {
  const router = useRouter()

  if (props.user) {
    return (
      <>
        <Head>
          <title>{props.user?.name}&apos;s profile | project argus</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div className="flex flex-col items-center justify-center w-full flex-1 px-10 md:px-20 text-center min-h-s50">
          <Image
            src={props.user?.image ? props.user.image : '/assets/icons/person.svg'}
            alt="Profile picture"
            width={96}
            height={96}
          />
          <h1>{props.user.name}</h1>
          <p>
            {props.user.name} has been a member since {formatDate(props.user.signUpDate)}
          </p>
        </div>

        <h2 className="left-left mb-2">Links</h2>
        <div className="flex p-2">
          <Link href={`${router.query.user}/history`}>
            <a className="inline-block p-3 bg-accent hover:bg-bg-hover no-underline">View history</a>
          </Link>
        </div>
      </>
    )
  }

  return <Loading />
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        name: { equals: ctx.params?.user as string, mode: 'insensitive' },
      },
      select: {
        id: true,
        name: true,
        image: true,
        signUpDate: true,
      },
    })

    return user ? { props: { user }, revalidate: 12 * 60 * 60 } : { notFound: true }
  } catch (error) {
    return { notFound: true }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const users = await prisma.user.findMany({
    select: {
      name: true,
    },
  })
  const paths = []
  users.map((user) => {
    paths.push(`/users/${user}`)
  })

  return {
    paths,
    fallback: true,
  }
}

UserPage.getLayout = function getLayout(page: JSX.Element) {
  return <Layout>{page}</Layout>
}

function formatDate(dateString) {
  const options = {
    year: 'numeric',
    month: 'long',
  }
  // @ts-ignore
  return new Date(dateString).toLocaleString([], options)
}

export default UserPage
