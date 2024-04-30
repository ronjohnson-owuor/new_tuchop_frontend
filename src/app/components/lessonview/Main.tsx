import { AIconversationResponse, savedChatsIdentifier, savedDataInterface, savedconvoInterface, topicList } from '@/interface/interface'
import { postObjectReturn } from '@/modules/endpoint';
import React, { useEffect, useState } from 'react'
import Controls from './Controls';
import { RiSave2Line, RiYoutubeLine } from 'react-icons/ri';

interface prop {
	id:string,
	focus:number
}
function Main({id,focus}:prop) {
	const chatid :savedChatsIdentifier ={
		module_id: id !=null ? Number(id):undefined,
	  };
	  const[topiclist,settopiclist] = useState<(string|number)[]|null>(null);
	const [savedchats,setsavedchats] = useState<savedDataInterface[]|null>(null);
	const [aireply,setaireply] = useState<AIconversationResponse|null>(null);

	
	useEffect(()=>{
		if(id != null){
			const getTopicList = postObjectReturn("get-topic-list",true,
			{ id: id }) as Promise<topicList>;
			getTopicList.then(data =>settopiclist(data.data));
			const res = postObjectReturn("saved-chat",true,chatid) as Promise <savedconvoInterface>;
			res.then(data =>{
				if(typeof data == 'object'){
					setsavedchats(data.data);
				}
			});	
		}
	},[id]);
	
	
  return (
	<div className='w-[90%] mx-[5%] relative'>
		<div className='w-full m-4'>
			<h1 className='text-xl font-bold text-primary'>{topiclist!=null && topiclist[focus]}</h1>
		</div>
		{/* no saved video data*/}
		{ aireply != null &&
			<div className='rounded-sm  shadow-sm p-4'>
				<div className='flex justify-between my-4 items-center w-full'>
					<h3 className='font-bold  my-4' dangerouslySetInnerHTML={{'__html': aireply!?.question}}></h3>
					<div className='flex items-center gap-2'>
						<button className='flex items-center p-1 px-2 shadow-md hover:bg-primary hover:text-dText text-sm rounded-xl dark:border dark:border-dSecondary'><RiSave2Line/>&nbsp;save</button>
						<button className='flex items-center p-1 px-2 shadow-md hover:bg-primary hover:text-dText text-sm rounded-xl dark:border dark:border-dSecondary'><RiYoutubeLine/>&nbsp;watch</button>
					</div>
				</div>
				
				<span className='my-4 leading-10 text-gray' dangerouslySetInnerHTML={{'__html': aireply!?.answer}}></span>
			</div>
		}
		<Controls
		setaireply={setaireply}
		/>	
	</div>
  )
}

export default Main