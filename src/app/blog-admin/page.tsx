"use client"
import React, { useState } from 'react'
import Navigation from '../components/navigation/Navigation'
import Authentication from '../components/blog/Authentication'
import { Toaster } from 'sonner'
import Blogmenu from '../components/blog/Blogmenu'

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