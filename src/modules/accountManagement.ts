import { accountInterface, authInterface } from "./accountInterface";
import { postObjectReturn } from "./endpoint";
import useToken from "./token";

class accountManager implements  accountInterface{
	
	public encryptToken;
	
	
	
	constructor(){
		const {encryptToken} = useToken();
		this.encryptToken = encryptToken;
	}
	
	
	async authenticate(path: string, object: Object): Promise<void> {
		
		var response;
			response = postObjectReturn(path,false,object) as Promise <authInterface>;
			response.then(data =>{
				if(typeof(data) != 'string'){
					if(data.token){
						this.encryptToken(data.token);
					}
				}
			});
			
	}
}


export default accountManager;