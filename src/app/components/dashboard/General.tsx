import { overview, overviewData } from "@/interface/interface";
import { postNoObjectReturn } from "@/modules/endpoint";
import { useEffect, useState } from "react";


interface Props{
	queries:number
}
function General({queries}:Props) {
	const[overview, setOverView] = useState<overviewData>();
	useEffect(()=>{
		const res = postNoObjectReturn('dashboard-overview',true) as Promise<overview>;
		res.then(data => setOverView(data.data));		
	},[]);
	
	

	
  return (
	<div className="shadow-md p-4">
		<h3 className="text-xl">Account overview</h3>
		<hr className="text-lgray my-2" />
		<div id="div_scroll" className="w-[90%] p-2 flex flex-col gap-2 max-h-[300px] overflow-y-scroll">
			{/* start of lesson */}
			<div id="lesson_box" className="flex gap-2 bg-light p-2 rounded-md justify-around items-center">
					<p className="text-md">Questions asked</p>
					<span className="text-md font-bold">{queries}</span>
			</div>
			<div id="lesson_box" className="flex gap-2 bg-light p-2 rounded-md justify-around items-center">
					<p className="text-md">tokens received</p>
					<span className="text-md font-bold">{overview?.awards}</span>
			</div>
			<div id="lesson_box" className="flex gap-2 bg-light p-2 rounded-md justify-around items-center">
					<p className="text-md">notes saved</p>
					<span className="text-md font-bold">{overview?.notes}</span>
			</div>
			{/* end of lesson */}
			
			<h3 className="my-4">meta data</h3>
			<div className="flex flex-wrap gap-4">
				<div className="flex flex-col bg-gradient-to-br from-primary to-secondary p-2 rounded-md min-w-[150px] text-white">
					<span>days on tuchop</span>
					<b className="text-2xl my-2">{overview?.days} Days</b>
				</div>
				<div className="flex flex-col bg-gradient-to-br from-primary to-secondary p-2 rounded-md min-w-[150px] text-white">
					<span>total refferalls</span>
					<b className="text-2xl my-2">{overview?.refferals}</b>
				</div>
				
				
			</div>
			
		</div>
	</div>
  )
}

export default General