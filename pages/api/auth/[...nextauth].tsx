import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import Adapters from 'next-auth/adapters'
import prisma from '../../../lib/prisma'

export default NextAuth({
  pages: {
    signIn: '/auth',
    verifyRequest: '/auth/verify-request',
    newUser: '/auth/account-details',
  },
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Providers.Email({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
      maxAge: 6 * 60 * 60,
    }),
  ],
  callbacks: {
    session: async (session, user) => {
      session.id = user.id
      return Promise.resolve(session)
    },
  },
  adapter: Adapters.Prisma.Adapter({ prisma }),
})
