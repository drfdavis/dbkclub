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
	Flex,
} from '@chakra-ui/react'
import Link from 'next/link'
import { signIn, useSession } from 'next-auth/react'
import { AiFillGithub } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'

const IndexHero: NextPage = () => {
	const { data: session, status } = useSession()
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
					{!session?.user ? (
						<>
							<Button
								onClick={() => signIn('google', { callbackUrl: '/app' })}
								leftIcon={<FcGoogle />}
								isLoading={status === 'loading'}
								disabled={status === 'loading'}
								size='sm'
								px={5}
								bg='blue.400'
								color='white'
								variant='outline'
								_hover={{
									bg: 'blue.500',
								}}
								_active={{
									bg: 'blue.600',
								}}
							>
								Continue with Google
							</Button>
						</>
					) : (
						<>
							<Link href='/app' passHref>
								<Button size='sm' bg='blue.500' color='white' _hover={{
									bg: 'blue.600',
								}} _active={{
									bg: 'blue.700',
								}} px={5}>
									Dashboard
								</Button>
							</Link>
						</>
					)}
				</Stack>
			</Box>
		</Box>
	)
}

export default IndexHero







