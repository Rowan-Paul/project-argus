import Layout from '../../components/layout/layout'
import { GetStaticProps } from 'next'
import Item from '../../components/item/item'

interface IMoviesDiscoverPageProps {
  results: any
}

const MoviesDiscoverPage = (props: IMoviesDiscoverPageProps): JSX.Element => {
  const { results } = props

  return (
    <>
      <h1>Discover movies</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 my-5">
        {results.map((result) => {
          return <Item url="#" title={result.title} image={tmdbUrlify(result.poster_path)} key={result.title} />
        })}
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const discover = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US&page=1`
    ).then((res) => res.json())

    return {
      props: {
        results: discover.results,
      },
      revalidate: 12 * 60 * 60,
    }
  } catch (error) {
    return { notFound: true }
  }
}

function tmdbUrlify(image) {
  if (image?.indexOf('/') === 0) {
    return `https://image.tmdb.org/t/p/w185/${image}`
  } else {
    return image
  }
}

MoviesDiscoverPage.getLayout = function getLayout(page: JSX.Element) {
  return <Layout>{page}</Layout>
}

export default MoviesDiscoverPage
