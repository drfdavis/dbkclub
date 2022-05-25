import { StarIcon } from '@chakra-ui/icons'
import { Box, Badge, useColorMode, Text } from '@chakra-ui/react'

type TokenProps = {
	name: string;
	amount: string;
}

type RoyaltyProps = {
	name: string;
	amount: string;
	APR: number;
}

export const RoyaltyBox = ({ name, amount, APR }: RoyaltyProps) => {
	const { colorMode } = useColorMode();
	const calculatedUnits = (Number(amount) * 1) / 20000
	const calculatedBonus = (calculatedUnits / Number(amount)) * (APR / 100);
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
					<Box
						as='p'
						color={colorMode === 'light' ? 'gray.600' : 'gray.200'}
						fontSize='sm'
						mr={2}
						fontWeight='bold'
						textTransform='uppercase'
					>
						units
					</Box>
					<Text fontSize={13}>{calculatedUnits}</Text>
				</Box>

				<Box my={3}>
					<Box
						as='p'
						color={colorMode === 'light' ? 'gray.600' : 'gray.200'}
						fontSize='sm'
						mr={2}
						fontWeight='bold'
						textTransform='uppercase'
					>
						bonus
					</Box>
					<Text fontSize={13}>{calculatedBonus}</Text>
				</Box>
			</Box>
		</Box>
	)
}