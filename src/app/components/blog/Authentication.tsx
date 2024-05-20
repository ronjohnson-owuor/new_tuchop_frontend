"use client"
import { pinResponse, pinobjectInterface } from '@/interface/interface';
import { postObjectReturn } from '@/modules/endpoint';
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';


interface props{
    setSession:Function
}

function Authentication({setSession}:props) {
    const [pin,setPin] = useState<pinobjectInterface>({
        first:null,
        second:null,
        third:null,
        fourth:null
    });
    const [adminpin,setadminpin] = useState<string|null>(null);
    const joinPin = () => {
        let combinedPin = "";
        if(pin.first != null && pin.second != null && pin.third != null && pin.fourth != null){
            combinedPin = JSON.stringify(pin.first) + JSON.stringify(pin.second) + JSON.stringify(pin.third) + JSON.stringify(pin.fourth);
            setadminpin(combinedPin);
        }else{
            toast.error("invalid admin pin",{
                className:"bg-error text-dText"
            });
        }
    }

    const handlePinChange = (index: string, value: string) => {
        setPin(prev => ({
            ...prev,
            [index]: Number(value)
        }));
    };


    const validatePin = () =>{
        alert("initiated");
        const res = postObjectReturn('pin-auth',true,{pin:adminpin}) as Promise<pinResponse>;
        res.then(data =>data.data && setSession(data.data));
    }

    useEffect(()=>{
        if(adminpin != null){
            validatePin();
        }
    },[adminpin]);



 
  return (
    <div className='grid place-items-center grid-cols-1'>
        <h3 className='my-10 text-gray font-bold'>blog admin🔒</h3>
        <div className='flex flex-col items-center ' >
            <div className='flex flex-wrap gap-4'>
                <input
                 onChange={(e) => handlePinChange("first",e.target.value)} className='appearance-none border-none outlin-none shadow-md rounded-md text-center font-bold w-[60px] h-[60px]' type="text"/>
                <input className='appearance-none border-none outlin-none shadow-md rounded-md text-center font-bold w-[60px] h-[60px]' type="text" onChange={(e) => handlePinChange("second",e.target.value)} />
                <input className='appearance-none border-none outlin-none shadow-md rounded-md text-center font-bold w-[60px] h-[60px]' type="text"  onChange={(e) => handlePinChange("third",e.target.value)}/>
                <input className='appearance-none border-none outlin-none shadow-md rounded-md text-center font-bold w-[60px] h-[60px]' type="text" onChange={(e) => handlePinChange("fourth",e.target.value)} />
                
            </div>  
            <button type='submit' onClick={joinPin} className='w-full h-[40px] rounded-md bg-accent hover:bg-primary text-dText my-4'>confirm</button> 
            <span className='text-gray'>&nbsp;tuchop AI,zeron Labs</span>         
        </div>

    </div>
  )
}

export default Authentication