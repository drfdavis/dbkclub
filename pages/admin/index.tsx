import {
	Box,
	Button,
	Heading,
	Input,
	Select,
	FormErrorMessage,
	useToast,
	Badge,
} from '@chakra-ui/react'
import React from 'react'
import AdminDashboard from '../../layout/AdminLayout'
import { GetSessionParams } from 'next-auth/react'
import { useRouter } from 'next/router'
import { prisma } from '../../lib/prisma/prisma'
import { GetServerSideProps } from 'next'
import { useForm } from 'react-hook-form'
import APR from '../../components/APR'

export default function AdminPage({
	users,
	totalTokens,
}: {
	users: any
	totalTokens: any
}) {
	const toast = useToast()

	const reducedRoyalty = totalTokens.reduce(function (
		accumulator: any,
		currentValue: any
	) {
		return accumulator + currentValue.royalty
	},
	0)

	const reducedLoyalty = totalTokens.reduce(function (
		accumulator: any,
		currentValue: any
	) {
		return accumulator + currentValue.loyalty
	},
	0)

	const { handleSubmit, register, formState } = useForm()
	const { isSubmitting, errors } = formState

	const onSubmit = async (data: any) => {
		await fetch('/api/token', {
			method: 'POST',
			body: JSON.stringify(data),
		})
			.then(res => {
				if (res.status === 200) {
					toast({
						title: 'Success',
						description: 'Token Added',
						status: 'success',
						duration: 3000,
						isClosable: true,
						position: 'top-end',
					})
				} else {
					toast({
						title: 'Error',
						description: 'Something went wrong',
						status: 'error',
						duration: 3000,
						isClosable: true,
						position: 'top-end',
					})
				}
			})
			.catch(err => {
				console.log(err)
			})
	}

	// useEffect(() => {
	// 	if (session?.user?.email !== 'edeygingeram@gmail.com') {
	// 		router.push('/app')
	// 	}
	// }, [ session, router ])

	return (
		<div>
			<AdminDashboard>
				<Box mt={10} maxW={{ base: '90%', md: '70%', lg: '40%' }} m='0 auto'>
					<Box flex='row' flexWrap='wrap'>
						<Heading as='h4' size='xs' mb={4}>
							Total Royalty In circulation:{' '}
							<Badge colorScheme='purple'>{reducedRoyalty}</Badge>
						</Heading>
						<Heading as='h4' size='xs' mb={4}>
							Total Loyalty In circulation:{' '}
							<Badge colorScheme='blue'>{reducedLoyalty}</Badge>
						</Heading>
					</Box>
					<Heading size='lg' mb={10}>
						Add Tokens
					</Heading>
					<form onSubmit={handleSubmit(onSubmit)}>
						<Select
							variant='filled'
							placeholder='Select User'
							{...register('user', { required: 'Name is requred' })}
						>
							{users.map((user: any) => (
								<option key={user.id} value={user.email}>
									{user.email}
								</option>
							))}
						</Select>
						<FormErrorMessage>
							{errors.user && errors.user.message}
						</FormErrorMessage>
						<Select
							variant='filled'
							placeholder='Select Token'
							mt={10}
							{...register('tokenType', { required: 'Token type is required' })}
						>
							<option value='Royalty'>Royalty</option>
							<option value='Loyalty'>Loyalty</option>
							{/* <option value='Bonus'>Bonus</option> */}
						</Select>
						<FormErrorMessage>
							{errors.tokenType && errors.tokenType.message}
						</FormErrorMessage>
						<Input
							placeholder='Amount'
							variant='filled'
							type='number'
							// So that floating point numbers are allowed
							step='0.01'
							min='0'
							my={10}
							{...register('amount', { required: 'Amount is requred' })}
						/>
						<FormErrorMessage>
							{errors.amount && errors.amount.message}
						</FormErrorMessage>
						<Button
							w='full'
							bg='blue.500'
							color='white'
							_active={{
								bg: 'blue.700',
							}}
							_hover={{
								bg: 'blue.600',
							}}
							type='submit'
							isLoading={isSubmitting}
							loadingText='Stay put..'
						>
							Add Token
						</Button>
					</form>
				</Box>
				{/* APR Component */}
				<APR />
				{/* APR Component */}
			</AdminDashboard>
		</div>
	)
}

export const getServerSideProps: GetServerSideProps = async (
	context: GetSessionParams
) => {
	const users = await prisma.user.findMany({
		select: {
			id: true,
			email: true,
		},
	})

	const totalTokens = await prisma.user.findMany({
		select: {
			royalty: true,
			loyalty: true,
		},
	})

	return {
		props: {
			users: users,
			totalTokens: totalTokens,
		},
	}
}
