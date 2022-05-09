import { StarIcon } from '@chakra-ui/icons'
import { Box, Badge } from '@chakra-ui/react'

type TokenProps = {
	name: string
	units: string
	transactions: string
}

export default function TokenBox({ name, units, transactions }: TokenProps) {
	return (
		<Box
			maxW={{ base: '300px', sm: '250px' }}
			borderWidth='1px'
			borderRadius='lg'
			overflow='hidden'
			m={2}
			cursor='pointer'
			_hover={{
				transition: 'all 0.2s ease-in-out',
				borderColor: 'gray.300',
			}}
		>
			<Box
				p='6'
				w='full'
				display='flex'
				flexDirection='column'
				alignContent='center'
				justifyContent='center'
			>
				<Box
					mt='1'
					fontWeight='semibold'
					as='h4'
					lineHeight='tight'
					isTruncated
					fontSize='larger'
				>
					{name}
				</Box>

				<Box my={3}>
					{units}
					<Box as='span' color='gray.300' fontSize='sm' ml={2}>
						units
					</Box>
				</Box>

				<Box display='flex' mt='2' alignItems='center'>
					<Box as='span' color='gray.600' fontSize='sm'>
						{transactions} transactions
					</Box>
				</Box>
			</Box>
		</Box>
	)
}
