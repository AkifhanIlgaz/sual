/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		optimizePackageImports: ['@heroui/react', '@heroui/theme']
	}
}

module.exports = nextConfig
