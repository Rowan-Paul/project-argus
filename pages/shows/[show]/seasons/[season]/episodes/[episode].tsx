import next, { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'

import Layout from '../../../../../../components/layout/layout'
import Loading from '../../../../../../components/loading/loading'
import prisma from '../../../../../../lib/prisma'
import { getLastWord, removeLastWord, titleCase } from '../../../../../../lib/utils'
import Backdrop from '../../../../../../components/backdrop/backdrop'

interface IEpisodePageProps {
  tmdb?: Itmdb
  episode: IEpisode
  next_episode: {
    season_id: number
    episode_number: number
  }
  prev_episode: {
    episode_number: number
    season_id: number
  }
}

interface IEpisode {
  id: number
  name: string
  tmdb_id: string
  episode_number: number
  still_path?: string
  show: string
  season: number
  overview: string
  air_date: string
}

interface Itmdb {
  backdrop_path?: string | null
  tagline?: string | null
  title?: string
  release_date?: string
  status?: string
  runtime?: number | null
  genres?: IGenre[]
  production_companies?: IProductionCompany[]
  first_air_date?: string
  episode_run_time?: number[]
  poster_path?: string | null
  still_path?: string | null
  air_date?: string
}

interface IGenre {
  id?: number
  name?: string
}

interface IProductionCompany {
  name?: string
  id?: number
  logo_path?: string | null
  origin_country?: string
}

const EpisodePage = (props: IEpisodePageProps): JSX.Element => {
  const [still, setStill] = useState<string>()
  const router = useRouter()

  useEffect(() => {
    if (props.tmdb?.still_path && still === undefined) {
      setStill(`https://www.themoviedb.org/t/p/w1280/${props.tmdb?.still_path}`)
    }
  }, [props.tmdb, still])

  if (props.episode) {
    return (
      <>
        <Head>
          <title>
            {props.episode?.name ? `${props.episode.name} | ${props.episode.show} | ` : ''}Shows | project argus
          </title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div className="mb-5">
          <Link href={`/shows/${router.query.show}`}>
            <a>
              <h1 className="inline-block mr-3">{props.episode?.show} </h1>
            </a>
          </Link>
          <Link href={`/shows/${router.query.show}/seasons/${router.query.season}`}>
            <a className="no-underline">Season {router.query.season},</a>
          </Link>
          &nbsp;Episode {router.query.episode}
        </div>

        <div className="grid md:grid-cols-10">
          <Backdrop
            path={still}
            id={props.episode?.id}
            type={`shows/${router.query.show}/episodes`}
            showHistory={true}
            poster={false}
          />

          <div className="p-5 md:p-10 md:col-span-4 lg:col-span-3">
            <span className="text-xs">{formatDate(props.episode.air_date)}</span>
            <h2>{`${router.query.season}x${router.query.episode} ${props.episode.name}`}</h2>
            <p>{props.episode?.overview}</p>
          </div>
        </div>

        <div className="flex mt-10">
          {props.prev_episode ? (
            <Link
              href={`/shows/${router.query.show}/seasons/${props.prev_episode.season_id}/episodes/${props.prev_episode.episode_number}`}
            >
              <a>Previous</a>
            </Link>
          ) : (
            ''
          )}
          {props.next_episode && (
            <Link
              href={`/shows/${router.query.show}/seasons/${props.next_episode.season_id}/episodes/${props.next_episode.episode_number}`}
            >
              <a className="ml-auto">Next</a>
            </Link>
          )}
        </div>
      </>
    )
  }

  return <Loading />
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  try {
    const show = await prisma.shows.findFirst({
      where: {
        name: { equals: removeLastWord(ctx.params?.show, '-'), mode: 'insensitive' },
        year: parseInt(getLastWord(ctx.params?.show, '-')),
      },
    })
    show.name = titleCase(show.name)

    const season = await prisma.seasons.findFirst({
      where: {
        show_id: show.id,
        season_number: parseInt(ctx.params?.season as string),
      },
    })
    const episode = await prisma.episodes.findFirst({
      where: {
        season_id: season.id,
        episode_number: parseInt(ctx.params?.episode as string),
      },
    })

    let tmdb: any = {}
    if (show?.tmdb_id) {
      tmdb = await fetch(
        `https://api.themoviedb.org/3/tv/${show.tmdb_id}/season/${season.season_number}/episode/${episode.episode_number}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US`
      ).then((res) => res.json())
    }

    const episodes = await prisma.episodes.findMany({
      where: {
        season_id: season.id,
      },
    })
    let next_episode: any = episodes.find((ep) => ep.episode_number === episode.episode_number + 1)
    let prev_episode: any = episodes.find((ep) => ep.episode_number === episode.episode_number - 1)

    if (!next_episode) {
      const nextSeason = await prisma.seasons.findFirst({
        where: {
          show_id: show.id,
          season_number: season.season_number + 1,
        },
      })

      if (nextSeason) {
        next_episode = {
          season_id: nextSeason.season_number,
          episode_number: 1,
        }
      }
    }
    if (!prev_episode) {
      const prevSeason = await prisma.seasons.findFirst({
        where: {
          show_id: show.id,
          season_number: season.season_number - 1,
        },
      })

      if (prevSeason) {
        next_episode = {
          season_id: prevSeason.season_number,
          episode_number: 1,
        }
      }
    }

    return episode
      ? {
          props: {
            episode: { ...episode, show: show.name, season: season.season_number },
            next_episode,
            prev_episode,
            tmdb: tmdb as Itmdb,
          },
        }
      : { notFound: true }
  } catch (error) {
    return { notFound: true }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const shows = await prisma.shows.findMany({
    select: {
      name: true,
      id: true,
    },
  })

  const paths = []
  shows.map(async (show) => {
    const seasons = await prisma.seasons.findMany({
      where: {
        show_id: show.id,
      },
      select: {
        id: true,
        season_number: true,
      },
    })

    seasons.map(async (season) => {
      const episodes = await prisma.episodes.findMany({
        where: {
          season_id: season.id,
        },
        select: {
          episode_number: true,
        },
      })

      episodes.map((episode) => {
        paths.push(`/shows/${show}/${episode.episode_number}`)
      })
    })
  })

  return {
    paths,
    fallback: true,
  }
}

function formatDate(dateString) {
  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }
  //@ts-ignore
  return new Date(dateString).toLocaleString([], options)
}

EpisodePage.getLayout = function getLayout(page: JSX.Element) {
  return <Layout>{page}</Layout>
}

export default EpisodePage
