import { AIconversationResponse, focusInterface, savedChatsIdentifier, savedDataInterface, savedconvoInterface, topicList, videoMessage, youtubeVideoListFormart } from '@/interface/interface'
import { postObjectNoReturn, postObjectReturn } from '@/modules/endpoint';
import React, { useEffect, useState } from 'react'
import Controls from './Controls';
import { RiDeleteBin3Line, RiRepeatFill, RiReplay10Line, RiSave2Line, RiSearch2Line, RiYoutubeLine } from 'react-icons/ri';
import Subtopic from './Subtopic';
import Filemanager from './Filemanager';
import Listvideo from './Listvideo';
import { toast } from 'sonner';
import Introduction from './Introduction';
import "../../../css/scroll.css";
import Replay from './Replay';

interface prop {
	id:string,
	focus:number,
	setfocus:Function,
	showsubtopic:boolean,
	setshowsubtopic:Function,
	showfile:boolean,
	setshowFiles:Function,
	setmenu:Function
}
function Main({id,showfile,setshowFiles,focus,setfocus,showsubtopic,setshowsubtopic,setmenu}:prop) {
	const chatid :savedChatsIdentifier ={
		module_id: id !=null ? Number(id):undefined,
	  };
	  const[current,setcurrent] = useState(focus?focus:0);
	  const [answerAreaIsBlank, setanswerAreaIsBlank] = useState(true);	  
	const[videos,setvideos]  = useState<youtubeVideoListFormart[]| null>(null);
	const[topiclist,settopiclist] = useState<string[]|null>(null);
	const [savedchats,setsavedchats] = useState<savedDataInterface[]|[]>([]);
	const [aireply,setaireply] = useState<AIconversationResponse[]|[]>([]);
	const[showphrase,setshowphrase] = useState(false);
	const[mediafocus,setmediafocus] = useState<focusInterface|null>(null);
	const[phrase,setPhrase] = useState("");
	const[fullscreenenabled,setfullscreenenabled] = useState(false);
	const[savedId,setsavedId] = useState<number|null>(null);
	const[videoid,setvideoid] = useState<string|undefined>(undefined);
	const[wantVideo,setwantVideo]  = useState({
		istrue:false,
		index:0
	});
	
	useEffect(()=>{
		if(focus){
			setcurrent(focus);
		}else{
			setcurrent(0);
		}
	},[focus]);
	
	
	useEffect(()=>{
		if(id != null){
			const getTopicList = postObjectReturn("get-topic-list",true,
			{ id: id }) as Promise<topicList>;
			
			getTopicList.then(data =>{
				settopiclist(data.data);
			});
				
			const res = postObjectReturn("saved-chat",true,chatid) as Promise <savedconvoInterface>;
			res.then(data =>{
				
				if(typeof (data) == 'object'){
					setsavedchats(data.data);
				}
			});
		}
	},[id,current]);
	
	const getVideo = (id:number) =>{
		toast.info('getting your video',{
			duration:4000,
			className:'bg-primary text-dText'
		});
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
			toast.error('please enter a search term',{
				duration:4000,
				className:'bg-error text-dText'
			});
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
		const res = postObjectNoReturn('save-prompt',true,saveObject);
		// tell user something
		res.then(data =>console.log(data));
		const saveres = postObjectReturn("saved-chat",true,chatid) as Promise <savedconvoInterface>;
		saveres.then(data =>{
			if(typeof (data) == 'object'){
				setsavedchats(data.data);
				aireply.pop();
			}
		});
		
	}
	
	const handleDelete = (id:number) =>{
		const deleteres = postObjectNoReturn('delete-chat',true,{id:id});
		deleteres.then(data => {
			if (data.success){
				toast.success(data.message,{
					duration:4000,
					className:'bg-sucess text-dText'
				});
			}else{
				toast.error(data.message,{
					duration:4000,
					className:'bg-error text-dText'
				});
			}
		});
		const res = postObjectReturn("saved-chat",true,chatid) as Promise <savedconvoInterface>;
			res.then(data =>{
				if(typeof (data) == 'object'){
					setsavedchats(data.data);
				}
			});
	}
	
	
	// check if the user has a lesson
	const ShowNewUserMessage = () => {
		if (savedchats?.length == 0  && aireply.length == 0) {
		  setanswerAreaIsBlank(true);
		} else {
		  for ( let savedConvoLength = 0;savedConvoLength < savedchats.length; savedConvoLength++ ) {
			const eachSavedConversation = savedchats[savedConvoLength];
			if (Number(eachSavedConversation.submodule_id) !=  Number(focus)) {
			  setanswerAreaIsBlank(true);
			} else {
			  setanswerAreaIsBlank(false);
			  break;
			}
		  }
		}
	
		// this checks if the user has already asked some question.
		if (aireply.length != 0) {
		  setanswerAreaIsBlank(false);
		}
	  };
	
	  useEffect(() => {
		ShowNewUserMessage();
	  }, [savedchats, aireply, focus]);
	  
	  
	//   handle fullscreen
	const handleFullscreen = (videoId:string) =>{
		setvideoid(videoId);
		setfullscreenenabled(true);
		
	}
	
	
	
	
  return (
	<div id='div_scroll' className='w-[90%] mx-[5%]'>
 		{fullscreenenabled &&	<Replay fullscreenenabled={setfullscreenenabled} videoId={videoid}/>}
		<div className='w-full m-4'>
			<h1 className=' text-md md:text-xl font-bold text-primary'>{topiclist!=null ? topiclist[current] : 'Loading subtopic 👋'}</h1>
		</div>
		{/* get saved chats */}
		
		{answerAreaIsBlank && <Introduction focus={focus}/>}
		
		{savedchats != null && savedchats.length != 0 && savedchats.map((data,index) =>
		// this line below is a very critical line for the whole of tuchop AI any modification without caution may lead to servere abnormal functioning
		Number(data.module_id) == Number(id)  &&  Number(data.submodule_id) == current  && (
			<div key={index} id='div_scroll' className=' shadow-sm p-4 my-4 rounded-md'>
			<div className='flex justify-end md:justify-between my-4 items-center w-full flex-col md:flex-row'>
				<h3 className='font-bold text-sm my-4' dangerouslySetInnerHTML={{'__html': data!?.question}}></h3>
				<div className='flex items-center justify-end md:justify-center gap-2'>
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
				<input className='sm:w-[70%] w-full gap-4 h-[40px] bg-transparent border-gray border dark:border-dSecondary p-2 rounded-md'
				onChange={(e)=>setPhrase(e.target.value)}
				 type="text" placeholder='enter video name' />
				<button
				 className='flex items-center justify-center w-full sm:w-[100px] h-[40px] bg-accent hover:bg-primary rounded-md  hover:text-gray'
				 onClick={()=>getVideo(index)}
				 ><RiSearch2Line/>&nbsp;search</button>
			</div>
			
			<span className='my-4 leading-10 text-gray' dangerouslySetInnerHTML={{'__html': data!?.answer}}></span>
           {  data.videosId && data.videosId.length !=0 &&	
		   	<div className='w-full min-h-[100px] bg-lSecondary dark:bg-dSecondary my-4 rounded-md p-4'>
				<h1 className='text-md my-2 font-bold text-lText dark:text-dText border-b-2 p-2 border-lText dark:border-dText'>saved videos</h1>
				{/* map through the videos here */}
				<div id='div_scroll' className='flex flex-grow-1 overflow-x-scroll'>
					{data.videosId && data.videosId.length != 0 && data.videosId.map((video,videoindex) =>(
						<div key={videoindex} className="w-[300px] min-h-[100px] p-4 flex flex-col mx-4 shadow-md rounded-md">
							<img src ={`https://img.youtube.com/vi/${video.video_id}/hqdefault.jpg`} width={350} height={300}
							/>
							<div className="w-full  flex items-center justify-start my-4 gap-2">
							<button
							onClick={()=>handleFullscreen(video.video_id)}
							 className=" text-gray border border-lgray text-sm p-1 rounded-md flex items-center hover:text-primary cursor-pointer "><RiRepeatFill/> &nbsp;replay</button>	
							</div>
					</div>
					))}					
				</div>
			</div>}
			<div className='my-4 w-[90%] flex gap-4 justify-start'>
			{data.follow_up_question.length !=0 && data.follow_up_question.map((questions,index) =>(
				<span key={index} className='shadow-sm rounded-md dark:border dark:border-dSecondary p-2'>{questions}</span>
			))}
			</div>
			
		</div>
		)
		)}
		
		
		{/* end of saved convo chat */}
		
		
		
		{/* no saved video data*/}
		{ aireply.length != 0 && aireply.map((reply,id) =>(
			<div key={id} className=' shadow-sm p-4 my-4 rounded-md'>
			<div className='flex justify-between my-4 items-center w-full'>
				<h3 className='font-bold  my-4' dangerouslySetInnerHTML={{'__html': reply!?.question}}></h3>
				<div className='flex items-center gap-2'>
					<button className='flex items-center p-1 px-2 shadow-md hover:bg-primary hover:text-dText text-sm rounded-xl dark:border dark:border-dSecondary'
					onClick={()=>handleSave(id)}
					><RiSave2Line/>&nbsp;save</button>
				</div>
			</div>
			<span className='my-4 leading-10 text-gray' dangerouslySetInnerHTML={{'__html': reply!?.answer}}></span>
			<div className='my-4 w-[90%] flex gap-4 justify-start'>
			{reply.follow_up_questions.length !=0 && reply.follow_up_questions.map((questions,index) =>(
				<span key={index} className='shadow-sm rounded-md dark:border dark:border-dSecondary p-2'>{questions}</span>
			))}
			</div>
			
			
		</div>
		))
		}
		
		{/* subtopic list menu */}
		{showsubtopic &&
			<Subtopic
				subtopics={topiclist}
				close={setshowsubtopic}
				setfocus={setfocus}
				id={id}
			/>
		}
		{
			showfile && <Filemanager
			setmediafocus={setmediafocus}
			topic_id={chatid.module_id!}
			subtopic_id={current}
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
		setmenu={setmenu}
		setaireply={setaireply}
		mediafocus={mediafocus}
		setmediafocus={setmediafocus}
		/>	
	</div>
  )
}

export default Main