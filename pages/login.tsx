import {
	Flex,
	Box,
	FormControl,
	FormLabel,
	Input,
	Checkbox,
	Stack,
	Button,
	Heading,
	Text,
	useColorModeValue,
} from '@chakra-ui/react'

import Link from 'next/link'
import { AiOutlineGoogle } from 'react-icons/ai'

export default function SimpleCard() {
	return (
		<Flex
			minH={'100vh'}
			align={'center'}
			justify={'center'}
			bg={useColorModeValue('gray.50', 'gray.800')}
		>
			<Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
				<Stack align={'center'}>
					<Heading fontSize={'4xl'}>Sign in to your account</Heading>
					<Text fontSize={'lg'} color={'gray.600'}>
						to continue where you left off{' '}
						⚡
					</Text>
				</Stack>
				<Box
					rounded={'lg'}
					bg={useColorModeValue('white', 'gray.700')}
					boxShadow={'lg'}
					p={8}
				>
					<Stack spacing={4}>
						<FormControl id='email'>
							<FormLabel>Email address</FormLabel>
							<Input type='email' />
						</FormControl>
						<FormControl id='password'>
							<FormLabel>Password</FormLabel>
							<Input type='password' />
						</FormControl>
						<Stack spacing={10}>
							<Stack
								direction={{ base: 'column', sm: 'row' }}
								align={'start'}
								justify={'space-between'}
							>
								<Checkbox>Remember me</Checkbox>
								<Link href='/'>
									<Text color={'blue.400'}>Forgot password?</Text>
								</Link>
							</Stack>
							<Button
								bg={'blue.400'}
								color={'white'}
								_hover={{
									bg: 'blue.500',
								}}
							>
								Sign in
							</Button>
							<Button
								leftIcon={<AiOutlineGoogle />}
								loadingText='Submitting'
								bg={'blue.400'}
								color={'white'}
								_hover={{
									bg: 'blue.500',
								}}
							>
								Continue with Google
							</Button>
							<Stack>
								<Text align={'center'}>
									No account?{' '}
									<Text display='inline' color={'blue.400'}>
										<Link href='/register'>Register</Link>
									</Text>{' '}
								</Text>
							</Stack>
							<Stack pt={0}>
								<Text
									display='inline'
									fontWeight='semibold'
									textTransform='uppercase'
									color={'blue.400'}
								>
									<Link href='/'>Return Home</Link>
								</Text>{' '}
							</Stack>
						</Stack>
					</Stack>
				</Box>
			</Stack>
		</Flex>
	)
}
