"use client"
import { topic, topicStructure } from '@/interface/interface'
import { postNoObjectReturn } from '@/modules/endpoint';
import React, { useEffect, useState } from 'react'
import Topic from './Topic';
import Loading from './Loading';
import { nohistory } from '../container';
import Link from 'next/link';
import Image from 'next/image';
import { Toaster, toast } from 'sonner';

function Lesson() {
	
	const [topic,setTopic] = useState<topicStructure[]|null>(null);
	const [showNoLesson, setshowNoLesson] = useState(false);
	useEffect(()=>{
		const res = postNoObjectReturn("saved-topics",true) as Promise<topic>;
		res.then(data =>{
			if(data.data.length != 0){
				setTopic(data.data);
			}else{
				setshowNoLesson(true);
				toast.error('you have no topic',{
					duration:4000,
					className:'bg-error text-dText'
				});
			}
		});
	},[]);
	
	setTimeout(() => {
	  setshowNoLesson(true);
	}, 20000);
	
	
	
	
  return (
	<div>
		<Toaster position='top-center'/>
		{topic === null &&
		 <div>
			{!showNoLesson ? (
				<Loading />
          ) : (
            <div className='grid place-items-center mt-10'>
              <Image
                className="w-[200px] h-[200px]"
                src={nohistory}
                alt="topic not found"
              />
              <span className="text-sm">
                no topic found,create topic
                <Link className="text-primary underline" href="/">
                  here
                </Link>
              </span>
            </div>
          )}
			
		</div>}
		{topic !== null && <Topic topics={topic}/>}
	</div>
  )
}

export default Lesson