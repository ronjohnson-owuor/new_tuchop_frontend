import React from 'react'
import { RiCloseLine, RiSave3Line } from 'react-icons/ri';

interface props{
  videoid:string,
  title:string,
  close:Function,
  savedId:number
	saveVideo:Function
}

function Videoview({videoid,title,close,saveVideo,savedId}:props) {
  return (
    <div className="w-full h-screen z-20 dark:bg-dBackground bg-lBackground">
		
		<div className="shadow-lg rounded w-full h-[500px]  flex items-center  flex-col relative">
      
			<h3 className="font-bold text-secondary text-xl">Title: {title}</h3>
			<iframe className="my-4 mx-4 w-[90%] h-[450px] sm:h-full"   src={`https://www.youtube.com/embed/${videoid}?rel=0`}></iframe>
			<div className="w-[90%] my-4 mx-4">
        <button
         onClick={()=>{
          document.body.style.overflowY ='scroll';
          close(false); /* this means the image component is not being show same to file component */
          }}
         className="cursor-pointer absolute shadow-md top-[-20px] right-4 bg-primary p-2 text-dText  text-[12px] rounded-[100vh]"><RiCloseLine
         /></button>

				{/* the handlee save function is implemnted in the  Lessonmodule.tsx and her we are just  re-limplementing it */}
				<button  onClick={()=>saveVideo(savedId,videoid)}  className="bg-text_dark text-text_light text-sm p-1 rounded-md hover:text-primary cursor-pointer shadow-md dark:border dark:border-dSecondary flex items-center"><RiSave3Line/>&nbsp;save video</button>
		</div>
		</div>
		
	</div>
  )
}

export default Videoview