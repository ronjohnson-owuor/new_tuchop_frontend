"use client"
import Cookies from 'js-cookie'
import CryptoJS from 'crypto-js';


type booleanOrstring = boolean | string;
function useToken() {
	const token:string|undefined = Cookies.get(process.env.NEXT_PUBLIC_TOKEN_NAME!);
	const encryption_key:string = process.env.NEXT_PUBLIC_ENCRYPTION_KEY!;

	/* this returns the raw token if not found */
const decryptedToken = (): booleanOrstring =>{
	if(!token){
		return false;
	}
	
	const decrypted_token = CryptoJS.AES.decrypt(token, encryption_key).toString(CryptoJS.enc.Utf8);	
	return decrypted_token;
}


const encrypt_token = (data:string) =>{
		const encryptedData_token = CryptoJS.AES.encrypt(data,encryption_key).toString();
		Cookies.set(process.env.NEXT_PUBLIC_TOKEN_NAME!,encryptedData_token,{ expires: 100});
		console.log("success");	
}




const delete_token = () =>{
	Cookies.remove(process.env.NEXT_PUBLIC_TOKEN_NAME!);
	console.log("you are logged out");
	window.location.reload();
}


return{
	encrypted:token,
	isToken: token ? true : false,
	decrypted: decryptedToken(),
	encryptToken:encrypt_token,
	deleteToken:delete_token,
};
}

export default useToken;