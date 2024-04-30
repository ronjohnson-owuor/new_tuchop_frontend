
export interface accountInterface {
	authenticate(path:string,object:Object):Promise<void>,
}

export interface authInterface{
	message:string,
	success:boolean,
	token:string,
	error:string|null
}
