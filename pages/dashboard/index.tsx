import {
	Avatar,
	Box,
	Collapse,
	Drawer,
	DrawerContent,
	DrawerOverlay,
	Flex,
	Icon,
	IconButton,
	Input,
	InputGroup,
	InputLeftElement,
	SimpleGrid,
	Text,
	useColorModeValue,
	useDisclosure,
} from '@chakra-ui/react'
import { FaBell, FaClipboardCheck, FaRss } from 'react-icons/fa'
import { AiFillGift } from 'react-icons/ai'
import { BsGearFill } from 'react-icons/bs'
import { FiMenu, FiSearch } from 'react-icons/fi'
import { HiCode, HiCollection } from 'react-icons/hi'
import { MdHome, MdKeyboardArrowRight } from 'react-icons/md'
import React from 'react'
import DashboardLayout from '../../layout/Layout'
import TokenBox from '../../components/TokenBox'

export default function DashboardPage() {
	return (
		<div>
			<DashboardLayout>
				{/* <Text>T</Text> */}
				<Box mt={10}>
					<SimpleGrid
						flexWrap='wrap'
						columns={{ base: 1, sm: 2, md: 3 }}
						maxW={{ base: '100%', md: '90%' }}
						margin='0 auto'
					>
						<TokenBox name='Royalty' transactions='23' units='200' />
						<TokenBox name='Loyalty' transactions='3' units='20' />
						<TokenBox name='Bonuses' transactions='17' units='140' />
					</SimpleGrid>
				</Box>
			</DashboardLayout>
		</div>
	)
}
