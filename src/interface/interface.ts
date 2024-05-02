interface TopicInterface{
	message:string,
	success:boolean,
	token:string
}

interface savedLessonMetaData {
	name:string,
	id:number
}

interface saveLessonInterface{
	message:string,
	success:boolean,
	token:savedLessonMetaData,
	error:boolean
}
 interface data{
	id:number,
	email:string,
	name:string,
	picture:string|null,
	token_remaining:number,
	plan_type:number
}
 interface userdata {
	message:string,
	success:boolean,
	data:data
	
}

  interface topicList{
	message:string,
	success:boolean,
	data:(string|number)[]
}

 interface topicStructure {
	topic_id: number,
	topic_name: string,
	topics_choosen: string,
	date_created: string
  }
  
//   setter formart for the lessons page
 interface topic {
	message: string,
	success: boolean,
	data: topicStructure[],
	topics_remaining:number
  }
  
   type  savedDataInterface = {
	id:any,
	question:string,
	answer:string,
	submodule_id:number,
	module_id:number,
	follow_up_question:string[],
	videosId:youtubeVideoListFormart[]
}

interface mediaData {
	media_name:string,
	user_id:number,
	topic_id:number,
	subtopic_id:number,
	media_url:string,
	media_type:number,
	sourceId:number
}

type  mediaobjectInterface = {
	id: number|null,
	media_name:string|null,
	subtopic_id:number|null,
	media_url:string|null,
	media_type:number|null,
}

interface fileResponse {
message:string,
success:boolean,
data:mediaobjectInterface[]
}



interface youtubeVideoListFormart{
	index:number,
	video_id:string,
	thumbnail:string,
	title:string
}

 interface savedChatsIdentifier{
	module_id:number|undefined
}

 interface savedconvoInterface{
	message:string,
	success:boolean,
	data:savedDataInterface[]
}

interface notesInterface{
	message:string|null,
	success:boolean,
	data:""
}

interface AIconversationResponse{
	question:string,
	answer:string,
	videos:string[],
	follow_up_questions:string[]
};

interface AIformartResponse{
	message:AIconversationResponse,
	suucess:boolean,
	token:boolean
}

interface focusInterface {
	url:string,
	id:number,
	question:string
}


export type {
	TopicInterface,
	focusInterface,
	saveLessonInterface,
	userdata,
	data,
	topicStructure,
	topic,
	youtubeVideoListFormart,
	savedDataInterface,
	savedconvoInterface,
	savedChatsIdentifier,
	notesInterface,
	topicList,
	AIconversationResponse,
	AIformartResponse,
	mediaData,
	fileResponse,
	mediaobjectInterface
}

