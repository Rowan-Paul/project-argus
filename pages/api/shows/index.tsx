import prisma from '../../../lib/prisma'

export default async function handle(req, res) {
  try {
    const shows = await prisma.shows.findMany()

    res.json(shows)
  } catch (error) {
    res.status(500).end()
  }
}
