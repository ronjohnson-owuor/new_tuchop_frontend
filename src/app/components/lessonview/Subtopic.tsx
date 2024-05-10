import Image from 'next/image';
import React, { useEffect } from 'react'
import { RiCloseLine, RiEdit2Line } from 'react-icons/ri';
import { nohistory } from '../container';
import Basic from '@/modules/Basic';

interface props{
	subtopics:(string|number)[]| null,
	close:Function,
	setfocus:Function,
	id:string
}

function Subtopic({id,subtopics,close,setfocus}:props) {
	useEffect(() => {
		document.body.style.overflow ='clip';
	},[]);
	const basic = new Basic();
	const handleRedirect = () =>{
		const encode_id = basic.encodeUrl(id);
		window.location.href = `/edit-lesson?id=${encode_id}`;		
	}
	
  return (
	<div className='absolute w-full h-screen backdrop-blur-md top-0 left-0 flex items-center justify-center'>
		<div className='bg-lBackground dark:bg-dBackground rounded-md shadow-md p-10 my-10 h-[500px] w-[90%] mx-[5%] md:w-[60%] md:mx-0 overflow-y-scroll '>
			<div className='flex flex-col sm:flex-row items-center justify-around gap-4 my-10'>
				<h1 className='font-bold text-xl text-primary'>subtopics</h1>
				<div className='flex items-center gap-4 p-4'>
					<button onClick={handleRedirect} className='flex items-center justify-center hover:text-primary w-[80px] h-[30px] rounded-md border shadow-sm border-lSecondary dark:border-dSecondary '><RiEdit2Line/>&nbsp;edit</button>
					<button className='flex  hover:text-primary items-center w-[80px] h-[30px] rounded-md border shadow-sm border-lSecondary dark:border-dSecondary  justify-center' onClick={()=>{
						document.body.style.overflowY ='scroll';
						close(false);
						}}><RiCloseLine/>&nbsp;close</button>
				</div>
				
			</div>
			<hr className='text-lSecondary dark:text-dSecondary w-[90%]' />
			<div className='my-10'>
			 {
				subtopics == null && (
				<div className='w-[90%] h-full flex items-center justify-center gap-4 flex-col'>
					<Image src={nohistory} width={300} alt='no topic image'/>
					<span>no subtopic found</span>
				</div>	
				)
			 }
			 {
				subtopics !=null && subtopics.map((subtopic,index) =>(
					<h1 key={index} className='border p-4 my-4 rounded cursor-pointer border-lSecondary dark:border-dSecondary hover:bg-accent' onClick={()=>{
						setfocus(index);
						close(false);
					}}>{subtopic}</h1>
				))
			 }
			</div>
		</div>
		
		
	</div>
  )
}

export default Subtopic