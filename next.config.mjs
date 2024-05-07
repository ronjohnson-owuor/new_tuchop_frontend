/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'machizi.s3.amazonaws.com',
			  }],
	  },
	  typescript:{
		ignoreBuildErrors:true
	  }
};

export default nextConfig;
