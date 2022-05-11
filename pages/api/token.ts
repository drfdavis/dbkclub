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

	// await prisma.royalty.create({
	//     data: {
	//         number: amount,
	//         tokenId: uuidv4(),
	//     }
	// })

	if (tokenType === 'Royalty') {
		await prisma.token
			.create({
				data: {
                    user: {
                        connect: {
                            email: user,
                        }
                    },
					royalty: {
						create: {
							number: parseFloat(amount),
						},
					},
				},
			})
			.then(() => {
				res.status(200).json({ success: true })
			})
			.catch(e => {
				res.status(500).json({ success: false, message: e.message })
			})
	} else if (tokenType === 'Loyalty') {
		await prisma.token
			.create({
				data: {
					user: {
						connect: {
							email: user,
						},
					},
					loyalty: {
						create: {
							number: parseFloat(amount),
						},
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
		await prisma.token
			.create({
				data: {
					user: {
						connect: {
							email: user,
						},
					},
					bonuses: {
						create: {
							number: parseFloat(amount),
						},
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
