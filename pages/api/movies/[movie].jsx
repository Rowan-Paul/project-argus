import { removeLastWord } from '../../../lib/utils'

export default async function handle(req, res) {
  const movie = {
    title: removeLastWord(req.query.movie, '-'),
    year: req.query.movie.split('-').pop(),
  }

  const result = await prisma.movies.findFirst({
    where: { title: movie.title, year: parseInt(movie.year) },
  })

  if (result) {
    res.json(result)
  } else {
    res.status(404).end()
  }
}
