"use client"
import React from 'react'
import Navigation from '../components/navigation/Navigation'
import { RiPencilLine} from 'react-icons/ri'
import Footer from '../components/footer/Footer'

function page() {
  return (
	<div
	className='w-full min-h-screen bg-lBackground dark:bg-dBackground text-lText dark:text-dText'
	>
		<Navigation/>
		<center>
        <h1 className="my-4 text-xl text-primary font-bold">
          notes generator
        </h1>
      </center>
      {/* start of note search and controll */}
      <div className="w-full flex my-10 items-center justify-center">
        <div className="w-[90%] sm:w-[450px] h-[55px] p-2 pb-2  mx-4 rounded-md shadow-md flex gap-4">
          <input
            className="w-[70%] h-[40px] rounded-md p-2 outline-none text-sm border border-lSecondary bg-transparent dark:border-dSecondary "
            type="text"
            placeholder="enter topic to get notes"
          />
          <button
            className="w-[30%] h-[40px] rounded-md bg-accent dark:border border-lSecondary hover:border-none dark:border-dSecondary hover:text-white hover:bg-primary bg-light flex items-center justify-center"
          >
          <RiPencilLine className='hidden sm:block'/> &nbsp; create
          </button>
        </div>

      </div>

        <div className="w-full max-h-[400px] flex items-center text-gray  mt-[100px] flex-col">
          <h1 className="text-gray font-bold mb-4 text-xl">
            tips on getting better notes
          </h1>
          <ol className="flex items-start leading-8 flex-col my-4 w-[90%] mx-4 md:w-[50%] md:mx-0 text-text_light text-sm">
            <li>
              1.Be spesific with what you want to get notes for eg limit instead
              of calculus
            </li>
            <li>
              2.If your topic span different field eg mathematics,physics it
              advised to specify the field in brackets eg limit(mathematics)
            </li>
            <li>
              3.Once you have gotten some notes you can edit them and save them
              for future reffrence and editing.
            </li>
          </ol>
        </div>
		<br />
		<Footer/>		
	</div>
  )
}

export default page