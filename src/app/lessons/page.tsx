import React from 'react'
import Navigation from '../components/navigation/Navigation'
import Lesson from '../components/lessons/Lesson'
import { Toaster } from 'sonner'

function page() {
	
	
	
	
	
	
  return (
	<div>
		<Toaster position='top-center'/>
		<Navigation/>
		<Lesson/>
	</div>
  )
}

export default page