import { Box, SimpleGrid } from '@chakra-ui/react'
import React from 'react'
import DashboardLayout from '../../layout/Layout'
import { RoyaltyBox } from '../../components/TokenBox'
import { prisma } from '../../lib/prisma/prisma'
import { GetSessionParams, getSession, useSession } from 'next-auth/react'

export default function DashboardPage({ tokens, APR }: { tokens: any, APR: { amount: number } }) {
	const { data: session, status } = useSession();
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
						<RoyaltyBox name='Royalty' amount={tokens.royalty} APR={APR.amount} />
					</SimpleGrid>
				</Box>
			</DashboardLayout>
		</div>
	)
}

export const getServerSideProps = async (context: GetSessionParams) => {
	const session = await getSession({ req: context.req })
	const tokens = await prisma.user.findUnique({
		where: {
			email: session?.user?.user?.email as string,
		},
		select: {
			loyalty: true,
			royalty: true,
			bonus: true,
		},
	})

	const APR = await prisma.apr.findUnique({
		// I got the idea by first creating a new APR. I then used the ID of that
		// APR to update the APR based on the ID. This is bad practice.
		// Find cleaner solution later.
		where: {
			id: '67170280-e05a-4202-9051-ccdff7fc67a9',
		},
		select: {
			amount: true,
		}
	})

	return {
		props: {
			tokens,
			APR,
		},
	}
}
