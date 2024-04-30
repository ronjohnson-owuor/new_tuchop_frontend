import jwtDecode from "jwt-decode";
import accountManager from "./accountManagement";



/* response from google callback function */
interface GoogleSigninResponse {
	clientId: string;
	client_id: string;
	credential: string;
  }
  
  
  /* payload to send to the backend for autorization */
  interface payloadObject{
	name: string,
    email:string,
    password:string,
    picture:string,
	type:number
  }
  interface payloadObjectLogin{
    email:string,
    password:string,
	type:number
  }

  
  /* what I expect from the call back credential that will be usefull */
  interface userObject{
	email: string,
    given_name:string,
    picture:string,
  }
  
  /* am trying to extend the manager class but is not working so I decided to import it manually and use it */
  const account_nanagement = new accountManager();
class socialiteSignup  implements socialiteInterface {
	
	/* handle google signin  */
	async google_signin(response:GoogleSigninResponse){
		/* decode the jwt rsponse from google here then send it to the backend */
		var userObject:userObject =jwtDecode(response.credential);
		const payloadObject:payloadObject ={
			name:userObject.given_name,
			email:userObject.email,
			picture:userObject.picture,
			type:1, //google sign in,
			password:'google-signin'
			 /* but the password will not be used for authentication just for type safety */
		}
		
		account_nanagement.authenticate("normal-signin",payloadObject);
	}
	
	
	/* handle google login  */
	async google_login(response:GoogleSigninResponse){
		/* decode the jwt rsponse from google here then send it to the backend */
		var userObject:userObject =jwtDecode(response.credential);
		const payloadObject:payloadObjectLogin ={
			email:userObject.email,
			type:1, //socialite log in,
			password:'google-signin'
			 /* but the password will not be used for authentication just for type safety */
		}
		account_nanagement.authenticate("normal-login",payloadObject);
	}
	
	
	
	/* handle tiktok login */
	async tiktok_signin(path: string){
		console.log(path);
	}
}

export default socialiteSignup;