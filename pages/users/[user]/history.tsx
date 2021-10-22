import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

import prisma from '../../../lib/prisma'
import Layout from '../../../components/layout/layout'
import Loading from '../../../components/loading/loading'
import Item from '../../../components/item/item'

interface IHistoryPageProps {
  user: {
    id: string
    name: string
  }
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

const HistoryPage = (props: IHistoryPageProps): JSX.Element => {
  const router = useRouter()

  if (props.history) {
    return (
      <>
        <Head>
          <title>{props.user?.name}&apos;s history | Users | project argus</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Link href={`/users/${router.query.user}`}>
          <a className="text-xs">Go back to profile</a>
        </Link>
        <h1>{props.user.name}&apos;s history</h1>
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
                  subtitle={result.datetime ? formatDate(result.datetime) : 'No datetime'}
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
      },
    })
    const historyResults = await prisma.history.findMany({
      where: {
        user_id: user.id,
      },
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

    return user ? { props: { user, history }, revalidate: 12 * 60 * 60 } : { notFound: true }
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
    paths.push(`/users/${user}/history`)
  })

  return {
    paths,
    fallback: true,
  }
}

HistoryPage.getLayout = function getLayout(page: JSX.Element) {
  return <Layout>{page}</Layout>
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

export default HistoryPage
