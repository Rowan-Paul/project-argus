import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { withSentry } from '@sentry/nextjs'

import prisma from '../../../lib/prisma'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req })

  switch (req.method) {
    case 'DELETE':
      if (session) {
        return deleteMethod(req, res, session.user.id)
      }
      return res.status(401).end()

    case 'GET':
      if (session) {
        return getMethod(req, res, session.user.id)
      }

    default:
      res.status(405).end()
      break
  }
}

const getMethod = async (req: NextApiRequest, res: NextApiResponse, id: string) => {
  try {
    return res.status(200).end()
  } catch (error) {
    return res.status(500).end()
  }
}

const deleteMethod = async (req: NextApiRequest, res: NextApiResponse, id: string) => {
  try {
    const data = {
      id: parseInt(req.query.item as string),
      user_id: id,
    }

    await prisma.history.deleteMany({
      where: data,
    })

    return res.status(200).end()
  } catch (error) {
    return res.status(500).end()
  }
}

export default withSentry(handler)
