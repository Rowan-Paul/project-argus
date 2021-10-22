import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { withSentry } from '@sentry/nextjs'

import prisma from '../../../lib/prisma'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req })

  switch (req.method) {
    case 'GET':
      if (session) {
        return getMethod(req, res, session.user.id)
      } else {
        return res.status(401).end()
      }

    default:
      res.status(405).end()
      break
  }
}

const getMethod = async (req: NextApiRequest, res: NextApiResponse, id: string) => {
  try {
    const results = await prisma.history.findMany({
      where: {
        user_id: id,
      },
    })

    if (results.length > 0) return res.json(results)
    else return res.status(404).end()
  } catch (error) {
    return res.status(500).end()
  }
}

export default withSentry(handler)
