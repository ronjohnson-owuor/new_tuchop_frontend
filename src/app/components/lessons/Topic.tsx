"use client"
import { topicStructure } from '@/interface/interface'
import Basic from '@/modules/Basic'
import { postObjectNoReturn } from '@/modules/endpoint'
import React from 'react'
import { RiDeleteBin2Line } from 'react-icons/ri'
import { toast } from 'sonner'

interface prop{
	topics:topicStructure[]
}

function Topic({topics}:prop) {
	const basic = new Basic();
  
  
  // delete topic
  const delete_topic = (topic_id: number) => {
    const deleteObject = {
      id: topic_id,
    };
    toast.info('delete topic initialised',{
      duration:2000,
      className:'bg-primary text-dText'
    })
    const res = postObjectNoReturn("delete-topic",true,deleteObject);
    res.then(data =>{
      if(data){
        toast.info(data,{
          duration:4000,
          className:'bg-primary text-dText'
        });
      }
    })
    
  };
  
  return (
	<div>
        <div className="sm:w-[90%] flex sm:mx-10 mt-10 min-h-[100px] flex-wrap items-center justify-center">
          {topics.map((topic, key) => (
              <div
                title={topic.topic_name}
                className="w-[300px] min-h-[80px] gap-2 border border-lSecondary dark:border-dSecondary shadow-sm rounded mx-4 my-10 p-2"
                key={key}
              >
                <h1 className="text-2xl font-bold m-4">
                  {basic.trim(topic.topic_name)}
                </h1>
                <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-start gap-2 text-sm  mx-4 sm:mx-0 ">
                  <button
                    className="w-[80px] my-4 sm:my-0 text-dText  h-[40px] rounded-md bg-primary mx-2"
                    onClick={() =>
                      (window.location.href = `/lesson-view?id=${basic.encodeUrl(topic.topic_id)}`)
                    }
                  >
                    open
                  </button>
                  <span className='text-gray'>created :&nbsp;{topic.date_created}</span>
                </div>
				<div className='w-full h-[50px]  relative'>
					<button
						onClick={() =>
							
						delete_topic(topic.topic_id)
						}
						className=" bg-none  rounded-md flex mx-2  p-2 text-[10px] mt-4 cursor-pointer text-white hover:bg-primary absolute right-4 shadow-md dark:border dark:border-dSecondary"
					>
						<RiDeleteBin2Line/>
						&nbsp;delete
					</button>					
				</div>

              </div>
            ))}
        </div>
	</div>
  )
}

export default Topic