"use client"
import { savedNotes } from "@/interface/interface";
import Basic from "@/modules/Basic";
import { postObjectNoReturn } from "@/modules/endpoint";
import Link from "next/link";
import { useState } from "react";
import { RiDeleteBin3Line, RiEdit2Line } from "react-icons/ri";
import Editnotes from "./EditNotes";
import Readnotes from "./Readnotes";
import { toast } from "sonner";
import Nolesson from "../lessonview/Nolesson";



interface notesInterface{
  notes:savedNotes[]
}
function Notelistcomponent({notes}:notesInterface) {
  const basic = new Basic();
  const[isediting,setisediting] = useState(false);
  const [editnotes,seteditnotes] = useState(-1);
  const[readnotes,setreadnotes] = useState(false);
  
  function  handleDelete(id:number){
    const res = postObjectNoReturn("delete-notes",true,{id:id});
    res.then(data =>{
      if(data.success){
        toast.success("notes deleted",{
          duration:4000,
          className:'bg-sucess text-dText'
        })
      }else{
        toast.error("unable to delete notes",{
          duration:4000,
          className:'bg-error text-dText'
        })
      }
    });
  }
  
  return (
    <>
    
    {/* when the user is not editing the notes */}
    {!isediting && !readnotes && <><center>
      <div className='flex gap-4 items-center justify-center bg-light h-[80px] w-[80%] my-4'>
				<Link href="/lessons" className="p-2 shadow-sm rounded-md mx-2 dark:border dark:border-dSecondary hover:bg-primary hover:text-dText">📙 lessons</Link>
				<Link href="/create-notes" className="p-2 shadow-sm rounded-md mx-2 dark:border dark:border-dSecondary hover:bg-primary hover:text-dText">✨ create</Link>
			</div></center>
      {notes.length == 0 && <div className="w-full min-h-[100px]"><Nolesson link="/create-notes" haslesson={false} text="no notes generated"/></div>}
    <div className="sm:w-[90%] flex sm:mx-10 mt-10 min-h-[100px] flex-wrap items-center justify-center gap-4">
      { notes != null && 
        notes?.map((note,key) =>(
          <div
        title={note.title}
        className="w-[300px] p-4 min-h-[80px] gap-2 border shadow-sm border-lSecondary rounded-md dark:border-dSecondary"
        key={key}
      >
        <h1 className="text-xl m-4 font-bold ">{basic.trim(note.title)}</h1>
        <div className=" w-full flex flex-col-reverse sm:flex-row sm:items-center sm:justify-start gap-2 text-sm ">
          <button
          onClick={()=> {
            setreadnotes(!readnotes)
          seteditnotes(note.id)}}
            className="w-[80px] my-4 sm:my-0 text-lText dark:text-dText hover:text-primary h-[40px] rounded-md dark:border dark:border-dSecondary shadow-sm"
          >
            read
          </button>
          <span className="text-lText dark:text-dText">created :&nbsp;{note.created_at}</span>
        </div>
        <div className="mx-4 my-4 w-[90%] flex items-center justify-end gap-2 p-2">
          <span
            onClick={() =>handleDelete(note.id)}
            className=" bg-error flex items-center rounded-md  p-2 text-[10px] mt-4 cursor-pointer text-dText hover:bg-primary"
          >
            <RiDeleteBin3Line/>
            &nbsp;delete
          </span>
          <span
            className=" border flex items-center dark:border-dSecondary border-lSecondary shadow-sm text-lText dark:text-dText  mx-2 rounded-md  p-2 text-[10px] mt-4 cursor-pointer text-white hover:bg-primary"
            onClick={()=> {
              setisediting(!isediting)
            seteditnotes(note.id)}}
          >
            <RiEdit2Line/>
            &nbsp;edit
          </span>
        </div>
      </div>
        ))
      }
      
    </div></>
    }
    {/* editing part */}
    {isediting && <Editnotes
    id = {editnotes}
    close={setisediting}
    />}
    {/* user reading his/her notes */}
    {readnotes && 
    <Readnotes
    id={editnotes}
    close={setreadnotes}
    />
    }
    </>
  );
}

export default Notelistcomponent;
