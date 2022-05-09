import { IconButton, useColorMode } from '@chakra-ui/react'
import { RiMoonFill, RiSunLine } from 'react-icons/ri'

const ThemeToggle = () => {
	const { colorMode, toggleColorMode } = useColorMode()

	return (
		<IconButton
			aria-label='theme toggle'
			icon={colorMode === 'light' ? <RiMoonFill /> : <RiSunLine />}
			onClick={toggleColorMode}
            backgroundColor='transparent'
            color={colorMode === 'light' ? 'gray.600' : 'gray.200'}
		/>
	)
}

export default ThemeToggle
