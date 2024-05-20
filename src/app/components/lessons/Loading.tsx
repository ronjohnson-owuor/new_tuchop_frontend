import React, { useEffect } from 'react'

function Loading() {

  return (
	<div className='w-full h-screen grid place-items-center'>
		<div className='shadow-md p-4 rounded-md'>
		<p className='text-sm tracking-wider font-bold animate-bounce '>
			Loading..
		</p>
		</div>
	</div>
  )
}

export default Loading