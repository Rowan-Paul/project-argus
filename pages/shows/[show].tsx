import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Backdrop from '../../components/backdrop/backdrop'
import ItemDetails from '../../components/item-details/item-details'
import Layout from '../../components/layout/layout'
import Loading from '../../components/loading/loading'
import Seasons from '../../components/seasons/seasons'

import prisma from '../../lib/prisma'
import { getLastWord, removeLastWord, titleCase } from '../../lib/utils'

interface IShowPageProps {
  show: {
    id: number
    name: string
    year: number
    overview: string
    tmdb_id?: number
  }
  tmdb?: Itmdb
  seasons?: ISeason[]
}

interface ISeason {
  name: string
  season_number: number
  show: string
  image?: string
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

const ShowPage = (props: IShowPageProps): JSX.Element => {
  const [backdrop, setBackdrop] = useState<string>()
  const router = useRouter()

  useEffect(() => {
    if (props.tmdb?.backdrop_path && backdrop !== props.tmdb?.backdrop_path) {
      setBackdrop(`https://www.themoviedb.org/t/p/w1280/${props.tmdb?.backdrop_path}`)
    }
  }, [props.tmdb, backdrop])

  if (props.show && !router.isFallback) {
    return (
      <>
        <Head>
          <title>{props.show.name ? `${props.show.name} | ` : ''}Shows | project argus</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div className="ml-10 md:ml-0 mb-5">
          <h1 className="inline-block mr-3">{props.show.name}</h1>
          <span>{props.show.year}</span>
        </div>

        <div className="grid md:grid-cols-10">
          <Backdrop path={backdrop} id={props.show.id} type="shows" showHistory={false} poster={false} />

          <div className="p-5 md:p-10 md:col-span-4 lg:col-span-3">
            {props.tmdb?.tagline && <p className="italic">{props.tmdb.tagline}</p>}
            <p>{props.show.overview}</p>
          </div>
        </div>

        {props.show?.tmdb_id && <ItemDetails tmdb={props.tmdb} />}
        {props.seasons ? <Seasons seasons={props.seasons} show={router.query?.show as string} /> : ''}
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
    let tmdb: any = {}
    show.name = titleCase(show.name)

    if (show?.tmdb_id) {
      tmdb = await fetch(
        `https://api.themoviedb.org/3/tv/${show.tmdb_id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US`
      ).then((res) => res.json())
    }

    const seasonsResult = await prisma.seasons.findMany({
      where: {
        show_id: show.id,
      },
      select: {
        name: true,
        season_number: true,
      },
      orderBy: {
        season_number: 'asc',
      },
    })
    let seasons: any = seasonsResult

    if (tmdb?.seasons) {
      seasons.map((season) => {
        const result = tmdb.seasons.find((element) => element.season_number === season.season_number)
        if (result?.poster_path) {
          season.image = result.poster_path
        }
      })
    }

    return show ? { props: { show, tmdb: tmdb as Itmdb, seasons } } : { notFound: true }
  } catch (error) {
    return { notFound: true }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const shows = await prisma.shows.findMany({
    select: {
      name: true,
    },
  })
  const paths = []
  shows.map((show) => {
    paths.push(`/shows/${show}`)
  })

  return {
    paths,
    fallback: true,
  }
}

ShowPage.getLayout = function getLayout(page: JSX.Element) {
  return <Layout>{page}</Layout>
}

export default ShowPage
