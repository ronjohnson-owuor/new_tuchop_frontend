import React from 'react'
import Navigation from '../components/navigation/Navigation'
import Image from 'next/image'
import { contactus } from '../components/container'
import { RiMailLine, RiPhoneLine} from 'react-icons/ri'
import Link from 'next/link'
import Footer from '../components/footer/Footer'

function page() {
  return (
	<div className='bg-lBackground dark:bg-dBackground text-lText dark:text-dText'>
		<Navigation/>
	<div className='flex flex-col sm:flex-row  w-full items-center justify-center gap-4 md:h-screen'>
    <div>
      <Image className='w-[300px] h-[300px]' alt='contact us page' src={contactus} />
    </div>
    <div className='flex flex-col  items-center justify-center gap-4 mx-10 shadow-xl p-4 rounded min-w-[300px]'>
      <h1 className='font-bold text-2xl my-2'>contact us</h1>
      <span className='text-sm my-2'> <RiMailLine className='text-xl text-accent'/> email: zeronlabs@gmail.com</span>
      <span className='text-sm my-2'><Link href='https://wa.me/254745097705' className=" my-4 p-2 w-[150px] flex items-center justify-center text-white h-[40px] rounded-md bg-gradient-to-r from-primary to-accent">chat on whatsapp</Link></span>
      <span className='text-sm my-2'> <RiPhoneLine className='text-xl text-accent'/> call us:+254745097705</span>
      <Link href='/' className="w-[100px] flex items-center justify-center text-white h-[40px] rounded-md border dark:border-dSecondary border-lSecondary" >back home</Link>
      <span className='my-4 font-bold text-primary'>guranteed reply</span>
    </div>
  </div>
  <Footer/>
  </div>
  )
}

export default page