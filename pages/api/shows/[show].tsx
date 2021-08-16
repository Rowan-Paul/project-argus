import { removeLastWord } from '../../../lib/utils'
import prisma from '../../../lib/prisma'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const show = {
        name: removeLastWord(req.query.show, '-'),
        year: req.query.show.split('-').pop(),
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
      // I'm lazy so I'm just copying it
      if (isNaN(req.query.show) || isNaN(parseFloat(req.query.show))) {
        const show = {
          name: removeLastWord(req.query.show, '-'),
          year: req.query.show.split('-').pop(),
        }

        const result = await prisma.shows.findFirst({
          where: { name: show.name, year: parseInt(show.year) },
        })

        if (result == null) throw new Error('No show found')
        res.json(result)
      } else {
        const result = await prisma.shows.findUnique({
          where: { id: parseInt(req.query.show) },
        })

        if (result == null) throw new Error('No show found')
        res.json(result)
      }
    } catch (error) {
      res.status(404).end()
    }
  }
}
