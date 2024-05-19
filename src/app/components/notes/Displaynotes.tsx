import React, { MouseEventHandler } from 'react'
import { RiSave2Line, RiSkipBackLine } from 'react-icons/ri'


interface props{
notes:string,
setnotes:Function,
savenotes:MouseEventHandler<HTMLButtonElement>	
}

function Displaynotes({notes,setnotes,savenotes}:props) {
  return (
	<div>
		{/* notes section */}
		<div className='w-[80%] mx-[10%] my-10 leading-[2.5rem] dark:text-dText' dangerouslySetInnerHTML={{ __html: notes ? JSON.parse(notes) : <div><h1>notes not found</h1></div> }}></div>
		<div className='fixed bottom-4 right-4 flex bg-lBackground dark:bg-dBackground p-2 rounded-md shadow-sm'>
			<button className='w-[80px] h-[30px] rounded-md bg-primary hover:bg-accent text-dText mx-2 flex items-center justify-center' onClick={savenotes}><RiSave2Line/> &nbsp;save</button>
			<button className='w-[80px] h-[30px] rounded-md bg-primary hover:bg-accent text-dText mx-2 flex items-center justify-center' onClick={() =>setnotes(null)}><RiSkipBackLine/>&nbsp;back</button>
		</div>
	</div>
  )
}

export default Displaynotes