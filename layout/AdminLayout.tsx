import {
	Avatar,
    Badge,
	Box,
	Drawer,
	DrawerContent,
	DrawerOverlay,
	Flex,
	Icon,
	IconButton,
	Text,
	useColorModeValue,
	useColorMode,
	useDisclosure,
} from '@chakra-ui/react'
import { useEffect } from 'react'
import { FaClipboardCheck, FaHistory } from 'react-icons/fa'
import { MdAccountCircle } from 'react-icons/md'
import { AiFillGift } from 'react-icons/ai'
import { BsGearFill } from 'react-icons/bs'
import { FiMenu, FiUsers } from 'react-icons/fi'
import { HiCode } from 'react-icons/hi'
import { RiLogoutBoxFill } from 'react-icons/ri'
import { MdHome, MdKeyboardArrowRight } from 'react-icons/md'
import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import ThemeToggle from '../components/ThemeToggle'
import { signOut, useSession } from 'next-auth/react'

export default function AdminDashboard({
	children,
}: {
	children: React.ReactNode
}) {

	const { data: session } = useSession();
	const router = useRouter();
	const { colorMode } = useColorMode();

	const sidebar = useDisclosure()
	const integrations = useDisclosure()
	const color = useColorModeValue('gray.600', 'gray.300')

	const NavItem = (props: any) => {
		const { icon, children, ...rest } = props
		return (
			<Flex
				align='center'
				px='4'
				pl='4'
				py='3'
				cursor='pointer'
				color={useColorModeValue('inherit', 'gray.400')}
				_hover={{
					bg: useColorModeValue('gray.100', 'gray.900'),
					color: useColorModeValue('gray.900', 'gray.200'),
				}}
				role='group'
				fontWeight='semibold'
				transition='.15s ease'
				{...rest}
			>
				{icon && (
					<Icon
						mx='2'
						boxSize='4'
						_groupHover={{
							color: color,
						}}
						as={icon}
					/>
				)}
				{children}
			</Flex>
		)
	}

	const SidebarContent = (props: any) => (
		<Box
			as='nav'
			pos='fixed'
			top='0'
			left='0'
			zIndex='sticky'
			h='full'
			pb='10'
			overflowX='hidden'
			overflowY='auto'
			bg={useColorModeValue('white', 'gray.800')}
			borderColor={useColorModeValue('inherit', 'gray.700')}
			borderRightWidth='1px'
			w='60'
			{...props}
		>
			<Flex px='4' py='5' align='center'>
				{/* LOGO */}
				<Text
					fontSize='2xl'
					ml='2'
					color={useColorModeValue('brand.500', 'white')}
					fontWeight='semibold'
				>
					LOGO
				</Text>
			</Flex>
			<Flex
				direction='column'
				as='nav'
				fontSize='sm'
				color='gray.600'
				aria-label='Main Navigation'
				height='90%'
			>
				<Link href='/admin'>
					<NavItem icon={MdHome}>Home</NavItem>
				</Link>
				<Link href='/admin/users'>
					<NavItem icon={FiUsers}>Users</NavItem>
				</Link>
				{/* <Link href='/app/history'>
					<NavItem icon={FaHistory}>History</NavItem>
				</Link> */}
				<Box mt='auto' onClick={() => signOut({ callbackUrl: '/' })}>
					<NavItem icon={RiLogoutBoxFill}>Logout</NavItem>
				</Box>
				{/* I might use this later */}

				{/* <NavItem icon={HiCode} onClick={integrations.onToggle}>
					Integrations
					<Icon
						as={MdKeyboardArrowRight}
						ml='auto'
						transform={integrations.isOpen ? 'rotate(90deg)' : undefined}
					/>
				</NavItem>
				<Collapse in={integrations.isOpen}>
					<NavItem pl='12' py='2'>
						Shopify
					</NavItem>
					<NavItem pl='12' py='2'>
						Slack
					</NavItem>
					<NavItem pl='12' py='2'>
						Zapier
					</NavItem>
				</Collapse>
				<NavItem icon={AiFillGift}>Changelog</NavItem>
				<NavItem icon={BsGearFill}>Settings</NavItem> */}
			</Flex>
		</Box>
	)

	
	// useEffect(() => {		
	// 	if (session?.user?.email?.includes('ad') || session?.user?.email?.includes('admin')) {
	// 		return router.push('/app')
	// 	}
	// }, [router, session])
	return (
		<Box
			as='section'
			bg={colorMode === 'light' ? 'gray.50' : 'gray.700'}
			minH='100vh'
		>
			<SidebarContent display={{ base: 'none', md: 'unset' }} />
			<Drawer
				isOpen={sidebar.isOpen}
				onClose={sidebar.onClose}
				placement='left'
			>
				<DrawerOverlay />
				<DrawerContent>
					<SidebarContent w='full' borderRight='none' />
				</DrawerContent>
			</Drawer>
			<Box ml={{ base: 0, md: 60 }} transition='.3s ease'>
				<Flex
					as='header'
					align='center'
					justify='space-between'
					w='full'
					px='4'
					bg={colorMode === 'light' ? 'white' : 'gray.800'}
					borderBottomWidth='1px'
					borderColor={colorMode === 'light' ? 'inherit' : 'gray.700'}
					h='14'
				>
					<IconButton
						aria-label='Menu'
						display={{ base: 'inline-flex', md: 'none' }}
						onClick={sidebar.onOpen}
						icon={<FiMenu />}
						size='sm'
					/>
					<Box display='flex'>
						<Badge colorScheme='green'>Admin</Badge>
					</Box>

					<Flex align='center'>
						<Avatar src={session?.user?.user.email === "edeygingeram@gmail.com" ? session?.user?.image as string : "/demo.png"} mr={2} size='sm' />
						<ThemeToggle />
					</Flex>
				</Flex>

				<Box as='main' p='4'>
					{/* User details here */}
					<Box rounded='md' minH='100%'>
						{children}
					</Box>
				</Box>
			</Box>
		</Box>
	)
}
