import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { withSentry } from '@sentry/nextjs'

import prisma from '../../../lib/prisma'
import { getLastWord, removeLastWord } from '../../../lib/utils'

interface ICreateData {
  overview: string
  year: number
  name: string
  tmdb_id?: number
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req })

  switch (req.method) {
    case 'POST':
      if (session) {
        return createMethod(req, res)
      }
      return res.status(401).end()

    case 'GET':
      return readMethod(req, res)

    default:
      res.status(405).end()
      break
  }
}

const readMethod = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (isNaN(req.query.show as any) || isNaN(parseFloat(req.query.show as string))) {
      const show = {
        name: removeLastWord(req.query.show, '-'),
        year: getLastWord(req.query.show, '-'),
      }

      const result = await prisma.shows.findMany({
        where: { name: show.name, year: parseInt(show.year) },
      })

      return res.json(result)
    } else {
      const result = await prisma.shows.findMany({
        where: { id: parseInt(req.query.show as string) },
      })

      return res.json(result)
    }
  } catch (error) {
    return res.status(404).end()
  }
}

const createMethod = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const show: ICreateData = {
      name: removeLastWord(req.query.show, '-'),
      year: parseInt(getLastWord(req.query.show, '-')),
      overview: req.body.overview,
      tmdb_id: parseInt(req.body.tmdb),
    }

    const createShow = await prisma.shows.create({
      data: {
        overview: show.overview,
        year: show.year,
        name: show.name,
        tmdb_id: show.tmdb_id,
      },
    })

    let tmdbShow
    if (createShow) {
      tmdbShow = await fetch(
        `https://api.themoviedb.org/3/tv/${show.tmdb_id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US`
      ).then((res) => res.json())
    }

    let seasonsData = []
    if (tmdbShow?.seasons) {
      tmdbShow.seasons.map((season) => {
        seasonsData.push({
          show_id: createShow.id,
          name: season.name,
          overview: season.overview,
          season_number: season.season_number,
          episode_count: season.episode_count,
          air_date: new Date(season.air_date),
          tmdb_id: season.id,
        })
      })
    }

    const createSeasons = await prisma.seasons.createMany({
      data: seasonsData,
      skipDuplicates: true,
    })

    let tmdbSeasons = []
    if (createSeasons) {
      await Promise.all(
        tmdbShow?.seasons.map(async (season) => {
          const data = await fetch(
            `https://api.themoviedb.org/3/tv/${show.tmdb_id}/season/${season.season_number}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US`
          ).then((res) => res.json())

          tmdbSeasons.push(data)
        })
      )
    }

    if (tmdbSeasons) {
      await Promise.all(
        tmdbSeasons.map(async (season) => {
          let episodesData = []

          const season_id = await prisma.seasons.findFirst({
            where: {
              tmdb_id: season.id,
            },
            select: {
              id: true,
            },
          })

          season.episodes.map((episode) => {
            episodesData.push({
              name: episode.name,
              overview: episode.overview,
              season_id: season_id.id,
              tmdb_id: episode.id,
              air_date: new Date(episode.air_date),
              episode_number: episode.episode_number,
            })
          })

          await prisma.episodes.createMany({
            data: episodesData,
            skipDuplicates: true,
          })
        })
      )
    }

    return res.status(201).end()
  } catch (error) {
    console.log(error)
    return res.status(500).end()
  }
}

export default withSentry(handler)
