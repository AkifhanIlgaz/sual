import '@/styles/globals.css'
import clsx from 'clsx'
import { Metadata, Viewport } from 'next'

import { fontSans } from '@/config/fonts'
import { siteConfig } from '@/config/site'
// import { Image } from '@heroui/image'
import { Analytics } from '@vercel/analytics/next'
import { Providers } from './providers'

export const metadata: Metadata = {
	title: {
		default: siteConfig.name,
		template: `%s - ${siteConfig.name}`
	},
	description: siteConfig.description,
	icons: {
		icon: '/favicon.ico'
	}
}

export const viewport: Viewport = {
	themeColor: [
		{ media: '(prefers-color-scheme: light)', color: 'white' },
		{ media: '(prefers-color-scheme: dark)', color: 'black' }
	]
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html suppressHydrationWarning lang="en">
			<head />
			<body className={clsx('min-h-screen text-foreground  font-sans antialiased', fontSans.variable)}>
				<Providers themeProps={{ attribute: 'class', defaultTheme: 'light' }}>
					<Analytics />
					<div className="relative flex flex-col items-center justify-center min-h-screen">
						{/* <Image src={`logo.png`} alt={'logo'} width={`250`} height={`250`} className="brightness-0 invert" /> */}
						<main className="container mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 pt-8 sm:pt-16 flex-grow">{children}</main>
					</div>
				</Providers>
			</body>
		</html>
	)
}
