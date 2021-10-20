import { NextApiRequest, NextApiResponse } from 'next'
import { withSentry } from '@sentry/nextjs'

import prisma from '../../../lib/prisma'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET':
      return readMethod(req, res)

    default:
      return res.status(405).end()
      break
  }
}

const readMethod = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const pageSize = 20
    const skip = req.query.page ? parseInt(req.query.page as string) * pageSize : 0

    const results = await prisma.movies.findMany({
      where: {
        title: {
          contains: req.query.movie as string,
          mode: 'insensitive',
        },
      },
      take: pageSize,
      skip,
    })
    const totalResults = await prisma.movies.count({
      where: {
        title: {
          contains: req.query.movie as string,
          mode: 'insensitive',
        },
      },
    })

    if (results.length > 0) return res.json({ movies: results, moviesCount: totalResults })
    else return res.status(404).end()
  } catch (error) {
    return res.status(404).end()
  }
}

export default withSentry(handler)
