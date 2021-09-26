import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'

import prisma from '../../lib/prisma'
import Layout from '../../components/layout/layout'
import Loading from '../../components/loading/loading'
import { getLastWord, removeLastWord } from '../../lib/utils'
import Backdrop from '../../components/backdrop/backdrop'
import ItemDetails from '../../components/item-details/item-details'

interface IMoviePageProps {
  movie: {
    id: number
    title: string
    year: number
    overview: string
    tmdb_id?: number
  }
  tmdb: TMDBmovie
}

interface TMDBmovie {
  backdrop_path?: string | null
  tagline?: string | null
  title?: string
}

export default function MoviePage(props: IMoviePageProps) {
  const [backdrop, setBackdrop] = useState<string>()

  useEffect(() => {
    if (props.tmdb?.backdrop_path && backdrop === undefined) {
      setBackdrop(`https://www.themoviedb.org/t/p/w1280/${props.tmdb?.backdrop_path}`)
    }
  }, [props.tmdb, backdrop])

  if (props.movie) {
    return (
      <>
        <Head>
          <title>{props.movie?.title ? `${props.movie.title} ${props.movie.year} | ` : ''}Movies | project argus</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div className="ml-10 md:ml-0 mb-5">
          <h1 className="inline-block mr-3">{props.movie.title}</h1>
          <span>{props.movie.year}</span>
        </div>

        <div className="md:grid md:grid-cols-10">
          <Backdrop path={backdrop} id={props.movie.id} type="movies" showHistory={true} poster={false} />

          <div className="p-5 md:p-10 md:col-span-4 lg:col-span-3">
            {props.tmdb?.tagline && <p className="italic">{props.tmdb.tagline}</p>}
            <p>{props.movie.overview}</p>
          </div>
        </div>

        <ItemDetails tmdb={props.tmdb} />
      </>
    )
  }
  return <Loading />
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  try {
    const movie = await prisma.movies.findFirst({
      where: {
        title: { equals: removeLastWord(ctx.params?.movie, '-'), mode: 'insensitive' },
        year: parseInt(getLastWord(ctx.params?.movie, '-')),
      },
    })
    let tmdb = {}

    if (movie?.tmdb_id) {
      tmdb = await fetch(
        `https://api.themoviedb.org/3/movie/${movie.tmdb_id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US`
      ).then((res) => res.json())
    }

    return movie ? { props: { movie, tmdb: tmdb as TMDBmovie }, revalidate: 15 * 60 } : { notFound: true }
  } catch (error) {
    console.log(error)
    return { notFound: true }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const movies = await prisma.movies.findMany({
    select: {
      title: true,
    },
  })
  const paths = []
  movies.map((movie) => {
    paths.push(`/movies/${movie}`)
  })

  return {
    paths,
    fallback: true,
  }
}

MoviePage.getLayout = function getLayout(page: JSX.Element) {
  return <Layout>{page}</Layout>
}
