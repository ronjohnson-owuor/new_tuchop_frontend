"use client"
import CryptoJS from "crypto-js";
class Basic {
	trim(item:string):string{
		var new_string = item.slice(0,15);
		if(item.length <= 15){
			return item;
		}else{
		return new_string+"...";	
		}
	}
	
	decodeUrl(input:string): number {
		const cleanedUrl = decodeURIComponent(input);
		const secret = process.env.NEXT_PUBLIC_ENCRYPT_SECRET!;
		const idFromString = CryptoJS.AES.decrypt(cleanedUrl,secret).toString(CryptoJS.enc.Utf8);
		return Number(idFromString);
	}
	
	
	encodeUrl(input:number|string){
		const secret = process.env.NEXT_PUBLIC_ENCRYPT_SECRET !;
		const encrypted = CryptoJS.AES.encrypt(input.toString(),secret).toString();
  		return encodeURIComponent(encrypted);
	}
	
	trimprice(price:number){
		if(price >= 1000){
			return (price/1000).toFixed(2) + "K";
		}else{
			return price;
		}
	}
	
	
	
}

export default Basic;