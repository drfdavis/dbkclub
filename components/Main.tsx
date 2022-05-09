import { Box } from '@chakra-ui/react'
import React from 'react'

export default function Main({ children }: { children: React.ReactNode }) {
	return (
		<Box maxW='130rem' margin='0 auto'>
			{children}
		</Box>
	)
}
