"use client"
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { RiSendPlane2Line } from 'react-icons/ri'
import { notes } from '../container'
import Link from 'next/link'
import { postObjectReturn } from '@/modules/endpoint'
import { TopicInterface, saveLessonInterface } from '@/interface/interface'
import Basic from '@/modules/Basic'

function Prompt() {
	const [topics,setTopics] = useState<null|string[]>(null);
	const [message,setMessage] = useState<null|string>(null);
	const basic = new Basic();
	
	
	function fetchTopics(){
		const data = {
			message:message
		}
		 const res = postObjectReturn("get-topic",false,data) as Promise<TopicInterface>;
		res.then(data =>{
			if(data.success){
				setTopics(JSON.parse(data.message));
			}else{
				// tell the user to try again
			}
		});
	}
	
	// remove topic
	const handleRemoveTopic = (index:number) => {
		// Create a new array without the element at the specified index
		const updatedResponse = [...topics!.slice(0, index), ...topics!.slice(index + 1)];
		setTopics(updatedResponse);
	  };
	  
	//   redirect user to lesson module where he will start studying
	  function redirectToLesson (id:number){
		let encrypted = basic.encodeUrl(id);
		let url = `lesson-view?id=${encrypted}`;
		window.location.href=url;
	  }
	  
	//   save lesson and start lessons
	const  saveAndStartLessons  = () => {
		const topicData = {
			topic_name:message,
			topics_choosen:topics
		}
		console.log(topicData);
		const res = postObjectReturn('save-topic',true,topicData) as Promise <saveLessonInterface>;
		res.then((data)=>{
			if(data.success){
			 if(data.token.id && data.token.name){
				redirectToLesson(data.token.id);
			 }
			}
		});	
	}
	
	  
	
	
	
  return (
	<div className='flex flex-col items-center justify-center min-h-[90dvh] my-[100px]'>
		{topics == null && <div className='flex flex-col items-center justify-start sm:justify-center px-4'>
		<h3 className='text-md sm:text-xl my-4'>what are you studying today?</h3>
		<div className='flex gap-2 w-full p-2'>
			<input type="text"
			onChange={(e)=>{
				e.preventDefault();
				setMessage(e.target.value);
			}}
			 placeholder='e.g  linear algebra'
			className='w-[60%] sm:w-[400px] p-2 bg-transparent border border-lSecondary dark:border-dSecondary rounded-md shadow-sm outline-none  dark:shadow-none'
			 />
			<button className='w-[30%] h-[40px] bg-primary outline-none flex items-center justify-center rounded-md hover:bg-accent' onClick={(e)=>fetchTopics()}><RiSendPlane2Line/>&nbsp;start</button>
		</div>
		<div className='my-[100px] flex flex-col border rounded-md border-lSecondary p-4 gap-2 dark:border-dSecondary'>
			<Image width={50} height={50} alt='notes generator link' src={notes}/>
			<span className='text-sm'>
				try our <Link className='text-primary underline' href="#">notes generator</Link> 
			</span>
			
		</div>
		</div>}
		
		
		
		{/* when user has retrieved the topics */}
		{topics!== null && topics.length > 1 && <div id="div_scroll" className="mt-2 flex items-center flex-col">
				<h3 className="my-2 font-bold text-xl text-secondary">scroll for more topics</h3>
				<div className="flex gap-4 mx-4 flex-wrap shrink-0"> 
					<button className="w-[150px] h-[40px] rounded shadow bg-primary text-light "
					onClick={saveAndStartLessons}
					>start lesson</button>
					 <button
					//  onClick={() => addSubtopic(tobeadded)}>add</button><button 
					onClick={()=> window.location.reload()} 
					className="w-[100px] h-[40px] rounded mx-4 shadow">regenerate</button>

				</div>
				
				{/* math through the subtopics from open api */}
				<div   className=" w-full flex justify-center items-center gap-4 flex-wrap my-10">		
				{
					topics?.map((subtopic,index) =>(
						
						<div key={index} className="flex gap-2 w-[90%] sm:w-none flex-wrap items-center justify-end shadow-md p-2 rounded max-w-[400px] min-h-[80px] cursor-pointer dark:border dark:border-dSecondary ">
							<h3 className="w-[80%]">{subtopic}</h3>
							<button key={index} 
							onClick={()=>handleRemoveTopic(index)}
							 className="w-[50px] h-[40px] text-[10px] text-white dark:bg-dSecondary bg-lSecondary rounded-md hover:bg-primary">delete</button>
						</div>
	
					))
				}
				</div>	
			</div>}
		
		
		
		
		
	</div>
  )
}

export default Prompt