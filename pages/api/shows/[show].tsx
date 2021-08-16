import { removeLastWord } from '../../../lib/utils'
import prisma from '../../../lib/prisma'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    // POST /api/shows/[show]
    try {
      const show = {
        name: removeLastWord(req.query.show, '-'),
        year: req.query.show.split('-').pop(),
        overview: req.body.overview,
        tmdb_id: req.body.tmdb,
      }

      const showRes = await prisma.shows.create({
        data: {
          overview: show.overview,
          year: parseInt(show.year),
          name: show.name,
          tmdb_id: parseInt(show.tmdb_id),
        },
      })

      fetch(
        `https://api.themoviedb.org/3/tv/${show.tmdb_id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US`
      )
        .then((res) => res.json())
        .then((movieDetails) => {
          movieDetails.seasons.forEach(async (season: any) => {
            await prisma.seasons.create({
              data: {
                show_id: showRes.id,
                name: season.name,
                overview: season.overview,
                season_number: season.season_number,
                episode_count: season.episode_count,
                air_date: new Date(season.air_date),
                tmdb_id: season.id,
              },
            })
          })
        })
        .catch((error) => {
          throw new Error('Failed fetching seasons')
        })

      res.status(201).end()
    } catch (error) {
      console.log(error)
      res.status(500).end()
    }
  } else if (req.method === 'GET') {
    // GET /api/shows/[show]
    try {
      // check if it's a number/show id
      if (isNaN(req.query.show)) {
        const show = {
          name: removeLastWord(req.query.show, '-'),
          year: req.query.show.split('-').pop(),
        }

        const result = await prisma.shows.findFirst({
          where: { name: show.name, year: parseInt(show.year) },
        })
        const seasons = await prisma.seasons.findMany({
          where: { show_id: result.id },
        })

        result.seasons = seasons

        if (result == null) throw new Error('No show found')
        res.json(result)
      } else {
        const result = await prisma.shows.findUnique({
          where: { id: parseInt(req.query.show[0]) },
        })
        const seasons = await prisma.seasons.findMany({
          where: { show_id: result.id },
        })

        result.seasons = seasons

        if (result == null) throw new Error('No show found')
        res.json(result)
      }
    } catch (error) {
      res.status(404).end()
    }
  }
}
