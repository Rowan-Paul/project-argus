import { GetStaticPaths, GetStaticProps } from 'next'
import Image from 'next/image'
import Head from 'next/head'

import prisma from '../../lib/prisma'
import Layout from '../../components/layout/layout'
import Loading from '../../components/loading/loading'

interface IUserPageProps {
  user: {
    id: string
    name: string
    image?: string
  }
}

export default function UserPage(props: IUserPageProps) {
  if (props.user) {
    return (
      <>
        <Head>
          <title>{props.user?.name}&apos;s profile | project argus</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div className="flex flex-col items-center justify-center w-full flex-1 px-10 md:px-20 text-center min-h-s50">
          <Image
            src={props.user?.image ? props.user.image : '/assets/svg/person.svg'}
            alt="Profile picture"
            width={96}
            height={96}
          />

          <h1>{props.user?.name}</h1>
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
      },
    })

    return user ? { props: { user } } : { notFound: true }
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
