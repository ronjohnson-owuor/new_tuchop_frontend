import React from 'react'

function Video() {
  return (
    <div className='w-full h-[600px] grid place-items-center mt-20'>
        <div>
            <h3 className='text-[30px] font-bold'>Your <span className='bg-gradient-to-r from-primary via-error to-accent bg-clip-text text-transparent '>all-in-one</span> go to study ai</h3>
            <span className='text-gray text-center'>prepare for your exams effortlessly</span>
        </div>
        <div className='w-[60%] h-[400px] bg-gray rounded-sm grid place-items-center'>
          <p> video loading failed</p>
        </div>

    </div>
  )
}

export default Video