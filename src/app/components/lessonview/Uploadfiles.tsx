import { postObjectNoReturn } from '@/modules/endpoint';
import React, { useState } from 'react'
import { toast } from 'sonner';

interface props {
	topic_id:number,
	subtopic_id:number
}
function Uploadfiles({topic_id,subtopic_id}:props) {
	const[showPreview,setshowPreview] = useState(false);
	const[previewmedia,setpreviewmedia] = useState("");
	const [file,setFile] = useState<object|null>(null);
	
	
		// handle file upload
		const handleFileUpload = (e:React.ChangeEvent<HTMLInputElement>) => {
			e.preventDefault();
			  const selectedFile = e.target.files && e.target.files[0];
			  /* creating url of the file */
			  const fileUrl = selectedFile!.name;
			  setFile(selectedFile);
			  setpreviewmedia(fileUrl);
		  };
		  
		  /* handle drag and drop functionality */
		  const handleDrop = (e:React.DragEvent) =>{
			e.preventDefault();
			const selectedFile = e.dataTransfer.files && e.dataTransfer.files[0];
			  /* creating url of the file */
			  const fileUrl = selectedFile.name;
			  setFile(selectedFile);
			  setpreviewmedia(fileUrl);
			
		  }
		  
		  const handleDragOver = (e:React.DragEvent) =>{
			e.preventDefault();
		  }
		  
		  
		  
		  
		/* function to send file to the server */
		function sendFileToServer(file_data:any){
			let formData = new FormData();
			if(file != null){
				formData.append('file',file_data);
					formData.append('topic_id',topic_id.toString());
					formData.append('subtopic_id',subtopic_id.toString());
					const res = postObjectNoReturn('upload-file',true,formData);
					res.then(data =>toast.info(data,
						{className:"bg-primary text-dText"}
					));
			}else{
				console.log('try choosing a file');
			}
		}
	
  return (
	<div className='w-full rounded-md min-h-full '>
		<input type="file" onChange={handleFileUpload} className='hidden' id='fileInput' />
		<label onDragOver={handleDragOver} onDrop={handleDrop} htmlFor='fileInput' className={`w-full cursor-pointer border-2  flex items-center justify-center rounded-md ${previewmedia == '' ? 'min-h-[300px]' : 'h-[100px]'}  p-2 border-lSecondary dark:border-dSecondary border-dashed `}>
			<span>{previewmedia !== "" ? `file choosen : ${previewmedia}` :"drag and drop files here or select"}</span>
		</label>
		{previewmedia !== "" && <button onClick={()=>sendFileToServer(file)} className='w-full h-[40px] rounded-md bg-accent hover:bg-primary text-dText my-4'>upload</button>}
	</div>
  )
}

export default Uploadfiles