import prisma from '../../../lib/prisma'

export default async function handler(req, res) {
  try {
    const updateUser = await prisma.user.update({
      where: {
        id: parseInt(req.body.id),
      },
      data: {
        name: req.body.name,
        image: req.body.image,
      },
    })

    res.status(201).end()
  } catch (error) {
    console.log(error)
    res.status(500).end()
  }
}
