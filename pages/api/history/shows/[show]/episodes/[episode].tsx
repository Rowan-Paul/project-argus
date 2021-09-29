import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'

import prisma from '../../../../../../lib/prisma'

interface IPOSTData {
  user_id: string
  episode_id: number
  datetime: Date
}

interface IGETData {
  user_id: string
  episode_id: number
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req })

  switch (req.method) {
    case 'POST':
      if (session) {
        return createMethod(req, res, session.user.id)
      }
      return res.status(401).end()

    case 'GET':
      if (session) {
        return readMethod(req, res, session.user.id)
      }
      return res.status(401).end()

    default:
      res.status(405).end()
      break
  }
}

const createMethod = async (req: NextApiRequest, res: NextApiResponse, id: string) => {
  try {
    let data: IPOSTData = {
      user_id: id,
      episode_id: parseInt(req.query.episode as string),
      datetime: new Date(),
    }

    if (req.body.datetime) {
      data.datetime = req.body.datetime[0]
    }
    if (req.body.noDate) {
      delete data.datetime
    }

    await prisma.history.create({ data })

    res.status(201).end()
  } catch (error) {
    return res.status(500).end()
  }
}

const readMethod = async (req: NextApiRequest, res: NextApiResponse, id: string) => {
  try {
    let data: IGETData = {
      user_id: id,
      episode_id: parseInt(req.query.episode as string),
    }

    const result = await prisma.history.findMany({
      where: data,
      orderBy: {
        datetime: 'asc',
      },
    })

    res.json(result)
  } catch (error) {
    res.status(404).end()
  }
}

export default handler
