import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'

import prisma from '../../lib/prisma'
import Layout from '../../components/layout/layout'
import Loading from '../../components/loading/loading'
import { getLastWord, removeLastWord } from '../../lib/utils'

interface IMoviePageProps {
  movie: {
    id: string
    title: string
    year: number
    overview: string
    tmdb_id?: number
  }
}

export default function MoviePage(props: IMoviePageProps) {
  if (props.movie) {
    return (
      <>
        <Head>
          <title>{props.movie.title ? `${props.movie.title} ${props.movie.year} | ` : ''}Movies | project argus</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div className="ml-10 md:ml-0 mb-5">
          <h1 className="inline-block mr-3">{props.movie.title}</h1>
          <span>{props.movie.year}</span>
        </div>

        <div className="grid md:grid-cols-10">
          {/* <Backdrop path={backdropPath} id={movie.id} type="movies" showHistory={true} /> */}

          <div className="p-5 md:p-10 md:col-span-4 lg:col-span-3">
            {/* <p className="italic">{tmdb.tagline}</p> */}
            <p>{props.movie.overview}</p>
          </div>
        </div>
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

    return movie ? { props: { movie }, revalidate: 15 * 60 } : { notFound: true }
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
