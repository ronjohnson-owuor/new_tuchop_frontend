import React from 'react'
import Navigation from '../components/navigation/Navigation'
import { about} from '../components/container'
import Image from 'next/image'
import Footer from '../components/footer/Footer'

function page() {
  return (
	<div className='w-full min-h-screen'>
		<Navigation/>
		
		<div className='grid grid-cols-1 md:grid-cols-2 gap-4 my-10'>
			<div className='flex items-center justify-center'>
				<Image src={about} width={250}  alt="our logo"/>
			</div>
			<div className='w-[80%] mx-10 md:mx-0'>
				<h1 className='font-bold text-primary my-4 text-xl'>about us</h1>
				<p>Tuchop AI is a website based in kenya and operate worldwide.We help students to study and prepare for their excamination with ease.We provide notes,AI assistance and more.We work with student and teachers to provide the best modern education to students all over the world.</p>
				<h1 className='font-bold text-primary my-4 text-xl'>our goal</h1>
				<p>Our goal is to make education accessible to people anywhere in the world.We would like everyone to be well educated as their peers and knowledgeble using the latest technology and innovation.</p>
				<div className='flex flex-col my-4 text-dSecondary font-bold'>
				<span>written by,</span>
				<span>Ronjohnson Owuor,</span>	
				<span>CEO, ZERON LABS</span>			
			</div>
			</div>
		</div>
		<Footer/>
	</div>
  )
}

export default page