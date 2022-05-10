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
import React from 'react'
import AdminDashboard from '../../layout/AdminLayout'

export default function AdminPage() {
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
										<Badge fontWeight='bold' colorScheme='blue'>Users</Badge>
									</Th>
									<Th>
										<Badge fontWeight='bold' colorScheme='purple'>Royalty</Badge>
									</Th>
									<Th>
										<Badge fontWeight='bold' colorScheme='orange'>Loyalty</Badge>
									</Th>
									<Th>
										<Badge fontWeight='bold' colorScheme='teal'>Bonuses</Badge>
									</Th>
								</Tr>
							</Thead>
							<Tbody>
								<Tr>
									<Td>Jermaine</Td>
									<Td>millimetres (mm)</Td>
									<Td>25.4</Td>
									<Td>25.4</Td>
								</Tr>
								<Tr>
									<Td>Quavo</Td>
									<Td>centimetres (cm)</Td>
									<Td>30.48</Td>
									<Td>30.48</Td>
								</Tr>
								<Tr>
									<Td>Takeoff</Td>
									<Td>metres (m)</Td>
									<Td>0.91444</Td>
									<Td>0.91444</Td>
								</Tr>
							</Tbody>
						</Table>
					</TableContainer>
				</Box>
			</AdminDashboard>
		</div>
	)
}
