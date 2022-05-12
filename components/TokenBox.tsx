import { StarIcon } from '@chakra-ui/icons'
import { Box, Badge, useColorMode } from '@chakra-ui/react'

type TokenProps = {
	name: string;
	amount: string;
	units?: string;
}

export default function TokenBox({ name, amount, units }: TokenProps) {
	const { colorMode } = useColorMode();
	const calculatedUnits = (Number(amount) * 1) / 20000
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

				<Box my={3} fontWeight='bold'>
					{amount}
				</Box>

				<Box my={3}>
					{calculatedUnits}
					<Box
						as='span'
						color={colorMode === 'light' ? 'gray.600' : 'gray.200'}
						fontSize='sm'
						ml={2}
					>
						units
					</Box>
				</Box>

				{/* <Box display='flex' mt='2' alignItems='center'>
					<Box as='span' color='gray.600' fontSize='sm'>
						{units} units
					</Box>
				</Box> */}
			</Box>
		</Box>
	)
}
