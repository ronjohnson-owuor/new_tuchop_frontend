"use client"
import Image from 'next/image'
import React, { useEffect } from 'react'
import { logo } from '../container'
import Link from 'next/link'
import useToken from '@/modules/token';

function Navigation() {
  const {isToken} = useToken();
  useEffect(()=>{
    // if(isToken){
    //   window.location.href="/start";
    // }
  },[isToken]);

  return (
    <div className='w-full h-[80px] grid  grid-cols-2 justify-around items-center '>
        <div className='flex gap-2 justify-start items-center mx-10'>
           <Image width={40} height={40} src={logo} alt="logo" /> 
           <h1 className='hidden sm:block'>Tuchop AI</h1>
        </div>
        <div className='flex gap-4 justify-center items-center'>
            <Link  className='text-sm sm:text-md' href="/contact-us">contacts</Link>
            <Link  className='text-sm sm:text-md' href="/about">about</Link>
            <button onClick={()=>window.location.href="/signup"} className='w-[80px] h-[40px] bg-primary text-dText rounded-md p-2 text-sm mr-2'>start</button>
        </div>
        
    </div>
  )
}

export default Navigation