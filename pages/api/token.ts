// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { prisma } from '../../lib/prisma/prisma'

import { v4 as uuidv4 } from 'uuid'

type Data = {
	user: string
	tokenType: string
	amount: string
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const session = await getSession({ req })
	const parseData: Data = JSON.parse(req.body)

	const { amount, tokenType, user } = parseData

	if (tokenType === 'Royalty') {
		await prisma.user
			.update({
				where: {
					email: user,
				},
				data: {
					royalty: {
						increment: parseFloat(amount),
					}
				},
			})
			.then(() => {
				res.status(200).json({ success: true })
			})
			.catch(e => {
				res.status(500).json({ success: false, message: e.message })
			})
	} else if (tokenType === 'Loyalty') {
		await prisma.user
			.update({
				where: {
					email: user,
				},
				data: {
					loyalty: {
						increment: parseFloat(amount),
					},
				},
			})
			.then(() => {
				res.status(200).json({ success: true })
			})
			.catch(e => {
				res.status(500).json({ success: false, message: e.message })
			})
	} else {
		await prisma.user
			.update({
				where: {
					email: user,
				},
				data: {
					bonus: {
						increment: parseFloat(amount),
					},
				},
			})
			.then(() => {
				res.status(200).json({ success: true })
			})
			.catch(e => {
				res.status(500).json({ success: false, message: e.message })
			})
	}
}
