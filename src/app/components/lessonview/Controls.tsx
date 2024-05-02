"use client"
import { AIconversationResponse, AIformartResponse, focusInterface } from '@/interface/interface';
import { postObjectReturn } from '@/modules/endpoint';
import React, { useState } from 'react'
import { RiEraserLine, RiSendPlane2Line } from 'react-icons/ri';

interface controlsInterface{
	setaireply:Function
	mediafocus:focusInterface|null,
	setmediafocus:Function
}
function Controls({setaireply,mediafocus,setmediafocus}:controlsInterface) {
	const [userquestion,setUserquestion] = useState("");
	const handleAiExchange =() =>{
		let res;
		if(mediafocus == null){
			 res  = postObjectReturn('normal-chat',true,{message: userquestion}) as Promise<AIformartResponse>;
			res.then(data =>{
				if(typeof(data.message) == 'object'){
					setaireply((prev:AIconversationResponse[]) =>[...prev,data.message]);
					window.scrollTo(0,document.body.scrollHeight);
				}
				
			});			
		}else{
			console.log(mediafocus)
			res = postObjectReturn('ask-file',true,{...mediafocus,question:userquestion}) as Promise<AIformartResponse>
			res.then(data =>{
				if(typeof(data.message) == 'object'){
					setaireply((prev:AIconversationResponse[]) =>[...prev,data.message]);
					window.scrollTo(0,document.body.scrollHeight);
				}
				
			});		
		}

	}
	
	
  return (
	<div className={`w-[90%] bg-lBackground dark:bg-dBackground   dark:border-dSecondary flex gap-4 my-10 flex-col md:justify-around md:flex-row shadow-md  rounded-md p-4 bg-white`}>
		<input type="text" 
		onFocus={(e)=>e.target.value =''}
		onChange={(e)=>{
			 setUserquestion(e.target.value)
		}}
			className="w-full sm:w-full h-[40px] border border-lSecondary dark:border-dSecondary rounded px-2 bg-transparent outline-none"
			placeholder="enter your question here" />
		<div className="flex w-full xl:w-[30%] justify-end items-center  gap-2">
			<button className="text-sm border flex items-center border-lSecondary dark:border-dSecondary shadow-sm cursor-pointer  p-2 rounded-md hover:bg-accent bg-primary text-dText"
			onClick={handleAiExchange}
			><RiSendPlane2Line className='text-xl'/>&nbsp;ask </button>	
			{mediafocus !== null && <button onClick={()=>setmediafocus(null)} className="text-sm border flex items-center border-lSecondary dark:border-dSecondary shadow-sm cursor-pointer  p-2 rounded-md hover:bg-accent text-lText  dark:text-dText"><RiEraserLine/>&nbsp;clear</button>	}		
		</div>
		
	</div>
  )
}

export default Controls