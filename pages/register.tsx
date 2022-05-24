import {
	Flex,
	Box,
	FormControl,
	FormLabel,
	Input,
	InputGroup,
	HStack,
	InputRightElement,
	Stack,
	Button,
	Heading,
	Text,
	useColorModeValue,
} from '@chakra-ui/react'
import Link from 'next/link'
import { useState } from 'react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { AiOutlineGoogle } from 'react-icons/ai'

import { useForm, SubmitHandler } from 'react-hook-form'

type Inputs = {
	name: string;
	email: string;
	password: string;
}

export default function SignupCard() {

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<Inputs>()
	const onSubmit: SubmitHandler<Inputs> = data => console.log(data)

	const [showPassword, setShowPassword] = useState(false)

	return (
		<form onSubmit={handleSubmit(onsubmit)}>
			<Flex
				minH={'100vh'}
				align={'center'}
				justify={'center'}
				bg={useColorModeValue('gray.50', 'gray.800')}
			>
				<Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
					<Stack align={'center'}>
						<Heading fontSize={'4xl'} textAlign={'center'}>
							Sign up
						</Heading>
						<Text fontSize={'lg'} color={'gray.600'}>
							to enjoy all of our cool features ✌️
						</Text>
					</Stack>
					<Box
						rounded={'lg'}
						bg={useColorModeValue('white', 'gray.700')}
						boxShadow={'lg'}
						p={8}
					>
						<Stack spacing={4}>
							<Stack direction={{ base: 'column', md: 'row' }}>
								{/* <Box>
								<FormControl id='firstName' isRequired>
									<FormLabel>First Name</FormLabel>
									<Input type='text' />
								</FormControl>
							</Box> */}
								<FormControl
									id='name'
									isRequired
									{...register('name', { required: true })}
								>
									<FormLabel>Name</FormLabel>
									<Input type='text' />
								</FormControl>
							</Stack>
							<FormControl
								id='email'
								isRequired
								{...register('email', { required: true })}
							>
								<FormLabel>Email address</FormLabel>
								<Input type='email' />
							</FormControl>
							<FormControl id='password' isRequired>
								<FormLabel>Password</FormLabel>
								<InputGroup>
									<Input
										type={showPassword ? 'text' : 'password'}
										{...register('password', { required: true })}
									/>
									<InputRightElement h={'full'}>
										<Button
											variant={'ghost'}
											onClick={() =>
												setShowPassword(showPassword => !showPassword)
											}
										>
											{showPassword ? <ViewIcon /> : <ViewOffIcon />}
										</Button>
									</InputRightElement>
								</InputGroup>
							</FormControl>
							<Stack spacing={10} pt={2}>
								<Button
									loadingText='Submitting'
									bg={'blue.400'}
									color={'white'}
									_hover={{
										bg: 'blue.500',
									}}
									type='submit'
								>
									Sign up
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
							</Stack>
							<Stack pt={6}>
								<Text align={'center'}>
									Already a user?{' '}
									<Text display='inline' color={'blue.400'}>
										<Link href='/login'>Login</Link>
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
					</Box>
				</Stack>
			</Flex>
		</form>
	)
}
