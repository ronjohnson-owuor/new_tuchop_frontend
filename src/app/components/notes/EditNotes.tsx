import { useEffect, useState } from "react";
import 'react-quill/dist/quill.core.css';
import 'react-quill/dist/quill.snow.css';
import ReactQuill from "react-quill";
import { notesInterface } from "@/interface/interface";
import { postObjectNoReturn, postObjectReturn } from "@/modules/endpoint";
import { toast } from "sonner";


interface props{
	id:number,
	close:Function
}
function Editnotes({id,close}:props) {
	const [notes,setNotes] = useState<null|string>(null);
	const[preview,setPreview] = useState(false);
	
	
	 // Quill editor modules
	 const modules = {
		toolbar: [
		  [{ header: [1, 2, 3, 4, 5, 6, false] }],
		  [{ 'size': ['small', false, 'large', 'huge'] }],
		  ['bold', 'italic', 'underline', 'strike'],
		  [{ color: [] }, { background: [] }],
		  [{ align: [] }],
		  [{ 'font': [] }],
		  [{ list: 'ordered' }, { list: 'bullet' }],
		  ['blockquote', 'code-block'],
		  ['link', 'video'],
		  [{ script: 'sub' }, { script: 'super' }],
		  [{ indent: '-1' }, { indent: '+1' }],
		  ['clean'],
		],
		clipboard: {
		  matchVisual: false,
		},
		'history': {
		  'delay': 2500,
		  'userOnly': true,
		},
	  };
	
	
	useEffect(()=>{
		const res = postObjectReturn("get-edit-notes",true,{id:id}) as Promise<notesInterface>;
		res.then(data => setNotes(data.data));
	},[id]);
	
	
	const handleSaveNotes = () =>{
		const payload ={
			id:id,
			notes:notes
		}
		const res = postObjectNoReturn("save-edited-notes",true, payload);
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
	<div className="my-4">
		<div className=" flex z-20 my-4 mx-10 text-white">
			<button onClick={()=>setPreview(!preview)} className="w-[100px] h-[40px] bg-primary z-20 rounded-md text-sm hover:bg-accent">{preview ? "editor" : "preview"}
			</button>
			<button onClick={
				()=>close(false)} className="w-[100px] h-[40px] bg-primary z-20 rounded-md text-sm hover:bg-accent mx-4">close
			</button>
			{preview && <button onClick={handleSaveNotes} className="w-[100px] text-gray h-[40px] border z-20 rounded-md text-sm hover:bg-secondary mx-4">save</button>}
		</div>
		{!preview && (
			<div className="w-[95%] mx-4 my-4">
			<ReactQuill
				className=' w-full h-[70vh] rounded'
				theme="snow"
				value={notes ? `<div> ${(notes.replace(/\\n|\\r|\\n\\n\\n|\\n\\n/g, '')).trim()}<div>`  :"<h1> Loading notes please wait</h1>"}
				onChange={setNotes}
				modules={modules}
			/>
			</div>			
		)}

		{preview && (
			<div className="w-[95%] mx-10" dangerouslySetInnerHTML={{__html:notes ? `<div> ${(notes.replace(/\\n|\\r|\\n\\n\\n|\\n\\n/g, '')).trim()}<div>` :"<h1> Loading notes please wait</h1>"}}>
				
			</div>			
		)}
	</div>
  )
}

export default Editnotes