"use client";
import Footer from '@/app/components/footer/Footer';
import Nolesson from '@/app/components/lessonview/Nolesson';
import Navigation from '@/app/components/navigation/Navigation';
import { readblog, readblogdata } from '@/interface/interface';
import { postObjectNoReturn, postObjectReturn } from '@/modules/endpoint';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { RiChat1Fill, RiChat1Line, RiSendPlane2Line } from 'react-icons/ri';
import { Toaster, toast } from 'sonner';

function Page() {
  const {slug} = useParams();
  const [blogheading,setblogheading] = useState("");
  const [readblog,setreadblog] = useState<readblogdata|null>(null);
  const [comment,setComment] = useState("");

useEffect(()=>{
  if (typeof slug == "string") {
    // Join the array elements with a space
    const heading = slug.replace(/-/g," ");
    setblogheading(heading);
  }
},[slug]);



useEffect(()=>{
  const res = postObjectReturn("read-blog",false,{heading:blogheading}) as Promise<readblog>;
  res.then(data =>{
    if(data.success){
      setreadblog(data.data);
    }
  })
},[blogheading]);



const likeBlog = (id:number) =>{
  if(id){
    const res = postObjectNoReturn("like-blog",true,{blogId:id});
    res.then(data =>toast.info(data,{className:'bg-primary text-dText'}))    
  }

}




const commentBlog = (id:number) =>{
  if(id){
    const res = postObjectNoReturn("comment-blog",true,{blogId:id,comment:comment});
    res.then(data =>toast.info(data,{className:'bg-primary text-dText'}))    
  }

}


  return (
    <div>
      <Toaster position='top-center'/>
      <Navigation/>
      {readblog == null && <Nolesson haslesson={false} text='loading blog 🥰' linkrequired={false} />}
      {readblog && (
        <div className='w-[90%] mx-[5%]  my-10'>
          <h1 className='m-4 text-2xl font-bold sm:text-[50px] leading-normal'>{blogheading}</h1>
          <img className='w-[80%] md:w-[90%] m-4 h-[400px] object-cover' src={readblog.thumbnail} alt="blog thumbnail" />

          <div className='mx-4 bg-lSecondary dark:bg-dSecondary w-[80%] sm:w-[30%] p-4
           my-4 rounded-md flex items-center justify-start sm:justify-between gap-4'>
            <button onClick={()=>likeBlog(readblog.id)}  className=' w-[80px] p-2 text-dText bg-primary rounded-md '>👍 {readblog.likes}</button>
            <span className='flex items-center'><RiChat1Line/> &nbsp; {readblog.comment.length}</span>
          </div>
          <div className='w-[90%] leading-loose dark:text-dText my-4' dangerouslySetInnerHTML={{__html:readblog.content}}></div>
          <hr className='my-10 ' />
          <h1 className='text-xl md:text-2xl font-bold flex items-center my-4'><RiChat1Fill/> &nbsp; Post comment</h1>
          {/* comment box */}
          <div className='flex flex-col gap-2 w-[90%]'>
            <textarea onChange={(e)=>setComment(e.target.value)}  placeholder='enter your comments' className='w-full h-[150px] border border-dSecondary rounded-md'></textarea>
            <button onClick={()=>commentBlog(readblog.id)} className='w-[200px] bg-gray text-dText rounded-md hover:bg-primary h-[40px] flex items-center justify-center my-4'><RiSendPlane2Line/>&nbsp; post comment</button>
          </div>

          {/* list comment */}
          <div>
            {readblog.comment.length != 0 && readblog.comment.map((comment,index)=>(
              <div key={index} className='shadow-md dark:border dark:border-dSecondary rounded-md p-2 flex flex-col flex-wrap my-4 w-full min-h-2'>
              <div className='flex gap-4 items-center justify-start'>{comment.picture && <img src={comment.picture} className='w-[50px] h-[50px] rounded-[100vh] my-4' alt="profile picture" />}<h3 className='font-bold text-gray'>{comment.name}</h3></div>
              <span className='my-2'>{comment.comment}</span>
              <span className='text-gray'>{comment.date}</span>
            </div>
            ))}
          </div>
        </div>
      )}





      <Footer/>
    </div>
  )
}

export default Page