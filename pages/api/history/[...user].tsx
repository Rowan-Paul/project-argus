import prisma from '../../../lib/prisma'

export default async function handler(req: any, res: any) {
  if (req.method === 'POST') {
    try {
      let data: any = {
        user_id: parseInt(req.query.user[0]),
      }

      if (req.query.user[1] === 'movies') {
        data.movie_id = parseInt(req.query.user[2])
      }
      if (req.body.datetime) {
        data.datetime = new Date(req.body.datetime[0])
      }

      await prisma.history.create({ data })

      res.status(201).end()
    } catch (error) {
      res.status(500).end()
    }
  } else if (req.method === 'GET') {
    try {
      let data: any = {
        user_id: parseInt(req.query.user[0]),
      }

      if (req.query.user[1] === 'movies') {
        data.movie_id = parseInt(req.query.user[2])
      }

      const result = await prisma.history.findMany({
        where: data,
        orderBy: {
          datetime: 'asc',
        },
      })

      if (result == null || result.length < 1) throw new Error('No movie found')
      res.json(result).end()
    } catch (error) {
      res.status(404).end()
    }
  } else if (req.method === 'DELETE') {
    try {
      await prisma.history.delete({
        where: {
          id: parseInt(req.query.user[0]),
        },
      })

      res.status(200).end()
    } catch (error) {
      res.status(500).end()
    }
  }
}
