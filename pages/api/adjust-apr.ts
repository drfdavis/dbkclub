// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../lib/prisma/prisma';

type Data = {
	apr: string
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const parseData: Data = JSON.parse(req.body)

	const { apr } = parseData

    // I got the idea by first creating a new APR. I then used the ID of that
    // APR to update the APR based on the ID. This is bad practice.
    // Find cleaner solution later.
	await prisma.apr
		.upsert({
			where: {
				id: '67170280-e05a-4202-9051-ccdff7fc67a9',
			},
			update: {
				amount: parseInt(apr),
			},
			create: {
				amount: parseInt(apr),
			},
		})
		.then(() => {
			res.status(200).json({ success: true })
		})
		.catch((e: { message: any }) => {
			res.status(500).json({ success: false, message: e.message })
		})
}
