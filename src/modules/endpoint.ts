"use client"
import Cookies from 'js-cookie'
import api from "./api";
import useToken from "./token";

		const {isToken,decrypted}  = useToken();	
		
		/*  ============================================================================================ */
		/*  ============================================================================================ */
	 /* object and returns an  object */
	 const  postObjectReturn = async (path:string,authRequired:boolean,data:object): Promise <Object|string>  =>{
		let response;
		try{
			if(authRequired){
				if(isToken){
					response = await api.post(path,data,{
						headers:{
							'Authorization':`Bearer ${decrypted}`
						}
					});
				}else{
					 //tell user to sign up or login 
					return "you need to sign up"
				}
			}else{
				response = await api.post(path,data);
			}
			
		   if(response?.status === 200){
			if(response.data.success){
			return response.data;
			}else{
				return response.data;
			}
		   }else{
			return "unable to perform your request"+response?.data;
		   }
			
		} catch (error){
			return "unable to perform your request"+ error;	
		}
	 }
	 
	/*  ============================================================================================ */
	/*  ============================================================================================ */
	/* object and returns nothing*/
	const  postObjectNoReturn = async (path:string,authRequired:boolean,data:object) => {
		let response;
		try{
			if(authRequired){
				if(isToken){
					response = await api.post(path,data,{
						headers:{
							'Authorization':`Bearer ${decrypted}`
						}
					});
				}else{
					 //tell user to sign up or login 
				}
			}else{
				response = await api.post(path,data);
			}
			
		   if(response?.status === 200){
			if(response.data.success){
			//  do something with the response
			}else{
				// do something
			}
		   }else{
			//  "unable to perform your request"+response?.data.message;
		   }
			
		} catch (error){
			//  "unable to perform your request"+ error;	
		}
	 }
	 
	 /*  ============================================================================================ */
	 /*  ============================================================================================ */
	/*  no object and returns an  object */
	const  postNoObjectReturn = async (path:string,authRequired:boolean): Promise <Object|string>  =>{
		let response;
		try{
			if(authRequired){
				if(isToken){
					response = await api.post(path,null,{
						headers:{
							'Authorization':`Bearer ${decrypted}`
						}
					});
				}else{
					 //tell user to sign up or login 
				}
			}else{
				response = await api.post(path,null);
			}
		   if(response?.status === 200){
			if(response.data.success){
				return response.data;
			}else{
				return response.data.message;
			}
		   }else{
			return "there was an error";
		   }
			
		} catch (error){
			return error!;	
		}
	 }
	 
	/*  ============================================================================================ */
	/*  ============================================================================================ */
	/*  no object and returns nothing*/
	const  postNoObjectNoReturn = async (path:string,authRequired:boolean) => {
		let response;
		try{
			if(authRequired){
				if(isToken){
					response = await api.post(path,null,{
						headers:{
							'Authorization':`Bearer ${decrypted}`
						}
					});
				}else{
					 //tell user to sign up or login 
				}
			}else{
				response = await api.post(path,null);
			}
			
		   if(response?.status === 200){
			if(response.data.success){
			//  do something with the response
			}else{
				// do something
			}
		   }else{
			//  "unable to perform your request"+response?.data.message;
		   }
			
		} catch (error){
			//  "unable to perform your request"+ error;	
		}
	 }
	
	
	// export api endpoints to be uset in our website
	export {
		postObjectReturn,
		postObjectNoReturn,
		postNoObjectNoReturn,
		postNoObjectReturn
	}
	