import prisma from '../../../lib/prisma'

export default async function handler(req: any, res: any) {
  try {
    const result = await prisma.user.findFirst({
      where: {
        name: { equals: req.query.user, mode: 'insensitive' },
      },
      select: {
        name: true,
        image: true,
      },
    })

    if (result == null || result.length < 1) throw new Error('No user found')
    res.json(result).end()
  } catch (error) {
    res.status(404).end()
  }
}
