import { removeLastWord } from '../../../lib/utils'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const movie = {
        title: removeLastWord(req.query.movie, '-'),
        year: req.query.movie.split('-').pop(),
        overview: req.body.overview,
        tmdb_id: req.body.tmdb,
      }

      await prisma.movies.create({
        data: {
          overview: movie.overview,
          year: parseInt(movie.year),
          title: movie.title,
          tmdb_id: parseInt(movie.tmdb_id),
        },
      })

      res.status(201).end()
    } catch {
      res.status(500).end()
    }
  } else if (req.method === 'GET') {
    try {
      const movie = {
        title: removeLastWord(req.query.movie, '-'),
        year: req.query.movie.split('-').pop(),
      }

      const result = await prisma.movies.findFirst({
        where: { title: movie.title, year: parseInt(movie.year) },
      })

      return res.json(result).end()
    } catch {
      return res.status(404).end()
    }
  }
}
