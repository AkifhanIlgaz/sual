import '@/styles/globals.css'
import clsx from 'clsx'
import { Metadata, Viewport } from 'next'

import { fontSans } from '@/config/fonts'
import { siteConfig } from '@/config/site'
// import { Image } from '@heroui/image'
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
			<body className={clsx('min-h-screen text-foreground bg-[conic-gradient(at_bottom_left,_var(--tw-gradient-stops))] from-sky-900 via-zinc-800 to-pink-800 font-sans antialiased', fontSans.variable)}>
				<Providers themeProps={{ attribute: 'class', defaultTheme: 'dark' }}>
					<div className="relative flex flex-col items-center justify-center  h-screen">
						{/* <Image src={`logo.png`} alt={'logo'} width={`250`} height={`250`} className="brightness-0 invert" /> */}
						<main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">{children}</main>
					</div>
				</Providers>
			</body>
		</html>
	)
}
