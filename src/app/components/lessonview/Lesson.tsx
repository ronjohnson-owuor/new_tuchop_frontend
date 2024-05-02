import React, { useState } from 'react'
import { RiFilePaper2Line, RiFolder3Line, RiListOrdered2, RiMenu3Line, RiUpload2Line } from 'react-icons/ri'
import Main from './Main'
import Link from 'next/link';



interface props{
	id:string
}

function Lesson({id}:props) {
	const[focus,setFocus] = useState(0);
	const[showsubtopic,setshowsubtopic] = useState(false);
	const[showFile,setshowFile] = useState(false);
  return (
	<div className='w-full min-h-screen grid grid-cols-4 gap-4 my-4 p-4'>
		{/* lesson view main section */}
		<div className='border col-span-3 h-[80dvh] rounded-md border-lSecondary dark:border-y-0 dark:border-l-0 dark:rounded-none dark:border-r-dSecondary  overflow-y-scroll'>
			<Main
			setfocus={setFocus}
			id={id}
			focus={focus}
			showsubtopic={showsubtopic}
			setshowsubtopic={setshowsubtopic}
			showfile={showFile}
			setshowFiles={setshowFile}
			/>
		</div>
		
		{/* lesson view navigation */}
		<div className='border col-span-1 rounded-md border-lSecondary dark:border-none flex flex-col h-[80dvh] items-center justify-start'>
			<div className='flex items-center w-full justify-around'>
			<h1 className='text-2xl font-bold bg-gradient-to-r from-primary to-accent via-error bg-clip-text text-transparent'>menu</h1>
			<button><RiMenu3Line/></button>
			</div>
			<hr className='w-full text-lSecondary my-4 dark:text-dSecondary' />
			<button
			onClick={()=>setshowsubtopic(!showsubtopic)}
			 className='w-[80%] mx-[10%] flex items-center justify-center gap-2 my-4'>
				<RiListOrdered2/><span>subtopics</span>
			</button>
			<button
			onClick={()=>setshowFile(!showFile)}
			 className='w-[80%] mx-[10%] flex items-center justify-center gap-2 my-4'>
				<RiFolder3Line/><span>open files</span>
			</button>
			<Link href='/create-notes' className='w-[80%] mx-[10%] flex items-center justify-center gap-2 my-4'>
				<RiFilePaper2Line/><span>get notes</span>
			</Link>
		</div>		
	</div>
  )
}

export default Lesson