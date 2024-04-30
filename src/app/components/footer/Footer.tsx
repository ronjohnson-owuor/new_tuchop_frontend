import Link from 'next/link'
import React from 'react'

function Footer() {
  return (
	<div className="w-full flex items-end  sm:items-center justify-around gap-2 flex-wrap py-2">
		<span>&copy;zeronlabs</span>
		<ul className="flex items-center justify-around gap-4 flex-wrap">
			<Link href='/terms'>terms</Link>
			<Link href='/contact-us'>contact us</Link>
			<Link href='/pricing' className="text-primary">upgrade</Link>
		</ul>
	</div>
  )
}

export default Footer