"use client"
import dynamic from 'next/dynamic'
import React from 'react'


const Mynotes = dynamic(
	() => import("../components/notes/Mynotes"),
	{
		ssr:false
	}
);

function Page() {
  return(
		<> <Mynotes/> </>
	)
}
export default Page