import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../lib/prisma/prisma';

import { hash, compare } from 'bcryptjs'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const { email, password } = req.body;
	if (!email || !email.includes('@') || password === '') {
		res.status(422).json({ message: 'Invalid Data' })
		return;
	}
	const user = await prisma.user.findUnique({
		where: { email },
	});

	if (user) {
		const valid = await compare(password, user.password);
		if(user.password !== null) {
			if (user.password === password) {
				res.status(200).json({
					user,
				});
			} else {
				res.status(401).json({ message: 'Invalid Credentials' });
				return;
			}
		} else {
			res.status(200).json({
				user,
			})
		}
		// console.log(user);
	} else {
		const hashedPassword = await hash(password, 12);
		const newUser = await prisma.user.create({
			data: {
				email,
				password
			}
		});
		res.status(200).json({
			user: newUser
		});
	}
}
