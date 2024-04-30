interface socialiteInterface{
	google_signin(response:object):Promise<void>,
	google_login(response:object):Promise<void>,
	tiktok_signin(path:string):Promise<void>
}