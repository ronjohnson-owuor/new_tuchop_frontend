"use client"
import { useEffect, useState } from "react"
import accountManager from "../../modules/accountManagement";
import socialiteSignup from "../../modules/socialite";
import Navigation from "../components/navigation/Navigation";
declare const google: any;
function page() {
  const socialiteLogin = new socialiteSignup();
  const accountsManagers = new accountManager();
  interface userDetail {
    email:string,
    password:string,
    type:number
  }
  
  /* user details to be sent to the server */
  const [userDetails,setuserDetails] = useState <userDetail>({
    email:'',
    password:'',
    type:0
  });
  
  
    /* implement google login here */
     /* global google */ 
    useEffect(()=>{
      /* donnot remove the comment above from google */
       //@ts-ignore
      google.accounts.id.initialize({
       client_id:'500228422587-eese5k2beoj12t070opdpkd2bj0c51j0.apps.googleusercontent.com',
         callback:socialiteLogin.google_login 
      });
      
      /* google button */
      //@ts-ignore
      google.accounts.id.renderButton(
       document.getElementById('googleSignin'),
       {theme:'dark',size:'large',text:'continue_with'}
      );
     },[]);
     
     
     
  
  
  const[showPassword,setshowPassword] = useState(false);
  
  return (
	<div className="w-full flex flex-col items-center min-h-screen flex-wrap bg-lBackground dark:bg-dBackground text-lText dark:text-dText">
    <Navigation/>
    <div className="mt-4  px-4">
      <center><h1 className="text-xl mb-10 md:text-[50px] p-2 bg-gradient-to-r from-primary to-accent via-error bg-clip-text text-transparent font-bold ">We missed you</h1></center>
      <div className="flex  mt-10 items-center justify-center"> 
      <div id="googleSignin" className="my-4 z-0"></div>     
    </div>
     <div className="w-full h-[2px] bg-accent rounded-md"></div>
     <center><h3 className="text-xl my-4">OR</h3></center>
      <div className="flex flex-col mt-10">        
        <input className="border bg-transparent border-lSecondary dark:border-dSecondary outline-none my-4 p-2 h-[2.5rem]  rounded focus:outline-primary shadow-md"
         type="email"
          placeholder='email'
          onChange={(e) =>setuserDetails(prev =>({
            ...prev,
            email:e.target.value
          }))}
           />
        
        <div className="flex flex-wrap gap-2 items-center">
          <input 
          className="border shadow-md bg-transparent border-lSecondary dark:border-dSecondary outline-none my-4 p-2 h-[2.5rem]  rounded focus:outline-primary w-[70%]" 
          type={showPassword ? 'text' : 'password'}
          placeholder="password"
          onChange={(e) =>setuserDetails(prev =>({
            ...prev,
            password:e.target.value
          }))}
          />
          <span className="text-sm cursor-pointer shadow h-[2.5rem] rounded p-2 border border-lSecondary dark:border-dSecondary flex items-center justify-center text-center w-[20%]" onClick={()=>setshowPassword(!showPassword)}>{ showPassword ? 'hide' : 'show'}</span>
        </div>
      </div>
      <button
      onClick={()=>accountsManagers.authenticate('normal-login',userDetails)}
       className="w-[150px] hover:text-dText bg-gradient-to-r from-primary to-accent via-error text-sm h-[40px] my-4 rounded-md text-white p-2">log in</button>
       <button className="w-[150px] mx-2 hover:bg-gradient-to-r from-primary to-accent hover:text-dText text-sm h-[40px] border border-text_dark my-4 rounded-md hover:text-white p-2" onClick={()=>window.location.href='/signup'}>sign in</button> 
    </div>
    {/* end of normal sign in and start of socialite sign in */}
  </div>
  )
}

export default page