import React from 'react'
import Navigation from '../components/navigation/Navigation'

function page() {
  return (
	<div className='w-full min-h-screen bg-lBackground dark:bg-dBackground text-lText dark:text-dText'>
		<Navigation/>
	</div>
  )
}

export default page;