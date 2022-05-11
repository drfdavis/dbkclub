import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import Main from '../components/Main'
import 'nprogress/nprogress.css'
import Router from 'next/router'
import NProgress from 'nprogress'
import { useEffect } from 'react'
import { SessionProvider } from 'next-auth/react'

function MyApp({ Component, pageProps: { session, ...pageProps }, }: AppProps) {
	useEffect(() => {
		const handleRouteStart = () => NProgress.start()
		const handleRouteDone = () => NProgress.done()

		Router.events.on('routeChangeStart', handleRouteStart)
		Router.events.on('routeChangeComplete', handleRouteDone)
		Router.events.on('routeChangeError', handleRouteDone)

		return () => {
			// Make sure to remove the event handler on unmount!
			Router.events.off('routeChangeStart', handleRouteStart)
			Router.events.off('routeChangeComplete', handleRouteDone)
			Router.events.off('routeChangeError', handleRouteDone)
		}
	}, [])
  return (
		<ChakraProvider>
			<SessionProvider session={session}>
				<Main>
					<Component {...pageProps} />
				</Main>
			</SessionProvider>
		</ChakraProvider>
	)
}

export default MyApp









