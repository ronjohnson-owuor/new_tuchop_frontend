"use client";
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

function Page() {
  const {slug} = useParams();
  const [blogheading,setblogheading] = useState("");

useEffect(()=>{
  if (typeof slug == "string") {
    // Join the array elements with a space
    const heading = slug.replace(/-/g," ");
    setblogheading(heading);
  }
},[slug]);


  return (
    <div>{blogheading}</div>
  )
}

export default Page