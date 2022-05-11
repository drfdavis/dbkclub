import { Box, Button, Heading, Input, Select } from '@chakra-ui/react'
import React from 'react'
import AdminDashboard from '../../layout/AdminLayout'

export default function AdminPage() {
	return (
		<div>
			<AdminDashboard>
				{/* <Text>T</Text> */}
				<Box mt={10} maxW={{ base: '90%', md: '70%', lg: '40%' }} m='0 auto'>
                    <Heading size='lg' mb={10}>Add Tokens</Heading>
					<Select variant='filled' placeholder='Select User'>
						<option value='royalty'>Osama Bin Laden</option>
						<option value='loyalty'>Houdini</option>
						<option value='bonuses'>Aquaman</option>
						<option value='bonuses'>Batman</option>
						<option value='bonuses'>JCOLE</option>
						<option value='bonuses'>Superman</option>
						<option value='bonuses'>Future</option>
						<option value='bonuses'>Travis</option>
						<option value='bonuses'>Scott</option>
						<option value='bonuses'>Quavo</option>
						<option value='bonuses'>Huncho</option>
						<option value='bonuses'>Takeoff</option>
						<option value='bonuses'>Offset</option>
						<option value='bonuses'>Kendrick</option>
						<option value='bonuses'>Lamar</option>
						<option value='bonuses'>EarthGang</option>
						<option value='bonuses'>JID</option>
						<option value='bonuses'>Lennox</option>
					</Select>
					<Select variant='filled' placeholder='Select Token' mt={10}>
						<option value='royalty'>Royalty</option>
						<option value='loyalty'>Loyalty</option>
						<option value='bonuses'>Bonuses</option>
					</Select>
					<Input placeholder='Amount' variant='filled' type='number' my={10} />
                    <Button w='full' bg='blue.500' color='white' _active={{
                        bg: 'blue.700',
                    }} _hover={{
                        bg: 'blue.600'
                    }}>Add Token</Button>

				</Box>
			</AdminDashboard>
		</div>
	)
}
