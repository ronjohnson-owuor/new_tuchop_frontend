import { fileResponse, mediaobjectInterface } from '@/interface/interface';
import {postObjectNoReturn, postObjectReturn } from '@/modules/endpoint';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { nohistory } from '../container';
import { RiCloseLine, RiEdit2Fill, RiFocus2Fill, RiSave2Line } from 'react-icons/ri';
import Basic from '@/modules/Basic';

interface prop {
	topic_id:number,
	setmediafocus:Function,
	close:Function
}
function Listfiles({topic_id,close,setmediafocus}:prop) {
	const basic = new Basic();
	const [media,setMedia] = useState<mediaobjectInterface[]|[]>([]);
	const[renaming,setrenaming] = useState({
		isrenaming:false,
		index:0
	});
	const [newname,setnewname] = useState({
		media_id:0,
		new_name:"",
		topic_id:topic_id
	});
	useEffect(()=>{
		if(topic_id != undefined){
			const res = postObjectReturn('get-media',true,{topic_id:topic_id}) as Promise<fileResponse>;
			res.then(data => {
				if(typeof(data.data) != 'string'){
					setMedia(data.data);
				}
			});
		}
	},[]);
	
	
	
	const renameMedia = () =>{
		if(newname.new_name != ""){
			const res = postObjectNoReturn('rename-media',true,newname);
			res.then(data =>console.log(data));			
		}
	}
	
	
	
  return (
	<div className='w-full rounded-md p-4'>
		{media.length == 0 && 
		<div className='w-[90%] h-full flex items-center justify-center gap-4 flex-col'>
			<Image src={nohistory} width={300} alt='no topic image'/>
			<span>no media found</span>
		</div>
		}
		{/* loop through the media */}
		{
			media.length !== 0 &&
			media.map((file,index) =>(
				<div className='flex items-center w-full overflow-x-scroll sm:overflow-x-hidden text-sm md:text-md min-h-[80px] my-4 p-2 justify-around border border-lSecondary dark:border-dSecondary rounded-md'>
					{/* when the user is renaming the subtopic  */}
					<div className={`flex items-center gap-4 justify-end sm:justify-start p-2 transition-all duration-500 ml-0 ${renaming.isrenaming && renaming.index == index ? ' ml-0' :'ml-[-1000px] collapse'}`}>
						<input type="text"
						onChange={(e)=>setnewname(prev =>({
							...prev,
							new_name: e.target.value,
							media_id:Number(file.id)
						}))}
						 placeholder='new name' className='h-[40px] rounded-md shadow-md p-2' />
						<div className='flex gap-4 items-center'>
							<button
							className='flex border-lSecondary dark:border-dSecondary dark:shadow-none shadow-md rounded-md h-[30px] dark:border hover:text-primary p-2 items-center justify-center'
							onClick={renameMedia}
							><RiSave2Line/> &nbsp;save</button>
							<button
							className='flex border-lSecondary dark:border-dSecondary dark:shadow-none shadow-md rounded-md h-[30px] dark:border hover:text-primary p-2 items-center justify-center'
							 onClick={()=>setrenaming({
								isrenaming:false,
								index:0
							})}>
								<RiCloseLine/>&nbsp;cancel
							</button>
						</div>
					</div>
					 
					 {/* when the user is  not renaming the subtopic */}
					 <div className={` p-2 transition-all duration-200 ${renaming.isrenaming && renaming.index == index ? 'ml-[-500px] collapse' :'flex items-center justify-start gap-2 ml-[660px] visible w-full'}`}>
					 <p title={file.media_name!}>{basic.trim(file.media_name!)}</p>
					<div className='flex gap-4 items-center'>
					 <button
						onClick={()=>setrenaming({
							isrenaming:true,
							index:index
						})}
						 className='flex border-lSecondary dark:border-dSecondary dark:shadow-none shadow-md rounded-md h-[30px] hover:text-primary p-2 items-center justify-center'><RiEdit2Fill/>&nbsp;rename</button>
						<button
						onClick={()=>{
							setmediafocus({
								url:file.media_url,
								id:file.id,
								question:''
							});
							// close the the popup.
							close(false);
							alert(" File focused:You can now ask questions from this file");
						}}
						 className='flex border-lSecondary dark:border-dSecondary dark:shadow-none shadow-md rounded-md h-[30px] hover:text-primary p-2 items-center justify-center'><RiFocus2Fill/>&nbsp;focus</button>
					</div>
						
					 </div>
				</div>
			))
		}
	</div>
  )
}

export default Listfiles