"use client"
import { useEffect, useState } from "react";
import accountManager from "../../modules/accountManagement";
import socialiteSignup from "../../modules/socialite";
import Basic from "../../modules/Basic";
import Navigation from "../components/navigation/Navigation";
import { Toaster } from "sonner";
declare const google: any;
function Signup() {
  const accountsManagers = new accountManager();
  const socialiteLogin = new socialiteSignup();
  const basic = new Basic();
  
  interface userDetail {
    name: string,
    email: string,
    password: string,
    refferall: number| null,
    picture: string,
    type: number|string //type of signup socialite or normal
  }
  
  /* global google */
  /* implement google login here */
  useEffect(() => {
    //@ts-ignore
		google.accounts.id.initialize({
		client_id:
			"500228422587-eese5k2beoj12t070opdpkd2bj0c51j0.apps.googleusercontent.com",
		callback: socialiteLogin.google_signin,
		});

		/* google button */
		//  @ts-ignore
		google.accounts.id.renderButton(document.getElementById("googleSignin"), {
		theme: "outline",
		size: "large",
		});		
    checkRefferal();
  }, []);

  /* user details to be sent to the server */
  const [userDetails, setuserDetails] = useState<userDetail>({
    name: "",
    email: "",
    password: "",
    refferall:null,
    picture: "",
    type: 0, //zero means normal sign in while 1 means someone is using a socialite login
  });

  const [showPassword, setshowPassword] = useState(false);
  const checkRefferal = () =>{
    const reffererCode = window.location.href.split('?ref=');
    if(reffererCode[1]){
      let userId = basic.decodeUrl(reffererCode[1]);
      setuserDetails(prev =>({
        ...prev,
        refferall:userId
      }));
    }
  }
  
  
  

  return (
    <div className="w-full flex flex-col items-center min-h-screen flex-wrap bg-lBackground dark:bg-dBackground text-lText dark:text-dText">
      <Toaster position="top-center"/>
		<Navigation/>
      <div className="mt-10 mx-4">
        <h1 className="text-xl mb-10 md:text-[50px] p-2 bg-gradient-to-r from-primary to-accent via-error bg-clip-text text-transparent font-bold ">create account</h1>
        <div id="googleSignin" className="my-4 z-0"></div>
		<div className="w-full h-[2px] bg-accent rounded-md"></div>
     <center><h3 className="text-xl my-4">OR</h3></center>
        <div className="flex flex-col mt-10">
          <input
            className="border bg-transparent border-lSecondary dark:border-dSecondary outline-none my-4 p-2 h-[2.5rem]  rounded focus:outline-primary shadow-md"
            type="text"
            placeholder="user name"
            onChange={(e) =>
              setuserDetails((prev) => ({
                ...prev,
                name: e.target.value,
              }))
            }
          />

          <input
            className="border bg-transparent border-lSecondary dark:border-dSecondary outline-none my-4 p-2 h-[2.5rem]  rounded focus:outline-primary shadow-md"
            type="email"
            placeholder="email"
            onChange={(e) =>
              setuserDetails((prev) => ({
                ...prev,
                email: e.target.value,
              }))
            }
          />

          <div className="flex flex-wrap gap-2 items-center">
            <input
             className="border shadow-md bg-transparent border-lSecondary dark:border-dSecondary outline-none my-4 p-2 h-[2.5rem]  rounded focus:outline-primary w-[70%]"
              type={showPassword ? "text" : "password"}
              placeholder="password"
              onChange={(e) =>
                setuserDetails((prev) => ({
                  ...prev,
                  password: e.target.value,
                }))
              }
            />
            <span
              className="text-sm cursor-pointer shadow h-[2.5rem] rounded p-2 border border-lSecondary dark:border-dSecondary flex items-center justify-center text-center w-[20%]"
              onClick={() => setshowPassword(!showPassword)}
            >
              {showPassword ? "hide" : "show"}
            </span>
          </div>
        </div>
		<button
      onClick={()=>accountsManagers.authenticate('normal-signin',userDetails)}
       className="w-[150px] hover:text-dText bg-gradient-to-r from-primary to-accent via-error text-sm h-[40px] my-4 rounded-md text-white p-2">sign in</button>
       <button className="w-[150px] mx-2 hover:bg-gradient-to-r from-primary to-accent hover:text-dText text-sm h-[40px] border border-text_dark my-4 rounded-md hover:text-white p-2" onClick={()=>window.location.href='/login'}>log in</button> 
      </div>
      {/* end of normal sign in and start of socialite sign in */}
    </div>
  );
}

export default Signup;
