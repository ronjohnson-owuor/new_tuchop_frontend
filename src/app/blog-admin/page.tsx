"use client"
import React from 'react'
import Navigation from '../components/navigation/Navigation'
import Authentication from '../components/blog/Authentication'
import { Toaster } from 'sonner'

function Page() {
  return (
    <div className='w-full h-screen min-h-screen'>
        <Toaster position='top-center'/>
        <Navigation/>
        <Authentication/>
    </div>
  )
}

export default Page