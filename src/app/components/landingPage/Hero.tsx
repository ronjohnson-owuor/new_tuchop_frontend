"use client"
import Image from 'next/image'
import React from 'react'
import { hero_picture } from '../container'
import { RiArrowRightFill } from 'react-icons/ri'

function Hero() {
  return (
    <div className='flex flex-col md:flex-row items-center justify-center my-10 gap-4'>
        <div className=' w-[95%] mx-[2] md:w-[45%] md:mx-4 flex items-center  md:items-start  flex-col'>
            <h1 className='text-[40px] text-center md:text-start font-bold my-10 md:my-4'>
            Achieve <span className='bg-gradient-to-r  via-error from-primary to-accent bg-clip-text text-transparent '>More</span> with Intelligent Study Solutions
            </h1>
            <span className='text-gray w-[95%] mx-2 text-center md:w-full'>study with the best ai,get notes videos and more </span>
            <button onClick={()=>window.location.href="/signup"}  className='flex items-center justify-center w-[150px] h-[40px] rounded-md bg-accent hover:bg-primary my-4'>get started <RiArrowRightFill/> </button>
        </div>
        <div className='w-[45%] mx-4 items-center justify-center'>
        <Image className=' mt-10 md:w-[70%] md:h-[70%] md:mx-4 md:my-4' src={hero_picture} alt='hero image'/>
        </div>
    </div>
  )
}

export default Hero