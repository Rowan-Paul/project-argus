import { removeLastWord } from '../../../lib/utils'
import prisma from '../../../lib/prisma'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const show = {
        name: removeLastWord(req.query.show[0], '-'),
        year: req.query.show[0].split('-').pop(),
        overview: req.body.overview,
        tmdb_id: req.body.tmdb,
      }

      await prisma.shows.create({
        data: {
          overview: show.overview,
          year: parseInt(show.year),
          name: show.name,
          tmdb_id: parseInt(show.tmdb_id),
        },
      })

      res.status(201).end()
    } catch {
      res.status(500).end()
    }
  } else if (req.method === 'GET') {
    try {
      // check if it's a number/show id
      if (isNaN(req.query.show[0])) {
        const show = {
          name: removeLastWord(req.query.show[0], '-'),
          year: req.query.show[0].split('-').pop(),
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
        if (req.query.show[1] === 'seasons') {
          if (req.query.show[2]) {
            const season = await prisma.seasons.findMany({
              where: {
                show_id: parseInt(req.query.show[0]),
                season_number: parseInt(req.query.show[2]),
              },
            })

            res.json(season)
          }
          const seasons = await prisma.seasons.findMany({
            where: { show_id: parseInt(req.query.show[0]) },
          })

          res.json(seasons)
        }
        const result = await prisma.shows.findUnique({
          where: { id: parseInt(req.query.show[0]) },
        })

        if (result == null) throw new Error('No show found')
        res.json(result)
      }
    } catch (error) {
      console.log(error)
      res.status(404).end()
    }
  }
}
