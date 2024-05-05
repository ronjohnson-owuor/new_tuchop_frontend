import { notesInterface } from '@/interface/interface';
import { postObjectReturn } from '@/modules/endpoint';
import React, { useEffect, useState } from 'react'
import { RiArrowGoBackLine } from 'react-icons/ri';


interface props{
	id:number,
	close:Function
}


function Readnotes({id,close}:props) {
	const [notes,setNotes] = useState<null|string>(null);
	useEffect(()=>{
		const res = postObjectReturn("get-edit-notes",true,{id:id}) as Promise<notesInterface>;
		res.then(data => setNotes(data.data));
	},[id]);
  return (
	<div>
		<button onClick={()=>close(false)} className="w-[100px] h-[40px] bg-primary z-20 rounded-md text-sm fixed flex items-center justify-center right-4 bottom-4 hover:bg-accent mx-4"
		>
			<RiArrowGoBackLine/> &nbsp; close
		</button>
		<div className="w-[95%] mx-10 leading-loose dark:text-dText" dangerouslySetInnerHTML={{__html:notes ? `<div> ${(notes.replace(/\\n|\\r|\\n\\n\\n|\\n\\n/g, '')).trim()}<div>` :"<h1> Loading notes please wait</h1>"}}>
		</div>
	</div>
  )
}

export default Readnotes