"use client"
import { AIconversationResponse, AIformartResponse } from '@/interface/interface';
import { postObjectReturn } from '@/modules/endpoint';
import React, { useState } from 'react'
import { RiSendPlane2Line } from 'react-icons/ri';

interface controlsInterface{
	setaireply:Function
}
function Controls({setaireply}:controlsInterface) {
	const [userquestion,setUserquestion] = useState("");	
	const handleAiExchange =() =>{
		const res  = postObjectReturn('normal-chat',true,{message: userquestion}) as Promise<AIformartResponse>;
		res.then(data =>setaireply(data.message));
	}
	
	
  return (
	<div className={` w-[70%] sm:w-[60%] bg-lBackground dark:bg-dBackground fixed bottom-[30px]  dark:border-dSecondary flex gap-4 my-10 flex-col md:justify-around md:flex-row shadow-md  rounded-md p-4 bg-white`}>
		<input type="text" 
		onFocus={(e)=>e.target.value =''}
		onChange={(e)=>setUserquestion(e.target.value)}
			className="w-full sm:w-full h-[40px] border border-lSecondary dark:border-dSecondary rounded px-2 bg-transparent outline-none"
			placeholder="enter your question here" />
		<div className="flex w-full xl:w-[30%] justify-end items-center  gap-2">
			<button className="text-sm border flex items-center border-lSecondary dark:border-dSecondary shadow-sm cursor-pointer  p-2 rounded-md hover:bg-accent bg-primary text-dText"
			onClick={handleAiExchange}
			><RiSendPlane2Line className='text-xl'/>&nbsp;ask </button>					
		</div>
		
	</div>
  )
}

export default Controls