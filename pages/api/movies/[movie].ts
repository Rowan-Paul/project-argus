import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'

import prisma from '../../../lib/prisma'
import { getLastWord, removeLastWord } from '../../../lib/utils'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req })

  switch (req.method) {
    case 'POST':
      if (session) {
        return createMethod(req, res)
      }
      return res.status(401).end()

    case 'GET':
      return readMethod(req, res)

    default:
      res.status(405).end()
      break
  }
}

const readMethod = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // I'm lazy so I'm just copying it
    if (isNaN(req.query.movie as any) || isNaN(parseFloat(req.query.movie as any))) {
      const movie = {
        title: removeLastWord(req.query.movie, '-'),
        year: getLastWord(req.query.movie, '-'),
      }

      const result = await prisma.movies.findMany({
        where: { title: movie.title, year: parseInt(movie.year) },
      })

      res.json(result)
    } else {
      const result = await prisma.movies.findMany({
        where: { id: parseInt(req.query.movie as string) },
      })

      res.json(result)
    }
  } catch (error) {
    res.status(404).end()
  }
}

const createMethod = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const movie = {
      title: removeLastWord(req.query.movie, '-'),
      year: getLastWord(req.query.movie, '-'),
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

    return res.status(201).end()
  } catch {
    return res.status(500).end()
  }
}

export default handler
