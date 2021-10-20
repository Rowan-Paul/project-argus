import { NextApiRequest, NextApiResponse } from 'next'
import { withSentry } from '@sentry/nextjs'

import prisma from '../../../lib/prisma'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET':
      return readMethod(req, res)

    default:
      res.status(405).end()
      break
  }
}

const readMethod = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const pageSize = 20
    const skip = req.query.page ? parseInt(req.query.page as string) * pageSize : 0

    const results = await prisma.shows.findMany({
      where: {
        name: {
          contains: req.query.show as string,
          mode: 'insensitive',
        },
      },
      take: pageSize,
      skip,
    })
    const totalResults = await prisma.shows.count({
      where: {
        name: {
          contains: req.query.shows as string,
          mode: 'insensitive',
        },
      },
    })

    if (results.length > 0) return res.json({ shows: results, showsCount: totalResults })
    else return res.status(404).end()
  } catch (error) {
    return res.status(404).end()
  }
}

export default withSentry(handler)
