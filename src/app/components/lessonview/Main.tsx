import { AIconversationResponse, focusInterface, savedChatsIdentifier, savedDataInterface, savedconvoInterface, topicList, videoMessage, youtubeVideoListFormart } from '@/interface/interface'
import { postObjectNoReturn, postObjectReturn } from '@/modules/endpoint';
import React, { useEffect, useState } from 'react'
import Controls from './Controls';
import { RiDeleteBin3Line, RiSave2Line, RiSearch2Line, RiYoutubeLine } from 'react-icons/ri';
import Subtopic from './Subtopic';
import Filemanager from './Filemanager';
import Listvideo from './Listvideo';

interface prop {
	id:string,
	focus:number,
	setfocus:Function,
	showsubtopic:boolean,
	setshowsubtopic:Function,
	showfile:boolean,
	setshowFiles:Function
}
function Main({id,showfile,setshowFiles,focus,setfocus,showsubtopic,setshowsubtopic}:prop) {
	const chatid :savedChatsIdentifier ={
		module_id: id !=null ? Number(id):undefined,
	  };	  
	const[videos,setvideos]  = useState<youtubeVideoListFormart[]| null>(null);
	const[topiclist,settopiclist] = useState<(string|number)[]|null>(null);
	const [savedchats,setsavedchats] = useState<savedDataInterface[]|[]>([]);
	const [aireply,setaireply] = useState<AIconversationResponse[]|[]>([]);
	const[showphrase,setshowphrase] = useState(false);
	const[mediafocus,setmediafocus] = useState<focusInterface|null>(null);
	const[phrase,setPhrase] = useState("");
	const[savedId,setsavedId] = useState<number|null>(null);
	const[wantVideo,setwantVideo]  = useState({
		istrue:false,
		index:0
	});
	
	
	useEffect(()=>{
		if(id != null){
			const getTopicList = postObjectReturn("get-topic-list",true,
			{ id: id }) as Promise<topicList>;
			getTopicList.then(data =>settopiclist(data.data));
			const res = postObjectReturn("saved-chat",true,chatid) as Promise <savedconvoInterface>;
			res.then(data =>{
				if(typeof (data) == 'object'){
					setsavedchats([...data.data]);
				}
			});
		}
	},[id]);
	
	const getVideo = (id:number) =>{
		if(phrase != ""){
			setwantVideo(prev =>({
				...prev,
				istrue: true
			}));
			const res = postObjectReturn("get-video",true,{index:id,phrase:phrase}) as Promise<videoMessage>;
			res.then(data =>{
				if(typeof(data) === 'object'){
					setvideos(data.data);
				}else{
					setwantVideo({
						istrue:!wantVideo.istrue,
						index:wantVideo.index
					})
				}
			});
		}else{
			alert("enter a search term");
		}
	}
	

	// handle save conversation
	const handleSave = (id:number) =>{
		const dataToBeSaved = aireply[id];
		const saveObject = {
			module_id:chatid.module_id,
			submodule_id:focus,
			question:dataToBeSaved.question,
			answer:dataToBeSaved.answer,
			follow_up_questions:JSON.stringify(dataToBeSaved.follow_up_questions)
		};
		console.log(saveObject)
		const res = postObjectNoReturn('save-prompt',true,saveObject);
		// tell user something
		res.then(data =>console.log(data));
		const saveres = postObjectReturn("saved-chat",true,chatid) as Promise <savedconvoInterface>;
		saveres.then(data =>{
			if(typeof (data) == 'object'){
				setsavedchats([...data.data]);
				aireply.pop();
			}
		});
		
	}
	
	const handleDelete = (id:number) =>{
		const deleteres = postObjectNoReturn('delete-chat',true,{id:id});
		deleteres.then(data => console.log(data));
		const res = postObjectReturn("saved-chat",true,chatid) as Promise <savedconvoInterface>;
			res.then(data =>{
				if(typeof (data) == 'object'){
					setsavedchats([...data.data]);
				}
			});
	}
	
	
	
	
	
	
	
  return (
	<div className='w-[90%] mx-[5%]'>
		<div className='w-full m-4'>
			<h1 className='text-xl font-bold text-primary'>{topiclist!=null && topiclist[focus]}</h1>
		</div>
		{/* get saved chats */}
		
		{savedchats.length != 0 && savedchats.map((data,index) =>
		data.submodule_id == focus && (
			<div className=' shadow-sm p-4 my-4 rounded-md'>
			<div className='flex justify-between my-4 items-center w-full'>
				<h3 className='font-bold  my-4' dangerouslySetInnerHTML={{'__html': data!?.question}}></h3>
				<div className='flex items-center gap-2'>
					<button className='flex items-center p-1 px-2 shadow-md hover:bg-primary hover:text-dText text-sm rounded-xl dark:border dark:border-dSecondary'
					onClick={()=>handleDelete(data.id)}
					><RiDeleteBin3Line/>&nbsp;delete</button>
					<button
					onClick={()=>{
						setsavedId(data.id)
						setshowphrase(!showphrase);
						setwantVideo(prev =>({
						...prev,
						index:index
					}))}}
					 className='flex items-center p-1 px-2 shadow-md hover:bg-primary hover:text-dText text-sm rounded-xl dark:border dark:border-dSecondary'><RiYoutubeLine/>&nbsp;{showphrase && wantVideo.index == index ?"close":"watch"}</button>
				</div>
			</div>
			{/* get video box */}
			<div className={` ${showphrase && wantVideo.index == index ? ' flex opacity-100  backdrop-blur-md p-4  w-[90%] my-10 shadow-md  rounded-md' :' flex  opacity-0 collapse'} transition-all duration-500 linear flex-wrap items-center justify-around gap-4 `}>
				<input className='w-[70%] gap-4 h-[40px] bg-transparent border-gray border dark:border-dSecondary p-2 rounded-md'
				onChange={(e)=>setPhrase(e.target.value)}
				 type="text" placeholder='enter video name' />
				<button
				 className='flex items-center justify-center w-[100px] h-[40px] bg-accent hover:bg-primary rounded-md  hover:text-gray'
				 onClick={()=>getVideo(index)}
				 ><RiSearch2Line/>&nbsp;search</button>
			</div>
			
			<span className='my-4 leading-10 text-gray' dangerouslySetInnerHTML={{'__html': data!?.answer}}></span>
			
		</div>
		)
		)}
		
		
		{/* end of saved convo chat */}
		
		
		
		{/* no saved video data*/}
		{ aireply.length != 0 && aireply.map((reply,id) =>(
			<div className=' shadow-sm p-4 my-4 rounded-md'>
			<div className='flex justify-between my-4 items-center w-full'>
				<h3 className='font-bold  my-4' dangerouslySetInnerHTML={{'__html': reply!?.question}}></h3>
				<div className='flex items-center gap-2'>
					<button className='flex items-center p-1 px-2 shadow-md hover:bg-primary hover:text-dText text-sm rounded-xl dark:border dark:border-dSecondary'
					onClick={()=>handleSave(id)}
					><RiSave2Line/>&nbsp;save</button>
				</div>
			</div>
			<span className='my-4 leading-10 text-gray' dangerouslySetInnerHTML={{'__html': reply!?.answer}}></span>
			
		</div>
		))
		}
		
		{/* subtopic list menu */}
		{showsubtopic &&
			<Subtopic
				subtopics={topiclist}
				close={setshowsubtopic}
				setfocus={setfocus}
			/>
		}
		{
			showfile && <Filemanager
			setmediafocus={setmediafocus}
			topic_id={chatid.module_id!}
			subtopic_id={focus}
			close={setshowFiles}
			/>
		}
		
		{wantVideo.istrue && <Listvideo
		questionid={savedId!}
		setvideolist={setvideos}
		close={setwantVideo}
		videolist={videos}
		/>}
		
		<Controls
		setaireply={setaireply}
		mediafocus={mediafocus}
		setmediafocus={setmediafocus}
		/>	
	</div>
  )
}

export default Main