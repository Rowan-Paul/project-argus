import prisma from '../../../../../lib/prisma'

export default async function handler(req: any, res: any) {
  if (req.method === 'POST') {
    // POST /api/history/[user]/movies/[movie]
    try {
      let data: any = {
        user_id: parseInt(req.query.user),
        movie_id: parseInt(req.query.movie),
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
      res.status(500).end()
    }
  } else if (req.method === 'GET') {
    // GET /api/history/[user]/movies/[movie]
    try {
      let data: any = {
        user_id: parseInt(req.query.user),
        movie_id: parseInt(req.query.movie),
      }

      const result = await prisma.history.findMany({
        where: data,
        orderBy: {
          datetime: 'asc',
        },
      })

      if (result == null || result.length < 1) throw new Error('No movie found')
      res.json(result)
    } catch (error) {
      res.status(404).end()
    }
  }
}
