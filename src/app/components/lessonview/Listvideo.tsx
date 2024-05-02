import { youtubeVideoListFormart } from '@/interface/interface'
import Image from 'next/image'
import React, { useEffect } from 'react'
import { RiCloseLine, RiPlayCircleLine, RiSave2Fill } from 'react-icons/ri'
import { nohistory } from '../container'

interface Props{
	videolist:youtubeVideoListFormart[]|null,
	setvideolist:Function,
	close:Function
}

function Listvideo({videolist,setvideolist,close}:Props) {
	
	useEffect(()=>{
		document.body.style.overflow='clip';
	},[]);
	
	
	const saveVideo = (index:number) =>{
		// question_id and video_id
		
	}
	
	
	
  return (
	<div className='absolute w-full min-h-screen p-10  backdrop-blur-md top-0 left-0 grid place-items-center'>
		<div className='flex w-[80%] mx-[10%] h-[500px] flex-col overflow-y-scroll p-4 gap-4 mt-[100px]'>
		<div className='flex  items-center justify-around shadow-md rounded-sm p-2'>
			<h1 className='text-xl font-bold text-primary'>Youtube video list </h1>
			<button 
		  onClick={()=>{
			setvideolist(null);
			document.body.style.overflowY="scroll";
			close({
			istrue: false,
			index:0
		  })}}
		  className='shadow-sm flex items-center text-md w-[80px] h-[30px] border -translate-y-1 hover:bg-primary hover:text-dText p-2 rounded border-lSecondary text-lText dark:border-dSecondary mx-4 dark:text-dText'><RiCloseLine/> &nbsp; close</button>
		</div>
		{videolist == null &&
			<div className='w-[90%] h-full flex items-center justify-center gap-4 flex-col'>
				<Image src={nohistory} width={300} alt='no topic image'/>
				<span>Loading  video</span>
			</div>
		}
		
		<div className='w-full rounded-md p-4 grid grid-cols-1 gap-10'>
		{videolist !=null && videolist.map((videos,index) =>(
			<div className='w-full min-h-[100px] flex gap-4 shadow-md dark:border dark:border-dSecondary'>
				<img className='w-[20%] object-cover max-h-[400px]' src={videos.thumbnail} alt="thumbnail" />	
				<div className='w-[80%] flex flex-col gap-4'>
					<span className='font-bold text-md my-2'>{videos.title}</span>
					<div className='flex gap-4 items-center justify-center'>
						<button className='flex items-center p-1 px-2 shadow-md hover:bg-primary hover:text-dText text-sm rounded-xl dark:border dark:border-dSecondary'><RiSave2Fill/>&nbsp;save</button>
						<button className='flex items-center p-1 px-2 shadow-md hover:bg-primary hover:text-dText text-sm rounded-xl dark:border dark:border-dSecondary'><RiPlayCircleLine/>&nbsp;play</button>
					</div>
				</div>
			</div>
		))}
		</div>

		</div>
	</div>
  )
}

export default Listvideo