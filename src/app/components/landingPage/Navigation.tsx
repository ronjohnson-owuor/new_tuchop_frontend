"use client"
import Image from 'next/image'
import React from 'react'
import { logo } from '../container'
import Link from 'next/link'

function Navigation() {
  return (
    <div className='w-full h-[80px] grid  grid-cols-2 justify-around items-center '>
        <div className='flex gap-2 justify-start items-center mx-10'>
           <Image width={40} height={40} src={logo} alt="logo" /> 
           <h1>Tuchop AI</h1>
        </div>
        <div className='flex gap-4 justify-center items-center'>
            <Link href="/contact-us">contacts</Link>
            <Link href="/about">about</Link>
            <button onClick={()=>window.location.href="/signup"} className='w-[100px] h-[40px] bg-primary text-dText rounded-md p-2 text-sm'>get started</button>
        </div>
        
    </div>
  )
}

export default Navigation