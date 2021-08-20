import prisma from '../../../lib/prisma'

export default async function handler(req: any, res: any) {
  if (req.method === 'GET') {
    // GET /api/history/[user]
    try {
      const result = await prisma.history.findMany({
        where: { user_id: parseInt(req.query.user) },
      })

      if (result == null || result.length < 1)
        throw new Error('No history found')
      res.json(result)
    } catch (error) {
      res.status(404).end()
    }
  } else if (req.method === 'DELETE') {
    // DELETE /api/history/[item]
    try {
      await prisma.history.delete({
        where: {
          id: parseInt(req.query.user),
        },
      })

      res.status(200).end()
    } catch (error) {
      res.status(500).end()
    }
  }
}
