import React, { useEffect } from 'react'
import { RiCloseLine } from 'react-icons/ri'
import Nolesson from './Nolesson';

interface FullscreenProp{
	fullscreenenabled:Function,
	videoId:string|undefined
 }
function Replay({fullscreenenabled,videoId}:FullscreenProp) {
	
	useEffect(()=>{
		document.body.style.overflow ='clip';
		window.scrollTo(0,0);
	},[]);
	
  return (
	<div className='w-full h-screen backdrop-blur-md absolute top-0 overflow-clip left-0 flex items-center justify-center z-20'>
		<div className="shadow-lg rounded w-[90%] h-[90%]  flex items-center  flex-col relative bg-lBackground dark:bg-dBackground">
			<div className=' w-[90%] mx-[5%]  my-4 flex justify-around  border-b-2 border-lSecondary dark:border-dSecondary pb-4'>
				<h1 className="font-bold text-secondary text-xl">FULL SCREEN</h1>
				<button
				onClick={()=>{
					document.body.style.overflowY ='scroll';
					fullscreenenabled(false);
					}} className="cursor-pointer  shadow-md  bg-lSecondary dark:bg-dSecondary p-2 text-[12px] rounded-md flex items-center hover:bg-primary"
				><RiCloseLine/> &nbsp;close</button>
			</div>
			
			{/* full screen iframe */}
			{videoId ? <iframe className="my-4 mx-4 w-full h-full"   src={`https://www.youtube.com/embed/${videoId}?rel=0`}></iframe> : <Nolesson haslesson={false} linkrequired={false} text='no video selected' /> }
			
			
		</div>
	</div>
  )
}

export default Replay