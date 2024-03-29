import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import Backdrop from '../../../../components/backdrop/backdrop'
import Episodes from '../../../../components/episodes/episodes'
import Layout from '../../../../components/layout/layout'
import Loading from '../../../../components/loading/loading'
import prisma from '../../../../lib/prisma'
import { getLastWord, removeLastWord, titleCase } from '../../../../lib/utils'

interface ISeasonPageProps {
  season: ISeason
  episodes: IEpisode[]
  tmdb?: {
    poster_path?: string | null
  }
  next_season: {
    season_number: number
  }
  prev_season: {
    season_number: number
  }
}

interface IEpisode {
  name: string
  tmdb_id: string
  episode_number: number
}

interface ISeason {
  name: string
  season_number: number
  show: string
  overview: string
}

const SeasonPage = (props: ISeasonPageProps): JSX.Element => {
  const [poster, setPoster] = useState<string>()
  const router = useRouter()
  const { season } = props

  useEffect(() => {
    if (props.tmdb?.poster_path && poster !== props.tmdb?.poster_path) {
      setPoster(`https://www.themoviedb.org/t/p/w1280/${props.tmdb?.poster_path}`)
    }
  }, [props.tmdb, poster])

  if (props.season && !router.isFallback) {
    return (
      <>
        <Head>
          <title>{season?.name && `${season.name} | ${season?.show} | `}Shows | project argus</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div className="mb-5">
          <Link href={`/shows/${router.query.show}`}>
            <a className="no-underline">
              <h1 className="inline-block mr-3">{season.show}</h1>
              <span>{season?.name}</span>
            </a>
          </Link>
        </div>

        <div className="grid md:grid-cols-10">
          <div className="md:col-span-4 lg:col-span-3 md:mr-8">
            <p className="p-5">{season?.overview}</p>
          </div>
          <Backdrop path={poster} type="shows" showHistory={false} poster={true} />
        </div>

        <div className="flex mt-10">
          {props.prev_season ? (
            <Link href={`/shows/${router.query.show}/seasons/${props.prev_season.season_number}`}>
              <a>Previous</a>
            </Link>
          ) : (
            ''
          )}
          {props.next_season && (
            <Link href={`/shows/${router.query.show}/seasons/${props.next_season.season_number}`}>
              <a className="ml-auto">Next</a>
            </Link>
          )}
        </div>

        {props?.episodes?.length > 0 && (
          <Episodes episodes={props.episodes} season={season.season_number} show={router.query.show as string} />
        )}
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

    let tmdb: any = {}
    if (show?.tmdb_id && season?.tmdb_id) {
      tmdb = await fetch(
        `https://api.themoviedb.org/3/tv/${show.tmdb_id}/season/${season.season_number}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US`
      ).then((res) => res.json())
    }

    const episodesResult = await prisma.episodes.findMany({
      where: {
        season_id: season.id,
      },
      orderBy: {
        episode_number: 'asc',
      },
    })
    let episodes: any = episodesResult

    if (tmdb?.episodes) {
      episodes.map((episode) => {
        const result = tmdb.episodes.find((element) => element.episode_number === episode.episode_number)

        if (result?.still_path) {
          episode.still_path = result.still_path
        }
      })
    }

    const seasons = await prisma.seasons.findMany({ where: { show_id: show.id } })
    const next_season: any = seasons.find((s) => s.season_number === season.season_number + 1)
    const prev_season: any = seasons.find((s) => s.season_number === season.season_number - 1)

    return season
      ? { props: { season: { ...season, show: show.name }, next_season, prev_season, tmdb: tmdb, episodes } }
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
        season_number: true,
      },
    })

    seasons.map((season) => {
      paths.push(`/shows/${show}/${season.season_number}`)
    })
  })

  return {
    paths,
    fallback: true,
  }
}

SeasonPage.getLayout = function getLayout(page: JSX.Element) {
  return <Layout>{page}</Layout>
}

export default SeasonPage

function formatDate(dateString) {
  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }
  // @ts-ignore
  return new Date(dateString).toLocaleString([], options)
}
