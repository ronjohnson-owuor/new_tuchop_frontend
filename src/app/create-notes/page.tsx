"use client"
import React, { useEffect, useState } from 'react'
import Navigation from '../components/navigation/Navigation'
import { RiPencilLine} from 'react-icons/ri'
import Footer from '../components/footer/Footer'
import { postObjectNoReturn, postObjectReturn } from '@/modules/endpoint'
import { notesInterface, topicsInterface } from '@/interface/interface'
import Displaynotes from '../components/notes/Displaynotes'
import { Toaster, toast } from 'sonner'

function page() {
  const [search,setSearch] = useState<string|null>(null);
  const [topics,setTopics]  = useState<string[]|[]>([]);
  const [notes, setNotes] = useState<null | string>(null);
  const[notesToBeSaved,setnotesToBeSaved] = useState({
    title:"",
    notes:notes
  });
  // this function gets topic before user gets the notes i.e we first get the topics first is
  // when we get the notes for the topic
  const handleGetTopic = () =>{
      const res = postObjectReturn("get-topic-notes", true,{ title: search }) as Promise<topicsInterface>;
      res.then(data =>{
        setTopics(data.data);
        if(data.success){
          toast.success(data.message,{
            duration:4000,
            className:'bg-sucess text-dText'
          })
        }else{
          toast.error(data.message,{
            duration:4000,
            className:'bg-error text-dText'
          })
        }
      });
  }
  
  // now get the notes according to the topic  the user has picked
  const handleGetNotes = (choosentopic:string) =>{
      setnotesToBeSaved(prev =>({
        ...prev,
        title: choosentopic.trim(),
      }))
      const  res = postObjectReturn("get-notes",true,{ title:choosentopic.trim()}) as  Promise<notesInterface>;
      res.then ( data => {
        setNotes(JSON.stringify(data.data));
        if(data.success){
          toast.success(data.message,{
            duration:4000,
            className:'bg-sucess text-dText'
          })
        }else{
          toast.error(data.message,{
            duration:4000,
            className:'bg-error text-dText'
          })
        }
      });
    
      
  }
  
  
  useEffect(()=>{
    setnotesToBeSaved(prev=>({
      ...prev,
      notes:notes
    }))
  },[notes]);
  
  // if the user is happy with the notes he can save them using this function 😅😅
  //  take a break man => MESSI IS THE GOAT🐐🐐
  const saveNotes = () =>{
    const res = postObjectNoReturn("save-notes",true,notesToBeSaved);
    res.then(data =>{
      if(data.success){
        toast.success("notes saved",{
          duration:4000,
          className:'bg-sucess text-dText'
        })
      }else{
        toast.error("unable to save notes",{
          duration:4000,
          className:'bg-error text-dText'
        })
      }
    });

  }
  
  
  
  return (
	<div
	className='w-full min-h-screen bg-lBackground dark:bg-dBackground text-lText dark:text-dText'
	>
    <Toaster position='top-center'/>
		<Navigation/>
		{notes === null && 
    <>
    <center>
        <h1 className="my-4 text-xl text-primary font-bold">
          notes generator
        </h1>
      </center>
      {/* start of note search and controll */}
      <div className="w-full flex my-10 items-center justify-center">
        <div className="w-[90%] sm:w-[450px] h-[55px] p-2 pb-2  mx-4 rounded-md shadow-md flex gap-4">
          <input
          onChange={(e) =>setSearch(e.target.value)}
            className="w-[70%] h-[40px] rounded-md p-2 outline-none text-sm border border-lSecondary bg-transparent dark:border-dSecondary "
            type="text"
            placeholder="enter topic to get notes"
          />
          <button
          onClick={handleGetTopic}
            className="w-[30%] h-[40px] rounded-md bg-accent dark:border border-lSecondary hover:border-none dark:border-dSecondary hover:text-white hover:bg-primary bg-light flex items-center justify-center"
          >
          <RiPencilLine className='hidden sm:block'/> &nbsp; create
          </button>
        </div>

      </div>

        {topics.length == 0 && <div className="w-full max-h-[400px] flex items-center text-gray  mt-[100px] flex-col">
          <h1 className="text-gray font-bold mb-4 text-xl">
            tips on getting better notes
          </h1>
          <ol className="flex items-start leading-8 flex-col my-4 w-[90%] mx-4 md:w-[50%] md:mx-0 text-text_light text-sm">
            <li>
              1.Be spesific with what you want to get notes for eg limit instead
              of calculus
            </li>
            <li>
              2.If your topic span different field eg mathematics,physics it
              advised to specify the field in brackets eg limit(mathematics)
            </li>
            <li>
              3.Once you have gotten some notes you can edit them and save them
              for future reffrence and editing.
            </li>
          </ol>
        </div>}
        
        {/* when there are topics to get notes from */}
        
        {topics.length !=0 &&  <div className="flex flex-wrap items-center w-[90%] p-4 justify-center gap-2 my-10 mx-10 ">
          {topics.map((topic,id) =>(
            <p key={id} onClick={()=>handleGetNotes(topic)} className="p-2 shadow-md cursor-pointer rounded-md active:bg-primary dark:border dark:border-dSecondary">{topic}</p>
          ))}
	  </div>}
		<br />
		<Footer/>
    </>
    	}	
      
      
      {/* display the notes */}
      {notes != null &&
       <Displaynotes
       setnotes={setNotes}
       savenotes={saveNotes}
       notes={notes}
      /> }
      
      
      
	</div>
  )
}

export default page