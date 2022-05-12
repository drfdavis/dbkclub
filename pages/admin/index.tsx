import { Box, Button, Heading, Input, Select, FormErrorMessage, useToast } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import AdminDashboard from '../../layout/AdminLayout'
import { GetSessionParams, signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { PrismaClient } from '@prisma/client'
import { GetServerSideProps } from 'next'
import { useForm } from 'react-hook-form'

export default function AdminPage({ users }: { users: any }) {
	const router = useRouter();
	const { data: session } = useSession();
	const toast = useToast();

	const { handleSubmit, register, formState } = useForm()
	const { isSubmitting, errors } = formState;

	const onSubmit = async (data: any) => {
		await fetch('/api/token', {
			method: 'POST',
			body: JSON.stringify(data),
		}).then(res => {
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
		}).catch(err => {
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
				<form onSubmit={handleSubmit(onSubmit)}>
					<Box mt={10} maxW={{ base: '90%', md: '70%', lg: '40%' }} m='0 auto'>
						<Heading size='lg' mb={10}>
							Add Tokens
						</Heading>
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
							<option value='Bonus'>Bonus</option>
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
					</Box>
				</form>
			</AdminDashboard>
		</div>
	)
}



export const getServerSideProps: GetServerSideProps = async (
	context: GetSessionParams
) => {
	let prisma = new PrismaClient()
	const users = await prisma.user.findMany({
		select: {
			id: true,
			email: true,
		}
	})

	return {
		props: {
			users: users,
		},
	}
}