
import { setterFormat2, topicStructure } from "@/interface/interface";
import { useEffect, useState } from "react"
import { postObjectNoReturn, postObjectReturn } from "@/modules/endpoint";
function Topics() {
	const[response,setResponse] = useState<topicStructure[]>();
	const[maximumPerpage, setmaximumPerpage] = useState(2);
	const [continue_delete, setcontinue_delete] = useState(false);
	const [delete_id, setdelete_id] = useState(0);
	const[topicleft,settopicleft] = useState<string|number>(0);
	useEffect(() => {
		const res = postObjectReturn("saved-topics", true, {lastIndex: maximumPerpage }) as Promise<setterFormat2>;
		res.then((data) => {
			settopicleft(data.topics_remaining);
			setResponse(data.data)})
	  }, []);
	  
	  const handleLoadMore = () => {
		setmaximumPerpage(()=>maximumPerpage+2);
		LoadMore();
	  }
	  const LoadMore = () => {
		if(maximumPerpage > 2){
			const res = postObjectReturn("saved-topics", true, {lastIndex: maximumPerpage }) as Promise<setterFormat2>;
			res.then(data => {
				settopicleft(data.topics_remaining)
				setResponse(data.data)})
		}

	  }
	  
	  
	//   delete user topic
	const delete_topic = (topic_name: string, topic_id: number) => {
		setdelete_id(topic_id);
		const confirm_delete = confirm(`confrim delete of ${topic_name}`);
		if(confirm_delete){
			setcontinue_delete(true);			
		}
	  };
	  
	  
	    /* user allowed topic delete */
  useEffect(() => {
    if (continue_delete) {
      if (delete_id !== 0) {
        const deleteObject = {
          id: delete_id,
        };
        /* send code to the backend to complete deletion*/
        const res = postObjectNoReturn("delete-topic",true,deleteObject);
		res.then(data =>console.log(data));
        const resReload = postObjectReturn("saved-topics",true,{lastIndex: maximumPerpage-1})as Promise<setterFormat2>;
		res.then(data => {
			settopicleft(data.topics_remaining)
			setResponse(data.data)})
      }
      /* set continue delete to false after deleteing to avoid deleting things mistakenly */
      setcontinue_delete(false);
    }
  }, [continue_delete, delete_id]);
	  
	  
	  
	  
	  
	  
	  
  return (
	<div className="shadow-md p-4 dark:border dark:border-dSecondary">
		<h3 className="text-xl">Your lessons &nbsp;{response?.length}</h3>
		<hr className="text-lgray my-2" />
		<div id="div_scroll" className="w-[90%] p-2 flex flex-col gap-2 max-h-[300px] overflow-y-scroll">
			{/* start of lesson */}
			{response?.map((lessons)=>(
				<div key={lessons.topic_id} id="lesson_box" className="flex gap-2 bg-light p-2 rounded-md justify-around items-center">
				<div>
					<p className="text-xl">{lessons.topic_name}</p>
					<span className="text-sm">{lessons.date_created}</span>
				</div>
				<div className="flex flex-wrap gap-2">
					<button onClick={() =>
                      (window.location.href = `/lessonmodule/${lessons.topic_name}/${lessons.topic_id}`)
                    } className="bg-lSecondary dark:bg-dSecondary p-2 rounded-md text-sm hover:bg-primary hover:text-white">open</button>
					<button className="bg-lSecondary dark:bg-dSecondary p-2 rounded-md text-sm hover:bg-primary hover:text-white" onClick={() =>
                      delete_topic(lessons.topic_name, lessons.topic_id)
                    }>delete</button>
				</div>
			</div>
			))}
			{/* end of lesson */}
			
		</div>
		<div className="flex gap-4 items-center justify-center">
		<p className="my-4 p-2">lessons left: &nbsp;{topicleft}</p>
		 <button onClick={handleLoadMore} className="w-[80px] hover:bg-accent hover:text-dText transition-all hover:translate-x-2 text-sm h-[40px] bg-primary mx-4 rounded-md p-2 text-lSecondary">more</button>
		</div>

	</div>
  )
}

export default Topics