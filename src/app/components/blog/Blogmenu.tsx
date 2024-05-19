import React from 'react'
import { RiAddLine, RiEdit2Line } from 'react-icons/ri'

function Blogmenu() {
  return (
    <div className='grid place-items-center grid-cols-1'>
        <h1 className='my-10 text-gray font-bold'>choose your action ⌨️</h1>
        <div className='flex flex-wrap gap-4'>
            <button className='w-[150px] flex items-center justify-center gap-2 h-[40px] rounded-md bg-accent hover:bg-primary text-dText my-4'><RiAddLine/> create post</button>
            <button className='w-[150px] flex items-center justify-center gap-2 h-[40px] rounded-md bg-accent hover:bg-primary text-dText my-4'><RiEdit2Line/> edit post</button>
        </div>
    </div>
  )
}

export default Blogmenu