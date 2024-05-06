import { toast } from "sonner";
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
		toast.info('auth initiated',{
			duration:2000,
			className:'bg-primary text-dText'
		})
		var response;
			response = postObjectReturn(path,false,object) as Promise <authInterface>;
			response.then(data =>{
				if(data.message){
					toast.success(data.message,{
						duration:4000,
						className:'bg-sucess text-dText'
					})
				}else{
					toast.error(data.message,{
						duration:4000,
						className:'bg-error text-dText'
					})
				}
				if(typeof(data) != 'string'){
					if(data.token){
						this.encryptToken(data.token);
						
					}
				}
			});
			
	}
}


export default accountManager;