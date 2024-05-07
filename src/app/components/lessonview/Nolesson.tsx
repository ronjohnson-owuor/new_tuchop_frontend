"use client"
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { nohistory } from '../container';
interface props{
	haslesson:boolean,
  text?:string
  link?:string
}
function Nolesson({haslesson,text,link}:props) {
  return (
	<>
	{
      !haslesson && (
      <div className='w-full h-[70vh] flex justify-center my-10 flex-col items-center'>
        <Image src={nohistory} alt="no lessons found" width={300} />
        <span className='mx-4 md:mx-0 my-2'>{text ? text :"this lesson is not availlable or has been deleted"}</span>
        <Link href={link ? link : '/'} className='text-primary underline'>create new</Link>
      </div>        
      )
    }
	</>
  )
}

export default Nolesson