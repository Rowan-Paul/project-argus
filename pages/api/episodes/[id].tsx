import prisma from '../../../lib/prisma'

export default async function handler(req: any, res: any) {
  // GET /api/shows/[show]/episodes/[episode]
  try {
    const result = await prisma.episodes.findUnique({
      where: { id: parseInt(req.query.id) },
    })
    const season = await prisma.seasons.findUnique({
      where: { id: result.season_id },
    })
    const show = await prisma.shows.findUnique({
      where: { id: season.show_id },
    })

    result.season_number = season.season_number
    result.show_name = show.name
    result.show_tmdb = show.tmdb_id
    result.show_year = show.year

    if (result == null || result.length < 1) throw new Error('No history found')
    res.json(result)
  } catch (error) {
    res.status(404).end()
  }
}
