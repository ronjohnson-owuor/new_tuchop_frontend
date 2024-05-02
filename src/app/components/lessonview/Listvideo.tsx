import { youtubeVideoListFormart } from '@/interface/interface'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { RiCloseLine, RiPlayCircleLine, RiSave2Fill } from 'react-icons/ri'
import { nohistory } from '../container'
import Videoview from './Videoview'
import { postObjectNoReturn } from '@/modules/endpoint'

interface Props{
	videolist:youtubeVideoListFormart[]|null,
	setvideolist:Function,
	questionid:number,
	close:Function
}

function Listvideo({videolist,setvideolist,close,questionid}:Props) {
	const [videodata,setvideodata] = useState({
		title:"",
		id:""
	});
	const[isplaying,setisplaying] = useState(false);
	useEffect(()=>{
		document.body.style.overflow='clip';
	},[]);
	
	
	const handleSaveVideo = (saved_id:number,video_id:string) =>{
		var videosTobeSavedObject = {
			question_id:saved_id,
			video_id:video_id
		}
		const res = postObjectNoReturn('save-video',true,videosTobeSavedObject);
		res.then(data =>console.log(data));
	 }
	
	
  return (
	<div className='absolute w-full min-h-screen p-10  backdrop-blur-md top-0 left-0 grid place-items-center'>
		<div className='flex w-[80%] mx-[10%] h-[500px] flex-col overflow-y-scroll p-4 gap-4 mt-[50px] dark:bg-dBackground bg-lBackground'>
		<div className='flex  items-center justify-around shadow-md rounded-sm p-2 dark:bg-dBackground bg-lBackground'>
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
		
		{/* if no video is found */}
		{videolist == null && !isplaying &&
			<div className='w-[90%] h-full flex items-center justify-center gap-4 flex-col'>
				<Image src={nohistory} width={300} alt='no topic image'/>
				<span>Loading  video</span>
			</div>
		}
		
		{/* list the video if there are videos */}
		<div className='w-full rounded-md p-4 grid grid-cols-1 gap-10 dark:bg-dBackground bg-lBackground'>
		{videolist !=null && !isplaying && videolist.slice(0,10).map((videos,index) =>(
			<div className='w-full min-h-[100px] flex gap-4 shadow-md dark:border dark:border-dSecondary'>
				<img className='w-[20%] object-cover max-h-[400px]' src={videos.thumbnail} alt="thumbnail" />	
				<div className='w-[80%] flex flex-col gap-4'>
					<span className='font-bold text-md my-2'>{videos.title}</span>
					<div className='flex gap-4 items-center justify-center'>
						<button onClick={() =>handleSaveVideo(questionid,videos.video_id)} className='flex items-center p-1 px-2 shadow-md hover:bg-primary hover:text-dText text-sm rounded-xl dark:border dark:border-dSecondary'><RiSave2Fill/>&nbsp;save</button>
						<button 
						onClick={()=>{
							setisplaying(true)
							setvideodata({
								title:videos.title,
								id:videos.video_id
							})
						}}
						className='flex items-center p-1 px-2 shadow-md hover:bg-primary hover:text-dText text-sm rounded-xl dark:border dark:border-dSecondary'><RiPlayCircleLine/>&nbsp;play</button>
					</div>
				</div>
			</div>
		))}
		</div>
		
		{/* play the video in  video player */}
		
		{isplaying && <Videoview
		savedId={questionid}
		saveVideo={handleSaveVideo}
		title={videodata.title}
		videoid={videodata.id}
		close={setisplaying}
		/>}
		

		</div>
	</div>
  )
}

export default Listvideo