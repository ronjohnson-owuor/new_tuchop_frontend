import { savedNotes } from "@/interface/interface";
import Basic from "@/modules/Basic";
import { postObjectNoReturn } from "@/modules/endpoint";
import Link from "next/link";
import { RiDeleteBin3Line, RiEdit2Line } from "react-icons/ri";
import Footer from "../footer/Footer";



interface notesInterface{
  notes:savedNotes[]
}
function Notelistcomponent({notes}:notesInterface) {
  const basic = new Basic();
  function  handleDelete(id:number){
   
    const res = postObjectNoReturn("delete-notes",true,{id:id});
    res.then(data =>console.log(data));
    
  }
  return (
    <>
    <center>
      <div className='flex gap-4 items-center justify-center bg-light h-[80px] w-[80%] my-4'>
				<Link href="/lessons" className="p-2 shadow-sm rounded-md mx-2 dark:border dark:border-dSecondary hover:bg-primary hover:text-dText">📙 lessons</Link>
				<Link href="/create-notes" className="p-2 shadow-sm rounded-md mx-2 dark:border dark:border-dSecondary hover:bg-primary hover:text-dText">✨ create</Link>
			</div></center>
    <div className="sm:w-[90%] flex sm:mx-10 mt-10 min-h-[100px] flex-wrap items-center justify-center">
      
      { notes != null && 
        notes?.map((note,key) =>(
          <div
        title={note.title}
        className="w-[300px] min-h-[80px] gap-2 border border-text_dark shadow-sm rounded mx-4 my-10 p-2 flex flex-col bg-[linear-gradient(45deg,transparent_25%,rgba(68,68,68,.2)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%,100%_100%] bg-[position:-100%_0,0_0] bg-no-repeat transition-[background-position_0s_ease] hover:bg-[position:200%_0,0_0] hover:duration-[2000ms] dark:border-dSecondary"
        key={key}
      >
        <h1 className="text-md font-bold">{basic.trim(note.title)}</h1>
        <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-start gap-2 text-sm ">
          <button
            className="w-[80px] my-4 sm:my-0 text-text_light hover:text-primary h-[40px] rounded-md bg-text_dark"
          >
            read
          </button>
          <span>created :&nbsp;{note.created_at}</span>
        </div>
        <div className="mx-4 my-4">
          <span
            onClick={() =>handleDelete(note.id)}
            className=" bg-error rounded-md  p-2 text-[10px] mt-4 cursor-pointer text-white hover:bg-primary"
          >
            <RiDeleteBin3Line/>
            &nbsp;delete
          </span>
          <span
            className=" bg-success mx-2 rounded-md  p-2 text-[10px] mt-4 cursor-pointer text-white hover:bg-primary"
          >
            <RiEdit2Line/>
            &nbsp;edit
          </span>
        </div>
      </div>
        ))
      }
      
    </div>
    <Footer/>
    </>
  );
}

export default Notelistcomponent;
