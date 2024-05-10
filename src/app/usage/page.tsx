"use client"
import React, { FormEvent, useEffect, useState } from 'react'
import Navigation from '../components/navigation/Navigation'
import { postNoObjectReturn, postObjectReturn } from '@/modules/endpoint';
import { paymentUrl, profileFormat, profileObject } from '@/interface/interface';
import { Toaster, toast } from 'sonner';
import Basic from '@/modules/Basic';

function Page() {
	
	const [amount,setamount] = useState(100);
	
	const[profileData,setprofileData] = useState <profileObject | null>(null);
	const [queries,setqueries] = useState(0);
	const basic = new Basic();
	useEffect(()=>{
		const res = postNoObjectReturn('get-user',true) as Promise<profileFormat>;
		res.then(data =>setprofileData(data.data));
	},[]);
	
	const handlePayment = (e:FormEvent) =>{
		toast.info("payment initialised",{
			duration:4000,
			position:'top-center',
			className:"bg-primary text-dText"
		});
		e.preventDefault();
		const data = {
			amount:amount
		}
		const res = postObjectReturn('express-payment',true,data) as Promise<paymentUrl>
		res.then(data =>{
			if (data.success){
				toast.success("redirecting to payments Page",{
					duration:4000,
					position:'top-center',
					className:"bg-sucesss text-dText"
				});
				window.open(data.data);
			}else{
				toast.success("unable to make payment",{
					duration:4000,
					position:'top-center',
					className:"bg-error text-dText"
				});
				console.log(data);
			}
		})
	}
	
	
  return (
	<div className='w-full h-screen bg-lBackground dark:bg-dBackground'>
		<Navigation/>
		<Toaster/>
		<div className='my-4 w-[90%] mx-4 min-h-[70vh] grid grid-cols-1 md:grid-cols-2 gap-4 place-items-center'>
			<div className='shadow-md w-full sm:w-[80%] p-4 rounded-md dark:border dark:border-dSecondary'>
				<h1 className='font-bold text-lg my-2'>Top up your wallet</h1>
				<p className='text-primary'>enter your amount on ksh.(Kenyan shillings)</p>
				<form onSubmit={handlePayment} >
					<div className='flex items-center justify-start mt-2'>
						<input type="text"  className='w-[60px] h-[40px] p-2 font-bold' disabled value={`KES`}/>
						<input type="number"
						className='w-[90%] h-[40px] bg-lSecondary dark:bg-dSecondary rounded-sm'
						min={100} required placeholder='100'
						onChange={(e)=>setamount(Number(e.target.value))}
					  />
					</div>
					<input type="submit" className='w-full h-[40px] bg-primary hover:bg-accent text-dText my-4 rounded-md' value="top up"/>
				</form>
			</div>
			
			<div className='shadow-md p-4 rounded-md dark:border dark:border-dSecondary'>
				<h1 className='text-lg font-bold'>BALLANCE</h1>
				<p className='text-lText dark:text-dText'>for more infor check your  dashboard</p>
				{profileData?.plan_type ? <span className='text-[50px] font-bold md:text-[50px] text-primary my-10'>ksh. {basic.trimprice(Number(profileData?.plan_type))}</span>:<span className='text-[50px] mdtext-[200px] text-primary my-10'>0.00</span>}
			</div>
			
			
		</div>
		
	</div>
  )
}

export default Page