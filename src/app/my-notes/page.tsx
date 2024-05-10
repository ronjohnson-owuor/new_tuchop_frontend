"use client"
import { postNoObjectReturn } from '@/modules/endpoint';
import React, { useState } from 'react'
import Navigation from '../components/navigation/Navigation';
import { nohistory } from '../components/container';
import Link from 'next/link';
import { response, savedNotes } from '@/interface/interface';
import Notelistcomponent from '../components/notes/Notelistcomponent';
import Image from 'next/image';
import { Toaster, toast } from 'sonner';

function Page() {
	const [notes,setNotes] = useState<null|savedNotes[]>(null);
	const res = postNoObjectReturn("get-saved-notes",true) as Promise<response>;
	  res.then(data =>{
		setNotes(data.data);
			if(data.success){
				toast.success(data.message,{
				duration:4000,
				className:'bg-sucess text-dText'
				})
			}else{
				toast.error(data.message,{
				duration:4000,
				className:'bg-error text-dText'
				})
			}			
		

	}); 		

  
	return (
	  <div>
		<Navigation/>
		{typeof Toaster !== 'undefined' && <Toaster position='top-center'/>}
		{/* if the user has not created any notes yet */}
		{notes == null && (
		  <div className="w-full h-[70vh] overflow-hidden  flex flex-col items-center justify-center ">
			<Image
			width={300}
			height={300}
			  className="w-[200px] h-[200px]"
			  src={nohistory}
			  alt="no history"
			/>
			<h1 className="text-sm">
			  no notes created
			  <Link href="/create-notes" className="text-primary">
				&nbsp;generate one
			  </Link>
			</h1>
		  </div>
		)}
		
		
		{
		  notes !== null && (
			  <Notelistcomponent
			  notes={notes}
			  />
		  )
		}
	  </div>
	);
}

export default Page
