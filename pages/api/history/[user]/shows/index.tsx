import prisma from '../../../../../lib/prisma'

export default async function handler(req: any, res: any) {
  // GET /api/history/[user]/shows
  try {
    let args = {
      where: { user_id: parseInt(req.query.user), NOT: [{ episode_id: null }] },
      orderBy: {
        datetime: 'desc',
      },
    }

    if (req.query.amount) {
      args.take = parseInt(req.query.amount)
    }

    const result = await prisma.history.findMany(args)

    if (result == null || result.length < 1) throw new Error('No history found')
    res.json(result)
  } catch (error) {
    res.status(404).end()
  }
}
