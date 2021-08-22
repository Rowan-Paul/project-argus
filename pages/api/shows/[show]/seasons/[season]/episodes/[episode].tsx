import { removeLastWord } from '../../../../../../../lib/utils'
import prisma from '../../../../../../../lib/prisma'

export default async function handler(req, res) {
  // GET /api/[show]/seasons/[season]/episode/[episode]
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
      const episode = await prisma.episodes.findFirst({
        where: {
          season_id: season.id,
          episode_number: parseInt(req.query.episode),
        },
      })
      const episodeNext = await prisma.episodes.findFirst({
        where: {
          season_id: season.id,
          episode_number: parseInt(req.query.episode) + 1,
        },
      })
      const episodePrev = await prisma.episodes.findFirst({
        where: {
          season_id: season.id,
          episode_number: parseInt(req.query.episode) - 1,
        },
      })

      let tempObj = episode
      tempObj.show_name = show.name
      tempObj.show_year = show.year
      tempObj.show_tmdb_id = show.tmdb_id
      tempObj.next_episode = episodeNext
      tempObj.prev_episode = episodePrev

      res.json(tempObj)
    } else {
      const season = await prisma.seasons.findMany({
        where: {
          show_id: parseInt(req.query.show),
          season_number: parseInt(req.query.season),
        },
      })
      const episode = await prisma.episodes.findFirst({
        where: {
          season_id: season.id,
          episode_number: parseInt(req.query.episode),
        },
      })

      res.json(episode)
    }
  } catch (error) {
    console.log(error)
    res.status(404).end()
  }
}
