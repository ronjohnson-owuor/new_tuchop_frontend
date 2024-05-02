"use client"
//import CryptoJS from 'crypto-js';
import { useEffect, useState } from 'react';
import { postNoObjectReturn } from '@/modules/endpoint';
import { profileFormat, profileObject } from '@/interface/interface';
import User from '../components/dashboard/User';
import Topics from '../components/dashboard/Topics';
import General from '../components/dashboard/General';
import Edit from '../components/dashboard/Edit';
import Disclaimer from '../components/dashboard/Disclaimer';
import Basic from '@/modules/Basic';
import Navigation from '../components/navigation/Navigation';
function Dashboard() {
	
	const[profileData,setprofileData] = useState <profileObject | null>(null);
	const [queries,setqueries] = useState(0);
	const basic = new Basic();
	useEffect(()=>{
		const res = postNoObjectReturn('get-user',true) as Promise<profileFormat>;
		res.then(data =>setprofileData(data.data));
	},[]);
	
	
	
  return (
	<div className='w-full min-h-screen text-lText dark:text-gray'>
		<Navigation/>
	<div className='my-10 mx-4 grid grid-cols-1 xl:grid-cols-3 gap-4 md:grid-cols-2'>
		<User
			data={profileData!}
			queries={setqueries}
			id={profileData?.id ? basic.encodeUrl(profileData?.id!) : "0"}
		/>
		<Topics/>
		<General
		queries={queries}
		/>
		<Edit/>
		<Disclaimer/>
	</div>
	</div>
  )
}

export default Dashboard;