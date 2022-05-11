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
    Badge
} from '@chakra-ui/react'
import { PrismaClient } from '@prisma/client'
import { GetServerSideProps } from 'next'
import { getSession, GetSessionParams } from 'next-auth/react'
import React from 'react'
import AdminDashboard from '../../layout/AdminLayout'

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
								{users.map((user: any) => (
									<>
										<Tr key={user.id}>
											<Td>{user.email}</Td>
											<Td>{user.tokens.length}</Td>
											<Td>25.4</Td>
											<Td>25.4</Td>
										</Tr>
									</>
								))}
								{/* <Tr>
									<Td>Quavo</Td>
									<Td>45.3</Td>
									<Td>30.48</Td>
									<Td>30.48</Td>
								</Tr>
								<Tr>
									<Td>Takeoff</Td>
									<Td>54.9</Td>
									<Td>0.91444</Td>
									<Td>0.91444</Td>
								</Tr> */}
							</Tbody>
						</Table>
					</TableContainer>
				</Box>
			</AdminDashboard>
		</div>
	)
}


export const getServerSideProps: GetServerSideProps = async (context: GetSessionParams) => {
	let prisma = new PrismaClient();
	const users = await prisma.user.findMany({
		include: {
			tokens: {
				select: {
					loyalty: true,
					royalty: true,
					bonuses: true,
				}
			}
		}
	})

	users.forEach(user => {
		user.createdAt = JSON.parse(JSON.stringify(user.createdAt));
		user.updatedAt = JSON.parse(JSON.stringify(user.updatedAt));
		user.emailVerified = JSON.parse(JSON.stringify(user.emailVerified));
		user.tokens.forEach(token => {
			token.royalty.forEach(r => {
				r.createdAt = JSON.parse(JSON.stringify(r.createdAt));
				r.updatedAt = JSON.parse(JSON.stringify(r.updatedAt));
			})
			token.loyalty.forEach(l => {
				l.createdAt = JSON.parse(JSON.stringify(l.createdAt));
				l.updatedAt = JSON.parse(JSON.stringify(l.updatedAt));
			})
			token.bonuses.forEach(b => {
				b.createdAt = JSON.parse(JSON.stringify(b.createdAt));
				b.updatedAt = JSON.parse(JSON.stringify(b.updatedAt));
			})
		})
	})

	return {
		props: {
			users: users
		}
	}
}