/* eslint-disable no-param-reassign */
const dev = process.env.NODE_ENV !== 'production'
const BASE_URL = dev
	? 'http://localhost:3000'
	: 'https://dbkclub.vercel.app'

import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { PrismaClient } from '@prisma/client'
import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import EmailProvider from 'next-auth/providers/email'
import CredentialsProvider from 'next-auth/providers/credentials'
import { JWT } from 'next-auth/jwt'
import { prisma } from '../../../lib/prisma/prisma'
import bcrypt from 'bcryptjs';

const confirmPasswordHash = (plainPassword: string, hashedPassword: string) => {
	return new Promise(resolve => {
		bcrypt.compare(plainPassword, hashedPassword, function (err, res) {
			resolve(res)
		})
	})
}


export default NextAuth({
	adapter: PrismaAdapter(prisma),
	providers: [
		// GoogleProvider({
		// 	clientId: process.env.GOOGLE_CLIENT_ID as string,
		// 	clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
		// }),
		// EmailProvider({
		// 	server: process.env.EMAIL_SERVER as string,
		// 	from: process.env.EMAIL_FROM as string,
		// }),
		CredentialsProvider({
			// The name to display on the sign in form (e.g. 'Sign in with...')
			name: 'Credentials',
			// The credentials is used to generate a suitable form on the sign in page.
			// You can specify whatever fields you are expecting to be submitted.
			// e.g. domain, username, password, 2FA token, etc.
			// You can pass any HTML attribute to the <input> tag through the object.
			credentials: {
				email: {
					label: 'Email',
					type: 'email',
					required: true,
					placeholder: 'supercoolemail@me.com',
				},
				// name: { label: 'Name', type: 'text', required: true, },
				password: { label: 'Password', type: 'password', required: true, placeholder: 'Very long password' },
			},
			async authorize(credentials, req) {
				const res = await fetch(`${BASE_URL}/api/credentials`, {
					method: 'POST',
					body: JSON.stringify(credentials),
					headers: { 'Content-Type': 'application/json' },
				})
				const user = await res.json()

				// If no error and we have user data, return it
				if (res.ok && user) {
					return user
				}
				// Return null if user data could not be retrieved
				console.log(user)
				return null
			},
		}),
	],
	callbacks: {
		jwt: async ({ token, user }) => {
			if (user) {
				token.user = user
			}
			return token
		},
		session: async ({ session, token }) => {
			session.user = token.user;
			return session
		},
	},
	// secret: process.env.NEXTAUTH_SECRET as string,
	// jwt: {
	// 	// secret: process.env.NEXTAUTH_SECRET,
	// },
	session: {
		strategy: 'jwt',
	},
	cookies: {
		// sessionToken: {
		// 	options: {
		// 		secure: process.env.NODE_ENV && process.env.NODE_ENV === 'production',
		// 	},
		// 	name: 'session',
		// },
	},
})
