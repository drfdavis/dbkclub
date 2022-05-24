import { NextApiRequest, NextApiResponse } from 'next'

export default function handler(
	_req: NextApiRequest,
	res: NextApiResponse
): void {
	res
		.status(200)
		.json({ name: 'John Doe', email: 'JohnDoe@amiarealboy.test.com' })
}
