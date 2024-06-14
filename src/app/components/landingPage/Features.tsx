import React from 'react'
import { RiBook2Line, RiFile2Line, RiPlayLine, RiRobot2Line } from 'react-icons/ri'

function Features() {
  return (
    <div className='w-full min-h-[400px] p-4 grid place-items-center my-20 bg-primary'>
    <div>
        <h3 className='text-[30px] font-bold'>Our Features</h3>
    </div>
    {/* feature list box */}
    <div className='w-[95%] grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-2'>
        <div className=' rounded-md bg-lSecondary text-lText min-h-[100px] mx-4 flex items-center flex-col justify-center gap-4 p-4'>
            <RiRobot2Line className='text-[100px] text-primary'/>
            <h3 className='font-bold'>Ai assistant</h3>
            <span className='text-[11px]'>Get answers to your questions with the help of our AI assistant.Detailled explanation and better responses.</span>
        </div>

        <div className=' rounded-md bg-lSecondary text-lText min-h-[100px] mx-4 flex items-center flex-col justify-center gap-4 p-4'>
            <RiPlayLine className='text-[100px] text-primary'/>
            <h3 className='font-bold'>study videos</h3>
            <span className='text-[11px]'>Get study videos to futher understand what you have learned.
            Without exiting the website.All videos are also saved for future reference too</span>
        </div>


        <div className=' rounded-md bg-lSecondary text-lText min-h-[100px] mx-4 flex items-center flex-col justify-center gap-4 p-4'>
            <RiFile2Line className='text-[100px] text-primary'/>
            <h3 className='font-bold'>Read and summarize PDF</h3>
            <span className='text-[11px]'>Read and summarize pdfs.Extract main points and also ask questions from the same pdf.This allows you to get a wholesome study experience in one platform.</span>
        </div>


        <div className=' rounded-md bg-lSecondary text-lText min-h-[100px] mx-4 flex items-center flex-col justify-center gap-4 p-4'>
            <RiBook2Line className='text-[100px] text-primary'/>
            <h3 className='font-bold'>Study notes</h3>
            <span className='text-[11px]'>With just one click you can get study notes about the topic you are studying,save the notes for future refrence.without exiting the platform</span>
        </div>

    </div>

</div>
  )
}

export default Features