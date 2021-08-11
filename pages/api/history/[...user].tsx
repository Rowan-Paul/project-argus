import prisma from '../../../lib/prisma'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      let data = {
        user_id: parseInt(req.query.user[0]),
      }

      if (req.query.user[1] === 'movies') {
        data.movie_id = parseInt(req.query.user[2])
      } else if (req.body.datetime) {
        data.datetime = req.body.datetime
      }

      await prisma.history.create({ data })

      res.status(201).end()
    } catch (error) {
      res.status(500).end()
    }
  } else if (req.method === 'GET') {
    try {
      let data = {
        user_id: parseInt(req.query.user[0]),
      }

      if (req.query.user[1] === 'movies') {
        data.movie_id = parseInt(req.query.user[2])
      }

      const result = await prisma.history.findMany({
        where: data,
      })

      if (result == null || result.length < 1) throw new Error('No movie found')
      res.json(result).end()
    } catch (error) {
      res.status(404).end()
    }
  }
}
