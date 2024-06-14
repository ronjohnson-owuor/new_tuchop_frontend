"use client"
import Image from 'next/image'
import React from 'react'
import { hero_picture } from '../container'
import { RiArrowRightFill } from 'react-icons/ri'

function Hero() {
  return (
    <div className='flex items-center justify-center my-10 gap-4'>
        <div className='w-[45%] mx-4 flex items-start  flex-col'>
            <h1 className='text-[40px] font-bold my-2'>
            Achieve <span className='bg-gradient-to-r  via-error from-primary to-accent bg-clip-text text-transparent '>More</span> with Intelligent Study Solutions
            </h1>
            <span className='text-gray'>study with the best ai,get notes videos and more </span>
            <button onClick={()=>window.location.href="/signup"}  className='flex items-center justify-center w-[150px] h-[40px] rounded-md bg-accent hover:bg-primary my-4'>get started <RiArrowRightFill/> </button>
        </div>
        <div className='w-[45%] mx-4 items-center justify-center'>
        <Image className='w-[70%] h-[70%] mx-4 my-4' src={hero_picture} alt='hero image'/>
        </div>
    </div>
  )
}

export default Hero