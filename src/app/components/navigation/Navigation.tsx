"use client"
import React, { useEffect, useState } from 'react'
import { avatar, logo } from '../container'
import Image from 'next/image'
import { RiMenu3Line,RiMoonLine, RiSunLine } from 'react-icons/ri'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import useToken from '@/modules/token'
import { data, userdata } from '@/interface/interface'
import { postNoObjectReturn } from '@/modules/endpoint'
import Basic from '@/modules/Basic'

function Navigation() {
	const {theme,setTheme} = useTheme();
	const [shownav,setShownav] = useState(true);
	const{isToken} = useToken();
	
	const [userData,setuserData] = useState<data|null>(null);
	useEffect(()=>{
		const res = postNoObjectReturn('get-user',true) as Promise <userdata>;
		res.then(data =>{
			if(typeof(data) == "object"){
				setuserData(data.data);
			}
		});	
	},[]);
	
	
	
  return (
	<div className='flex shadow-md justify-between w-full h-[80px] p-2 dark:border-b dark:border-dSecondary md:justify-center sm:gap-10 md:gap-20'>
		<Link href="/" className='flex items-center gap-4 cursor-pointer md:mx-0'>
			<Image width={40} height={40} src={logo} alt="logo" />
			<span className='sm:text-md text-transparent font-bold sm:block bg-gradient-to-r from-primary to-accent bg-clip-text'>tuchop AI</span>
		</Link>
		
		<div  className={` text-gray   flex flex-col md:flex-row items-center   ${shownav ? 'backdrop-blur-md md:backdrop-blur-none w-full md:w-auto absolute md:relative top-[80px] md:top-0 z-100 bg-lBackground dark:bg-dBackground md:bg-transparent' :'hidden'} items-center gap-10 h-full text-sm font-regular pt-4`}>
			<Link href="/lessons" className='hover:text-primary'>lessons</Link>
			<Link href="/my-notes" className='hover:text-primary'>notes</Link>
			<Link href="/pricing" className='hover:text-primary'>upgrade</Link>
			{isToken && <Link href="/dashboard" className='hover:text-primary cursor-pointer flex items-center justify-start gap-2'>
			<Image src={userData?.picture ? userData.picture : avatar} width={40} height={50} className='rounded-[100vh] object-cover'  alt="avatar" />
			<span className='text-sm sm:text-md'>{userData?.name?userData.name :'loading'}</span>
		</Link>}
		</div>
		<div className='h-full flex items-center'>
		{!isToken && <button onClick={()=>window.location.href="/login"} className='w-[80px] h-[40px] bg-primary text-dText rounded-md text-sm'>log in</button>}
		</div>
		<div className=' flex items-center justify-end'>
			<button onClick={()=>setTheme(theme == "light"?"dark":theme=="dark"?"light":"dark")} className='m-4'>{theme == "light"?(<RiMoonLine/>) : theme == "dark" ? (<RiSunLine/>):(<RiMoonLine/>)}</button>
			<RiMenu3Line onClick={()=>setShownav(!shownav)} className='font-bold text-md md:hidden cursor-pointer sm:text-xl'/>
		</div>
	</div>
  )
}

export default Navigation;