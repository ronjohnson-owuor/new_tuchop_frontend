import { postObjectNoReturn } from '@/modules/endpoint';
import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Toaster, toast } from 'sonner';

interface prop {
    close:Function
}


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

function Createpost({close}:prop) {

    const [value,setValue] = useState("");
    const [createblogdata,setcreateblogdata] = useState({
        heading:"",
        content:"",
        thumbnail:""
    });

    useEffect(()=>{
       setcreateblogdata(prev =>({
            ...prev,
            content:value
        }))
    },[value]);

    const createBlog = () =>{
        const res = postObjectNoReturn("create-blog",true,createblogdata);
        res.then(data => toast.info(data?data:"action complete",{
            className:"bg-primary text-dText"
        }))
    }

  return (
    <div className=' w-full h-screen'>
        <Toaster position='top-center'/>
        <div className='w-full flex justify-start sm:justify-around items-center my-0 gap-4'>
            <h3 className='text-md sm:text-4xl ml-4'>create post</h3>
            <div className='flex gap-4'>
                <button onClick={createBlog} className='w-[80px] flex items-center justify-center gap-2 h-[40px] rounded-md bg-accent hover:bg-primary text-dText my-4'>save</button>
                <button className='w-[80px] flex items-center justify-center gap-2 h-[40px] rounded-md bg-accent hover:bg-primary text-dText my-4' onClick={()=>close(false)}>close</button>
            </div>
        </div>

        {/* react quill */}
        <div className='w-[90%] flex flex-col mx-[5%] sm:flex-row justify-start sm:justify-center my-10 items-center gap-4'>
            <input className='w-[90%] sm:w-[45%] h-[40px] rounded-md' type="text" onChange={(e)=>setcreateblogdata(prev =>({
                ...prev,
                heading:e.target.value
            }))} placeholder='heading'/>
                <input className='w-[90%] sm:w-[45%] h-[40px] rounded-md' type="text" onChange={(e)=>setcreateblogdata(prev =>({
                ...prev,
                thumbnail:e.target.value
            }))} placeholder='poster link' />            
        </div>


        <ReactQuill modules={modules} className='w-[90%] mx-[5%] my-10 h-[250px]' theme="snow" value={value} onChange={setValue} />
        <div className='w-[90%] mx-[5%] my-[100px]' dangerouslySetInnerHTML={{__html:value}}></div>
    </div>
  )
}

export default Createpost