"use client";
import { topicList } from '@/interface/interface';
import Basic from '@/modules/Basic';
import { postObjectNoReturn, postObjectReturn} from '@/modules/endpoint';
import React, { useEffect, useState } from 'react'
import Navigation from '../components/navigation/Navigation';
import { RiDeleteBin3Line, RiEdit2Line, RiSave3Fill } from 'react-icons/ri';
import { Toaster, toast } from 'sonner';

function Page() {
	const basic = new Basic();
	const [id,setId] = useState(-1);
	const [subtopic,setsubtopic] = useState<string[]|[]>([]);
	useEffect(()=>{
		setId(basic.decodeUrl(window.location.href.split("?id=")[1]));
	},[]);
	
	// make a request to get the subtopics
	useEffect(()=>{
		if (id != -1){
			const getTopicList = postObjectReturn("get-topic-list",true,
			{ id: id }) as Promise<topicList>;
			
			getTopicList.then(data =>{
				setsubtopic(data.data);
			});
		}
	},[id]);
	
	
		// handle delete
		function  handleDelete(index:number){
			const updatedTopic = [...subtopic!];
			updatedTopic.splice(index,1);
			// update the array with the new array;
			setsubtopic(updatedTopic);
		}
		
			// handle rename
			function  handleRename(index:number){
				const updatedTopic = [...subtopic!];
				var new_name = prompt("enter new name:   ",updatedTopic[index].toString());
				(new_name != undefined) &&  (updatedTopic[index] = new_name);
				setsubtopic(updatedTopic);
			}
			
			const sendNewTopicInfomartion = () =>{
				const payload ={
					topic_id:id,
					new_topic:JSON.stringify(subtopic)
				}
				// send new payload to the backend.
				const res = postObjectNoReturn("update-topic", true, payload);
				res.then(data=>{
					toast.info(data,{
						duration:3000,
						className:'bg-primary text-dText'
					});
					setTimeout(() => {
						window.location.href = `/lesson-view?id=${basic.encodeUrl(id)}`;
					},2000);
				})
			}
	
	
	
  return (
	<div>
		<Navigation/>
		<Toaster position="top-center" />
	<div className='w-[95%] p-4 my-10 mx-[2%] shadow-md rounded-sm'>
			<h3 className='text-primary mt-20 sm:mt-4 my-10'>topic editor <button onClick={sendNewTopicInfomartion} className='mx-4  bg-primary hover:bg-dark text-dText text-sm rounded-md flex items-center p-2 my-2'><RiSave3Fill/> &nbsp;save</button></h3>
			<div className='flex gap-4 my-4  flex-wrap justify-around'>
			{subtopic && subtopic.map((each_topic,index) =>(
				<div key={index} className='w-full shadow-md dark:border dark:border-dSecondary p-2 sm:w-[40%] md:w-[300px]'>
					<div>
						<span>{each_topic}</span>
					</div>
					<div className='my-4 flex justify-end'>
						<button onClick={() =>handleDelete(index)} className=' text-[15px] text-text_dark hover:text-primary rounded-md p-1 m-2 flex items-center border border-lSecondary dark:border-dSecondary '> <RiDeleteBin3Line/> &nbsp;remove</button>
						<button onClick={()=>handleRename(index)} className=' text-[15px] text-text_dark hover:text-primary rounded-md p-1 m-2 flex items-center border border-lSecondary dark:border-dSecondary '> <RiEdit2Line/> &nbsp;rename</button>
					</div>
				</div>
			))}
			</div>
		</div>
		</div>
  )
}

export default Page