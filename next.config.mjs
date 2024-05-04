/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'machizi.s3.amazonaws.com',
			  }],
	  },
};

export default nextConfig;
