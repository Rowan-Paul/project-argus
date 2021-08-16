import { removeLastWord } from '../../../../../lib/utils'
import prisma from '../../../../../lib/prisma'

export default async function handler(req, res) {
  // GET /api/[show]/seasons/[season]
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
      const season = await prisma.seasons.findFirst({
        where: {
          show_id: show.id,
          season_number: parseInt(req.query.season),
        },
      })
      const episodes = await prisma.episodes.findMany({
        where: {
          season_id: season.id,
        },
        orderBy: {
          air_date: 'asc',
        },
      })

      let tempObj = season
      tempObj.show_name = show.name
      tempObj.show_year = show.year
      tempObj.show_tmdb_id = show.tmdb_id
      tempObj.episodes = episodes

      res.json(tempObj)
    } else {
      const season = await prisma.seasons.findMany({
        where: {
          show_id: parseInt(req.query.show),
          season_number: parseInt(req.query.season),
        },
      })

      res.json(season)
    }
  } catch (error) {
    res.status(404).end()
  }
}
