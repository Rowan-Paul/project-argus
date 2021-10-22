import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import Head from 'next/head'

import Layout from '../components/layout/layout'
import Loading from '../components/loading/loading'
import prisma from '../lib/prisma'
import { GetStaticProps } from 'next'
import Item from '../components/item/item'

interface IDashboardProps {
  user: string
  history: {
    title?: string
    year?: number
    name?: string
    datetime: string
    show?: {
      name: string
      year: number
    }
    season?: {
      season_number: number
    }
    episode_number: string
  }[]
}

interface ISessionUser {
  name: string
  id: string
  image?: string
  email: string
}

const DashboardPage = (props: IDashboardProps): JSX.Element => {
  const { data: session, status } = useSession()
  const user: ISessionUser = session?.user as ISessionUser
  const router = useRouter()

  switch (status) {
    case 'authenticated':
      return <Dashboard user={user?.name} history={props.history} />

    case 'loading':
      return <Loading />

    case 'unauthenticated':
      router.push('/')
      return <Loading />
  }
}

const Dashboard = (props: IDashboardProps): JSX.Element => {
  return (
    <>
      <Head>
        <title>project argus</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>Dashboard</h1>
      <p>Welcome {props.user}</p>

      <div className="my-10">
        <h2>Up next</h2>
        <p>Coming soon...</p>
      </div>

      <h2>Recently watched by others</h2>
      <div className="grid auto-rows-fr grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 my-5">
        {props.history.length > 0 ? (
          props.history.map((result, i) => {
            return (
              <Item
                url={
                  result.title
                    ? `/movies/${result.title
                        .replace(/[^a-zA-Z0-9 !]+/g, '')
                        .replace(/\s+/g, '-')
                        .toLowerCase()}-${result.year}`
                    : `/shows/${result.show.name
                        .replace(/[^a-zA-Z0-9 !]+/g, '')
                        .replace(/\s+/g, '-')
                        .toLowerCase()}-${result.show.year}/seasons/${result.season.season_number}/episodes/${
                        result.episode_number
                      }`
                }
                title={result.title ? result.title : `${result.show.name} - ${result.name}`}
                key={result.title ? result.title + i : result.name + i}
              />
            )
          })
        ) : (
          <Loading />
        )}
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  try {
    const historyResults = await prisma.history.findMany({
      take: 6,
    })

    let history = []
    await Promise.all(
      historyResults.map(async (item) => {
        if (item.movie_id) {
          const result = await prisma.movies.findFirst({
            where: {
              id: item.movie_id,
            },
          })

          history.push({ ...result, datetime: item.datetime })
        }
        if (item.episode_id) {
          const result = await prisma.episodes.findFirst({
            where: {
              id: item.episode_id,
            },
          })
          const season = await prisma.seasons.findFirst({
            where: {
              id: result.season_id,
            },
            select: {
              show_id: true,
              season_number: true,
            },
          })
          const show = await prisma.shows.findFirst({
            where: { id: season.show_id },
            select: {
              name: true,
              year: true,
            },
          })

          history.push({ ...result, show, season, datetime: item.datetime })
        }
      })
    )

    history = history.sort(function (a, b) {
      return Date.parse(b.datetime as string) - Date.parse(a.datetime as string)
    })

    return history ? { props: { history }, revalidate: 12 * 60 * 60 } : { notFound: true }
  } catch (error) {
    return { notFound: true }
  }
}

function formatDate(dateString) {
  const options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  }
  // @ts-ignore
  return new Date(dateString).toLocaleString([], options)
}

DashboardPage.getLayout = function getLayout(page: JSX.Element) {
  return <Layout>{page}</Layout>
}

export default DashboardPage
