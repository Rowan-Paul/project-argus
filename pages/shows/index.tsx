import Layout from '../../components/layout/layout'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import Item from '../../components/item/item'
import Loading from '../../components/loading/loading'

interface IShowsDiscoverPageProps {
  results: any
}

const ShowsDiscoverPage = (props: IShowsDiscoverPageProps): JSX.Element => {
  const { results } = props

  return (
    <>
      <Head>
        <title>Discover | Shows | project argus</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>Discover shows</h1>
      <div className="grid auto-rows-fr grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 my-5">
        {results.length > 0 ? (
          results?.map((result) => {
            return (
              <Item
                url={`/shows/${result.name
                  .replace(/[^a-zA-Z0-9 !]+/g, '')
                  .replace(/\s+/g, '-')
                  .toLowerCase()}-${result.first_air_date.split('-')[0]}`}
                title={result.name}
                image={tmdbUrlify(result.poster_path)}
                key={result.name}
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

export const getStaticProps: GetStaticProps = async () => {
  try {
    const discover = await fetch(
      `https://api.themoviedb.org/3/tv/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US&page=1`
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

ShowsDiscoverPage.getLayout = function getLayout(page: JSX.Element) {
  return <Layout>{page}</Layout>
}

export default ShowsDiscoverPage
