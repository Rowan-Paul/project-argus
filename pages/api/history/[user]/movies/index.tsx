import prisma from '../../../../../lib/prisma'

export default async function handler(req: any, res: any) {
  // GET /api/history/[user]/movies
  try {
    const result = await prisma.history.findMany({
      where: { user_id: parseInt(req.query.user), NOT: [{ movie_id: null }] },
    })

    if (result == null || result.length < 1) throw new Error('No hisotry found')
    res.json(result)
  } catch (error) {
    res.status(404).end()
  }
}
