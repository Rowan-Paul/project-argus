import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { withSentry } from '@sentry/nextjs'

import prisma from '../../../lib/prisma'

interface IPUTData {
  name: string
  image?: string
  initialized: boolean
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req })

  switch (req.method) {
    case 'PUT':
      if (session && session.user.id === (req.query?.user as string)) {
        return updateMethod(req, res)
      }
      return res.status(401).end()

    case 'GET':
      if (session && session.user.id === (req.query?.user as string)) {
        return readMethod(req, res)
      }
      return res.status(401).end()

    default:
      res.status(405).end()
      break
  }
}

const readMethod = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        id: req.query.user as string,
      },
      select: {
        initialized: true,
      },
    })

    return res.send(user)
  } catch (error) {
    return res.status(500).end()
  }
}

const updateMethod = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    let data: IPUTData = {
      name: req.body.name,
      initialized: true,
    }

    if (req.body.image) {
      data.image = req.body.image
    }

    await prisma.user.update({
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

export default withSentry(handler)
