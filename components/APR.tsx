import {
	Box,
	Button,
	Heading,
	Input,
	FormErrorMessage,
	useToast,
} from '@chakra-ui/react'
import React from 'react'
import { useForm } from 'react-hook-form'

export default function APR() {
	const toast = useToast()

	const { handleSubmit, register, formState } = useForm()
	const { isSubmitting, errors } = formState

	const onAdjustAPR = async (data: any) => {        
		await fetch('/api/adjust-apr', {
			method: 'POST',
			body: JSON.stringify(data),
		})
			.then(res => {
				if (res.status === 200) {
					toast({
						title: 'Success',
						description: 'APR Adjusted',
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
    

	return (
		<div>

				<Box mt={10} maxW={{ base: '90%', md: '70%', lg: '40%' }} m='0 auto'>
					<Heading size='md' mt={10}>
						Adjust APR
					</Heading>
					<form onSubmit={handleSubmit(onAdjustAPR)}>
						<Input
							placeholder='Amount'
							variant='filled'
							type='number'
							// So that floating point numbers are allowed
							step='0.01'
							min='0'
							max='100'
							my={10}
							{...register('apr', { required: 'APR is required' })}
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
							Adjust APR
						</Button>
					</form>
				</Box>
		</div>
	)
}