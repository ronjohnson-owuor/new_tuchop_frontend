"use client"
import React, { useState } from 'react'
import Navigation from '../components/navigation/Navigation'
import { Toaster } from 'sonner'
import dynamic from 'next/dynamic'



// dynamically importing components
const Authentication = dynamic(
  () => {
    return import('../components/blog/Authentication');
  },
  { ssr: false }
);


const Blogmenu = dynamic(
  () => {
    return import('../components/blog/Blogmenu');
  },
  { ssr: false }
);



function Page() {
  const[sessionactive,setsessionactive] = useState(false);
  return (
    <div className='w-full h-screen min-h-screen'>
        <Toaster position='top-center'/>
        <Navigation/>
        {/* admin has not yet signed in */}
        {!sessionactive && <Authentication setSession={setsessionactive}/>}
        {sessionactive && <Blogmenu/>}
    </div>
  )
}

export default Page