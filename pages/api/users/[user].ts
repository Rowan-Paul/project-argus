import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'

interface IData {
  name: string
  image?: string
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    let data: IData = {
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

    res.status(201).end()
  } catch (error) {
    console.log(error)
    res.status(500).end()
  }
}

export default handler
