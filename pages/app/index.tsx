import { Box, SimpleGrid } from '@chakra-ui/react'
import React from 'react'
import DashboardLayout from '../../layout/Layout'
import { RoyaltyBox } from '../../components/TokenBox'
import { prisma } from '../../lib/prisma/prisma'
import { GetSessionParams, getSession, useSession } from 'next-auth/react'

export default function DashboardPage({ tokens }: { tokens: any }) {
	const { data: session, status } = useSession();

	console.log(session?.user)
	// console.log(tokens)
	return (
		<div>
			<DashboardLayout>
				{/* <Text>T</Text> */}
				<Box mt={10}>
					<SimpleGrid
						flexWrap='wrap'
						columns={{ base: 1, sm: 2, md: 3 }}
						maxW={{ base: '100%', md: '90%' }}
						margin='0 auto'
					>
						<RoyaltyBox name='Royalty' amount={tokens.royalty} />
					</SimpleGrid>
				</Box>
			</DashboardLayout>
		</div>
	)
}




export const getServerSideProps = async (context: GetSessionParams) => {
	const session = await getSession({ req: context.req });
	const tokens = await prisma.user.findUnique({
		where: {
			email: session?.user?.user?.email as string,
		},
		select: {
			loyalty: true,
			royalty: true,
			bonus: true
		}
	})

	return {
		props: { 
			tokens
		 }
	}
}