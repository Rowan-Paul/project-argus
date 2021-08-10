export default async function handle(req, res) {
  const movies = await prisma.movies.findMany()
  res.json(movies)
}
