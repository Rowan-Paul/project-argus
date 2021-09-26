import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'

import prisma from '../../../lib/prisma'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req })

  switch (req.method) {
    case 'DELETE':
      if (session) {
        return deleteMethod(req, res, session.user.id)
      }
      return res.status(401).end()

    default:
      res.status(405).end()
      break
  }
}

const deleteMethod = async (req: NextApiRequest, res: NextApiResponse, id: string) => {
  try {
    try {
      await prisma.history.delete({
        where: {
          id: parseInt(req.query.item as string),
        },
      })

      res.status(200).end()
    } catch (error) {
      res.status(500).end()
    }
  } catch (error) {
    console.log(error)
    return res.status(500).end()
  }
}

export default handler
