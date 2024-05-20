"use client"
import { bloglist, blogresponse } from '@/interface/interface';
import { postObjectReturn } from '@/modules/endpoint';
import Image from 'next/image'
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { RiChat1Line } from 'react-icons/ri'
import { json } from 'stream/consumers';

function Bloglist() {

        const [blog,setblog] = useState<bloglist[]|[]>([]);
        const[amount,setamount] = useState(10);

        const getblogList = () =>{
            const res = postObjectReturn("get-blog",false,{amount:amount}) as Promise<blogresponse>;
            res.then(data =>setblog(data.data));
        }

        useEffect(()=>{
            getblogList();
        },[]);

        // redirect user
        const redirect = (heading:string) =>{
            let newHeading = heading.replaceAll(" ","-");
            return newHeading;

        }



  return (
    <div className=' w-full min-h-screen md:mx-2 my-10'>
        <h3 className='text-xl md:text-4xl font-bold bg-gradient-to-br from-primary to-accent bg-clip-text text-transparent my-4  mx-10 '>Latest educational new,tips and updates</h3>
        <div className=' w-full md:w-[95%] min-h-[100px] grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3  my-10  md:mx-4 gap-4'>
            {/* blog list here */}
            {
                blog.length != 0 && blog.map((blogSection,index) =>(
                    <div key={index}  className='w-full min-h-[100px] flex flex-wrap flex-col  rounded-md'>
                        <img src={blogSection.thumbnail} className='w-full h-[250px] object-cover rounded-md mb-2' alt="blog list image" />
                        <h3 className='text-md my-2 w-[95%]'>{blogSection.heading}</h3>
                        <span className='my-4'>📅 {blogSection.date}</span>
                        <div className='flex justify-start sm:justify-between my-4 flex-wrap gap-4 items-center' id="statistics">
                            <Link href={`/blog/${redirect(blogSection.heading)}`}  className=' w-[100px] h-[40px] bg-lSecondary dark:bg-dSecondary text-gray rounded-md outline-none border-none dark:text-dText  hover:bg-primary'>read</Link>
                            <div className='flex items-center justify-center gap-2'>
                                <span className='flex items-center gap-4'>👍 &nbsp; {blogSection.likes} </span>
                                <span className='flex items-center gap-4'><RiChat1Line/> &nbsp; {blogSection.comment} </span>
                            </div>
                        </div>
                    </div>                    
                ))
            }


        </div>
    </div>
  )
}

export default Bloglist