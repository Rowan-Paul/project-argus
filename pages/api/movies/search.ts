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
    const results = await prisma.movies.findMany({
      where: {
        title: {
          contains: req.query.movie as string,
          mode: 'insensitive',
        },
      },
    })

    if (results.length > 0) res.json(results)
    else res.status(404).end()
  } catch (error) {
    res.status(404).end()
  }
}

export default withSentry(handler)
