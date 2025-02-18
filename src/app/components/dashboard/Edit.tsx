import {postObjectNoReturn } from "@/modules/endpoint";
import Image from "next/image";
import { useEffect, useState } from "react"
import { RiCloseLine, RiEdit2Line, RiUpload2Line } from "react-icons/ri";
import { toast } from "sonner";

function Edit() {
	const [edit,setEdit] = useState(true);
	const [image,setImage] = useState<File|Blob|null>(null);
	const [preview,setPreview] = useState('');
	const [userData,setuserData] = useState({
		name:'',
		picture:image
	});
	
	
	const handleImage = (imageData: File|Blob) => {
		if (imageData) {
			const previewUrl = URL.createObjectURL(imageData);
			setPreview(previewUrl);
			setImage(imageData);
		  }
	}
	
	useEffect(()=>{
		setuserData(prev => ({
			...prev,
			picture:image
		}));
	},[image]);
	
	// send update request
	const update = () => {
		const fd = new FormData();
		fd.append('name',userData.name);
		fd.append('image',userData.picture as File);
		const res = postObjectNoReturn('edit-user',true,fd);
		res.then(data =>{
			if(data.success){
				toast.success("edits saved",{
				  duration:4000,
				  className:'bg-sucess text-dText'
				})
			  }else{
				toast.error("unable to save edits",{
				  duration:4000,
				  className:'bg-error text-dText'
				})
			  }
		})
	}
	
	
  return (
	<div className="shadow-md my-4 p-4 rounded-md dark:border dark:border-dSecondary">
		<h3 className="font-bold text-xl">Profile setting</h3>
		<div>
			<div className="my-4 border border-dotted border-primary p-4 rounded-md cursor-pointer text-sm">
				<input className="hidden" onChange={(e)=>handleImage(e.target.files![0])} id="imageProfile" type="file"/>
				<label className="my-4" htmlFor="imageProfile"><RiUpload2Line/> &nbsp; click here to change profile image</label>
			</div>
			<Image alt="profile review"  src={preview} className="m-4 w-[90%] min-h-0 max-h-[250px] object-cover" />
			<label className="m-2 text-lgray" htmlFor="name">user name</label>
			<div id="metaDataHolder"  className="bg-light text-dark p-4 flex gap-4 rounded-md items-center">
					<input id="name" className="h-[40px] p-2 outline-none w-[70%] md:w-auto rounded-md"
					onChange={(e)=>setuserData(prev=>({
						...prev,
						name:e.target.value
					}))}
					disabled={edit}  
					  type="text" value={!edit ? userData.name : 'your current name'} />
					<span onClick={()=>setEdit(!edit)} className="cursor-pointer flex dark:border dark:border-dSecondary rounded-md h-[40px] px-2 text-gray  items-center text-sm sm:text-md">{edit ? <RiEdit2Line/> : <RiCloseLine/>} &nbsp;{edit ? 'edit' : 'close'}</span>
			</div>
			 <button  className=" w-[90%] h-[40px] bg-primary text-dText rounded-md" onClick={update}>save changes</button>
		</div>
	</div>
  )
}

export default Edit