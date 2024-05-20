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
	data:string[]
}

 interface topicStructure {
	topic_id: number,
	topic_name: string,
	topics_choosen: string,
	date_created: string
  }

  interface pinobjectInterface{
	first:string|null,
	second:string|null,
	third:string|null,
	fourth:string|null
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

interface videoMessage{
	message:string,
	success:boolean,
	data:youtubeVideoListFormart[]
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

interface topicsInterface{
	message:string|null,
	success:boolean,
	data:string[]
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

 interface profileObject{
	id:number,
	name:string,
	email:string,
	picture:string,
	token_remaining:number,
	plan_type:string
}

 interface profileFormat {
	message:string,
	success:boolean,
	data:profileObject
}

interface generalObject{
	topics:number,
	queries:number,
	uploads:number
}

interface generalInterface{
	message:string,
	success:boolean,
	data:generalObject
}

interface overviewData{
	'refferals':number,
	'awards':number,
	'notes':number,
	'days':number
  }
  
  interface overview{
	message: string,
	success: boolean,
	data: overviewData,
	
  }
  
//   setter formart for the lessons page
 interface setterFormat2 {
	message: string,
	success: boolean,
	data: topicStructure[],
	topics_remaining:number
  }
  
  interface paymentUrl {
	message:string,
    success:boolean,
    data:string
  }
  
  interface savedNotes{
	id: number;
	title: string;
	created_at: string;
} 

  interface response {
	message:string,
	success:boolean,
	data:savedNotes[] | null
}

interface pinResponse{
	message:string,
	success:boolean,
	data:boolean
}


interface bloglist{
	date:string,
	heading:string,
	thumbnail:string,
	content:string,
	likes:number,
	comment:object[]
}

interface blogresponse{
	message:string,
	success:boolean,
	data:bloglist[]
}

export type {
	bloglist,
	blogresponse,
	TopicInterface,
	pinResponse,
	overviewData,
	setterFormat2,
	overview,
	generalInterface,
	generalObject,
	profileFormat,
	profileObject,
	focusInterface,
	saveLessonInterface,
	userdata,
	data,
	topicStructure,
	topic,
	savedNotes,
	youtubeVideoListFormart,
	savedDataInterface,
	savedconvoInterface,
	savedChatsIdentifier,
	notesInterface,
	topicsInterface,
	response,
	topicList,
	AIconversationResponse,
	AIformartResponse,
	mediaData,
	fileResponse,
	videoMessage,
	mediaobjectInterface,
	paymentUrl,
	pinobjectInterface
}

