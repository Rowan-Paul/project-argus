import { removeLastWord } from '../../../../../lib/utils'
import prisma from '../../../../../lib/prisma'

export default async function handler(req, res) {
  // GET /api/[show]/seasons
  try {
    if (isNaN(req.query.show)) {
      const show = await prisma.shows.findFirst({
        where: {
          name: removeLastWord(req.query.show, '-'),
          year: parseInt(req.query.show.split('-').pop()),
        },
        select: {
          id: true,
          name: true,
          year: true,
          tmdb_id: true,
        },
      })

      const seasons = await prisma.seasons.findMany({
        where: { show_id: show.id },
        orderBy: {
          season_number: 'asc',
        },
      })

      res.json(seasons)
    } else {
      const seasons = await prisma.seasons.findMany({
        where: { show_id: parseInt(req.query.show) },
      })

      res.json(seasons)
    }
  } catch (error) {
    res.status(404).end()
  }
}
