import {
	Box,
	Button,
	Flex,
	Heading,
	Image,
	Stack,
	Text,
	useBreakpointValue,
} from '@chakra-ui/react'

import { signIn, useSession } from 'next-auth/react'
import Link from 'next/link'

export default function SplitScreen() {
	const { data: session, status } = useSession();
	console.log(session);
	
	return (
		<Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
			<Flex
				p={8}
				flex={1}
				align={'center'}
				justify={'center'}
				position='relative'
			>
				{/* <Text position='absolute' top={10} left={10} display='block' mb={2}>
					yoo
				</Text> */}
				<Box
					display='flex'
					alignContent='center'
					alignItems='center'
					position='absolute'
					top={10}
					left={10}
					mb={2}
				>
					{/* <Image src='/dbk.png' width={10} alt='Hero' /> */}
					{/* <Text display='inline-block' textTransform='uppercase' fontWeight='semibold'>Diamond Back</Text> */}
				</Box>
				<Stack spacing={6} w={'full'} maxW={'lg'}>
					{/* <Text mt={'-200'}>yo</Text> */}
					<Heading
						fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}
						mt={{ base: 20, md: 0 }}
					>
						<Text
							as={'span'}
							position={'relative'}
							_after={{
								content: "''",
								width: 'full',
								height: useBreakpointValue({ base: '20%', md: '30%' }),
								position: 'absolute',
								bottom: 1,
								left: 0,
								bg: 'blue.400',
								zIndex: -1,
							}}
						>
							Fast
						</Text>
						<br />{' '}
						<Text color={'blue.400'} as={'span'}>
							Tokenized Transactions
						</Text>{' '}
					</Heading>
					<Text fontSize={{ base: 'md', lg: 'lg' }} color={'gray.500'}>
						Sign in to enjoy the benefits of the Diamond Back Token Systems
					</Text>
					<Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
						{session?.user?.user ? (
							<Link href='/app'>
								<Button
									rounded={'full'}
									bg={'blue.400'}
									color={'white'}
									_hover={{
										bg: 'blue.500',
									}}
									width={{ base: 'full', sm: '50%', md: '30%' }}
								>
									Dashboard
								</Button>
							</Link>
						) : (
							<Button
								rounded={'full'}
								bg={'blue.400'}
								color={'white'}
								_hover={{
									bg: 'blue.500',
								}}
								width={{ base: 'full', sm: '50%', md: '30%' }}
								onClick={() => signIn()}
							>
								Log In
							</Button>
						)}
					</Stack>
				</Stack>
			</Flex>
			<Flex flex={1}>
				<Image
					alt={'Login Image'}
					objectFit={'cover'}
					src={'/animated-wave.svg'}
				/>
			</Flex>
		</Stack>
	)
}
