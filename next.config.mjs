/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'machizi.s3.amazonaws.com',
			  },
			  {
				protocol: 'https',
				hostname: ' lh3.googleusercontent.com',
			  }		  
			],
			
	  },
	  typescript:{
		ignoreBuildErrors:true
	  },
	  eslint:{
		ignoreDuringBuilds:true
	  }
};

export default nextConfig;
