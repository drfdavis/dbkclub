import {
	Table,
	Thead,
	Tbody,
	Tr,
	Th,
	Td,
	TableCaption,
	TableContainer,
	Box,
	Badge,
} from '@chakra-ui/react'
import { prisma } from '../../lib/prisma/prisma'
import { GetServerSideProps } from 'next'
import { getSession, GetSessionParams } from 'next-auth/react'
import React from 'react'
import AdminDashboard from '../../layout/AdminLayout'

type User = {
	id: string
	email: string
	image: string
	name: string
}

// type Royalty = {
// 	id: string;
// 	userId: string;
// }

export default function AdminPage({ users }: { users: any }) {
	console.log(users)
	return (
		<div>
			<AdminDashboard>
				<Box mt={10}>
					<TableContainer>
						<Table variant='simple'>
							<TableCaption mt='100px'>
								<Badge colorScheme='twitter'>All users</Badge>
							</TableCaption>
							<Thead>
								<Tr>
									<Th>
										<Badge fontWeight='bold' colorScheme='blue'>
											Users
										</Badge>
									</Th>
									<Th>
										<Badge fontWeight='bold' colorScheme='purple'>
											Royalty
										</Badge>
									</Th>
									<Th>
										<Badge fontWeight='bold' colorScheme='orange'>
											Loyalty
										</Badge>
									</Th>
									<Th>
										<Badge fontWeight='bold' colorScheme='teal'>
											Bonuses
										</Badge>
									</Th>
								</Tr>
							</Thead>
							<Tbody>
								{users.length !== 0 &&
									users.map((user: any) => (
										<>
											<Tr key={user.id}>
												<Td>{user.email}</Td>
												<Td>{user.royalty}</Td>
												<Td>{user.loyalty}</Td>
												<Td>{user.bonus}</Td>
											</Tr>
										</>
									))}
							</Tbody>
						</Table>
					</TableContainer>
				</Box>
			</AdminDashboard>
		</div>
	)
}

export const getServerSideProps: GetServerSideProps = async (
	context: GetSessionParams
) => {
	const users = await prisma.user.findMany({
		select: {
			email: true,
			name: true,
			id: true,
			bonus: true,
			loyalty: true,
			royalty: true,
		},
	})

	return {
		props: {
			users: users,
		},
	}
}
