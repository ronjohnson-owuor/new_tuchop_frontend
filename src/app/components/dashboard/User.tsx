import { useEffect, useState } from "react";
import Basic from "@/modules/Basic";
import { generalInterface, generalObject, profileObject } from "@/interface/interface";
import { postNoObjectReturn } from "@/modules/endpoint";
import { RiClipboardLine } from "react-icons/ri";
import { avatar } from "../container";
import Image from "next/image";
interface Props{
	id:string,
	queries:Function,
	data:profileObject|undefined
}
function User({data,id,queries}:Props) {
	const basic = new Basic();
	const handleCopy = () =>{
		const inputValue = `https://tuchop.com/signup?ref=${basic.encodeUrl(data?.id!)}`;
		navigator.clipboard.writeText(inputValue)
        .then(function() {
            alert('copied');
        })
        .catch(function() {
            alert('Failed to copy');
        });
	}
	
	const  [userData, setuserData] = useState<generalObject>();
	useEffect(()=>{
		const res = postNoObjectReturn("dashboard-general",true) as Promise<generalInterface>;
		res.then(data =>setuserData(data.data));
	},[]);
	
	useEffect(()=>{
		queries(userData?.queries);
	},[userData]);
	
	
  return (
	<div className=" p-4 rounded-md shadow-md dark:text-dText text-lText dark:border dark:border-dSecondary">
	<div className="flex items-center justify-center gap-2">
		<div className="relative">
		<Image className="w-[100px] h-[100px] rounded-[100vh] object-cover" 
		width={300}
		height={300}
		src={data?.picture ? data?.picture :avatar} alt="user profile" />
		</div>
		<div className="flex flex-col">
		<span className="text-2xl font-bold">{basic.trim(data != null  ? data.name :'tuchop')}</span>
		<span className="text-sm">{data != null  ? data.email :'email'}</span>			
		</div>

	</div>
	{/* user details and info */}
	<div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-2 my-4 p-2">
		<div className="border border-lgray p-2 rounded dark:border-dSecondary">
			<p className="text-gray text-md">plan</p>
			<span className="text-gray font-bold">{data?.plan_type == "0" ? 'free' : data?.plan_type == "1" ? 'starter' :data?.plan_type == "2" ? 'pro' :'yearly'}</span>
		</div>
		<div className="border border-lgray p-2 rounded dark:border-dSecondary">
			<p className="text-gray text-md">tokens</p>
			<span className="text-gray font-bold">{data?.token_remaining}</span>
		</div>
		<div className="border border-lgray p-2 rounded dark:border-dSecondary">
			<p className="text-gray text-md">topics</p>
			<span className="text-gray font-bold">{userData?.topics}</span>
		</div>
		
		<div className="border border-lgray p-2 rounded dark:border-dSecondary">
			<p className="text-gray text-md">queries</p>
			<span className="text-gray font-bold">{userData?.queries}</span>
		</div>
		
		<div className="border border-lgray p-2 rounded dark:border-dSecondary">
			<p className="text-gray text-md">uploads</p>
			<span className="text-gray font-bold">{userData?.uploads}</span>
		</div>
	</div>
	{/* end of user overview */}
	{/* refferals */}
	<div className="my-4 bg-light p-4 rounded-md">
		<h3 className="text-md text-gray my-2 font-bold">Your refferal link</h3>
		<div className="w-[90%] h-[40px] rounded-xl bg-text_light text-white p-2 gap-2 flex items-center justify-around my-4">
		<input className="bg-text_light text-white w-[80%] rounded-md" type="text" value={`https://tuchop.com/signup?ref=${id}`} disabled />
		<RiClipboardLine className="w-[10%] sm:text-xl md:text-md cursor-pointer border border-lSecondary rounded-md p-2 h-[30px] dark:border-dSecondary" onClick={handleCopy} />
		</div>
		
		<span className="my-2">get  token for each signup using your link</span>
	</div>
</div>
  )
}

export default User