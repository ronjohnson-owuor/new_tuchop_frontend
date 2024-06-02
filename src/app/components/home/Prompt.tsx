"use client"
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { RiSendPlane2Line } from 'react-icons/ri'
import { notes } from '../container'
import Link from 'next/link'
import { postObjectReturn } from '@/modules/endpoint'
import { TopicInterface, saveLessonInterface } from '@/interface/interface'
import Basic from '@/modules/Basic'
import { toast } from 'sonner'

function Prompt() {
	const [topics,setTopics] = useState<null|string[]>(null);
	const [message,setMessage] = useState<null|string>(null);
	const basic = new Basic();
	
	
	function fetchTopics(){
		const data = {
			message:message
		}
		 const res = postObjectReturn("get-topic",false,data) as Promise<TopicInterface>;
		 toast.info('get topic initialised',{
			duration:4000,
			className:'bg-primary text-dText'
		})
		 toast.promise(res.then(data =>{
			if(data.success){
				
				toast.success('lesson retrieved',{
					duration:4000,
					className:'bg-sucess text-dText'
				})
				
			}else{
				toast.error('unable to retrieve topics...try a different  and precise keyword',{
					duration:4000,
					className:'bg-error text-dText'
				},
			)}
		 }))
		res.then(data =>{
			if(data.success){
				setTopics(JSON.parse(data.message));
			}
		});
	}
	
	// remove topic
	const handleRemoveTopic = (index:number) => {
		// Create a new array without the element at the specified index
		const updatedResponse = [...topics!.slice(0, index), ...topics!.slice(index + 1)];
		setTopics(updatedResponse);
		toast.success("topic removed",{
			duration:4000,
			className:'bg-sucess text-dText'
		});
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
	<div className='flex flex-col items-center justify-center min-h-[90vh]'>
		{topics == null && <div className='flex mt-10 flex-col items-center justify-center sm:justify-center px-4'>
		<h3 className='text-md sm:text-xl bg-gradient-to-r text-center text-xl font-bold from-primary to-accent bg-clip-text text-transparent'>Enter the topic you want to study down below?</h3>
		<span className='text-gray text-[13px] mb-10'>learn anything,anywhere with tuchop AI</span>
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
				<div className="flex gap-4 mx-4 my-4 items-center justify-center flex-wrap shrink-0 w-full "> 
					<button className="w-[100px] h-[40px] rounded shadow bg-primary text-light "
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
							 className="w-[15%] h-[40px] text-[10px] text-white dark:bg-dSecondary bg-lSecondary rounded-md hover:bg-primary">delete</button>
						</div>
	
					))
				}
				</div>	
			</div>}
		
		
		
		
		
	</div>
  )
}

export default Prompt