import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'

import prisma from '../../../lib/prisma'

interface IPUTData {
  name: string
  image?: string
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req })

  switch (req.method) {
    case 'PUT':
      if (session && session.user.id === (req.query?.user as string)) {
        return updateMethod(req, res)
      }
      return res.status(401).end()

    default:
      res.status(405).end()
      break
  }
}

const updateMethod = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    let data: IPUTData = {
      name: req.body.name,
    }

    if (req.body.image) {
      data.image = req.body.image
    }

    const updateUser = await prisma.user.update({
      where: {
        id: req.query.user as string,
      },
      data,
    })

    return res.status(201).end()
  } catch (error) {
    return res.status(500).end()
  }
}

export default handler
