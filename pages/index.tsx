import React from 'react'
import type { NextPage } from 'next'
import {
	chakra,
	Box,
	useColorModeValue,
	Button,
	Stack,
	Image,
	Text,
	Icon,
} from '@chakra-ui/react'
import Link from 'next/link'

const IndexHero: NextPage = () => {
	return (
		<Box px={8} py={24} mx='auto'>
			<Box
				w={{ base: 'full', md: 11 / 12, xl: 9 / 12 }}
				mx='auto'
				textAlign={{ base: 'left', md: 'center' }}
				display='grid'
				placeContent='center'
				minH='60vh'
			>
				<chakra.h1
					mb={6}
					fontSize={{ base: '4xl', md: '7xl' }}
					fontWeight='semibold'
					lineHeight='none'
					letterSpacing={{ base: 'normal', md: 'tight' }}
					color={useColorModeValue('gray.700', 'gray.100')}
				>
					Easy and safe{' '}
					<Text
						display={{ base: 'block', lg: 'inline' }}
						w='full'
						bgClip='text'
						bgGradient='linear(to-r, green.400,purple.500)'
						fontWeight='semibold'
					>
						tokenized
					</Text>{' '}
					transactions, done well.
				</chakra.h1>
				<chakra.p
					px={{ base: 0, lg: 24 }}
					mb={6}
					fontSize={{ base: 'lg', md: 'xl' }}
					color={useColorModeValue('gray.600', 'gray.300')}
				>
					Easily send and receive money across borders, and more. Use loyalty,
					royalty or bonus tokens for rewards. Create and manage your own
					tokens.
				</chakra.p>
				<Stack
					direction={{ base: 'column', sm: 'row' }}
					mb={{ base: 4, md: 8 }}
					spacing={2}
					justifyContent={{ sm: 'left', md: 'center' }}
				>
					<Link href='/register'>
						<Button
							as='a'
							variant='solid'
							colorScheme='blue'
							display='inline-flex'
							alignItems='center'
							justifyContent='center'
							w={{ base: 'full', sm: 'auto' }}
							mb={{ base: 2, sm: 0 }}
							size='lg'
							cursor='pointer'
						>
							Register
						</Button>
					</Link>
					<Link href='/login'>
						<Button
							as='a'
							colorScheme='facebook'
							display='inline-flex'
							alignItems='center'
							justifyContent='center'
							w={{ base: 'full', sm: 'auto' }}
							mb={{ base: 2, sm: 0 }}
							size='lg'
							cursor='pointer'
						>
							Log in
						</Button>
					</Link>
				</Stack>
			</Box>
		</Box>
	)
}

export default IndexHero



