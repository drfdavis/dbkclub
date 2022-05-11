/* eslint-disable no-param-reassign */
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { PrismaClient } from '@prisma/client'
import NextAuth from 'next-auth'
import GitHubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import EmailProvider from 'next-auth/providers/email'

const prisma = new PrismaClient()

export default NextAuth({
	adapter: PrismaAdapter(prisma),
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
		}),
		// GitHubProvider({
		// 	clientId: process.env.GITHUB_ID as string,
		// 	clientSecret: process.env.GITHUB_SECRET as string,
		// }),
		// EmailProvider({
		// 	server: process.env.EMAIL_SERVER,
		// 	from: process.env.EMAIL_FROM,
		// }),
	],
	callbacks: {
		// session: async ({ session, user }) => {
		// 	// Over here, I had to add the `user` property to the session object
		// 	// I added a new field to the session object in environment.d.ts (implemented later)
		// 	if (session?.user) {
		// 		session.user.id = user.id
		// 	}
		// 	return session
		// },
	},
})
