"use state"
import React, { useState } from 'react'
import { RiAddLine, RiEdit2Line } from 'react-icons/ri'
import Createpost from './Createpost';
import Editpost from './Editpost';

function Blogmenu() {
    const [createpost,setcreatepost] = useState(true);
    const [updatepost,setupdatepost] = useState(false);

  return (
    <div className='grid place-items-center grid-cols-1'>
       { !createpost && !updatepost && <><h1 className='my-10 text-gray font-bold'>choose your action ⌨️</h1>
        <div className='flex flex-wrap gap-4'>
            <button className='w-[150px] flex items-center justify-center gap-2 h-[40px] rounded-md bg-accent hover:bg-primary text-dText my-4' onClick={()=>{
                setcreatepost(true);
                setupdatepost(false);
                }}><RiAddLine/> create post</button>
            <button 
            onClick={()=>{
                setcreatepost(false);
                setupdatepost(true);
                }}
             className='w-[150px] flex items-center justify-center gap-2 h-[40px] rounded-md bg-accent hover:bg-primary text-dText my-4'><RiEdit2Line/> edit post</button>
        </div></>}
        {createpost && <Createpost close={setcreatepost}/>}
        {updatepost && <Editpost close={setupdatepost}/>}

    </div>
  )
}

export default Blogmenu