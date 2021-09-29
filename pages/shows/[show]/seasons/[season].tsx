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
  tmdb?: Itmdb
  season: ISeason
  episodes: IEpisode[]
}

interface IEpisode {
  name: string
  tmdb_id: string
  episode_number: number
  still_path?: string
}

interface ISeason {
  name: string
  season_number: number
  show: string
  image?: string
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

const SeasonPage = (props: ISeasonPageProps): JSX.Element => {
  const [poster, setPoster] = useState<string>()
  const router = useRouter()
  const { season } = props

  useEffect(() => {
    if (props.tmdb?.poster_path && poster === undefined) {
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
            {/* <div className="flex flex-nowrap">
              <a>Previous</a>
              <a className="ml-auto">Next</a>
            </div> */}

            <p className="p-5">{season?.overview}</p>
          </div>
          <Backdrop path={poster} type="shows" showHistory={false} poster={true} />
        </div>

        {props?.episodes && (
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

    return season
      ? { props: { season: { ...season, show: show.name }, tmdb: tmdb as Itmdb, episodes } }
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
