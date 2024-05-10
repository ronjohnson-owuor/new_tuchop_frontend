import Navigation from "../components/navigation/Navigation";


function Pricing() {
   return (
	<div className="overflow-x-clip bg-lBackground text-lText dark:bg-dBackground dark:text-dText">
    <Navigation/>
   <center><h1 className="my-20">upgrade today </h1></center>
    <div className="w-[99%] min-h-screen flex flex-col md:flex-row my-10 mx-4 sm:mx-40 gap-10 ">
      <div className="w-[300px] min-h-[450px] py-2  shadow-md rounded dark:border dark:border-dSecondary flex items-center justify-start gap-4 text-xl flex-col">
        <center>starter</center>
        <span className="text-4xl font-bold text-primary my-4">$ 4.53/month</span>
        <p className="line-through text-[25px] font-bold text-primary">was $10.99</p>
        <ul className="my-2 px-2">
          <li className="my-4"> <span>✔ &nbsp;</span>20,000 tokens per month</li>
          <li className="my-4"> <span>✔ &nbsp;</span>create up to 50 topics</li>
          <li className="my-4"> <span>✔ &nbsp;</span>upload up to 40 files</li>
          <li className="my-4"> <span>✔ &nbsp;</span> unlimited video answers </li> 
          <li className="my-4"> <span>✔ &nbsp;</span>get answers from uploaded pdf papers</li>
          <li className="my-4"> <span>✔ &nbsp;</span>no paid advertisement on your Page</li>
          <li className="my-4"> <span>✔ &nbsp;</span>support from the tech team while stuck</li>
        </ul>
         <button className="bg-primary w-[250px] rounded-md h-[50px] text-white transition duration-200
        hover:bg-opacity-70 cursor-pointer" >upgrade</button>
        
      </div>
      <div className="w-[300px] min-h-[450px] py-2  rounded flex items-center justify-start gap-4 text-white text-xl flex-col  bg-gradient-to-b from-primary to-accent">
        <center className="my-4">unlimited <b className="text-xl underline">popular</b></center>
        <span className="text-4xl font-bold text-white my-4">$ 8.45/month</span>
        <p className="line-through text-[25px] font-bold text-white">was $18.99</p>
        <ul className="my-2 px-2">
        <li className="my-4"> <span>✔ &nbsp;</span>unlimited request per month</li>
          <li className="my-4"> <span>✔ &nbsp;</span>unlimited topic question</li>
          <li className="my-4"> <span>✔ &nbsp;</span>unlimited file and image upload</li>
          <li className="my-4"> <span>✔ &nbsp;</span>unlimited  video answers </li>
          <li className="my-4"> <span>✔ &nbsp;</span>get answers from uploaded pdf papers</li>
          <li className="my-4"> <span>✔ &nbsp;</span>get answers from uploaded image  questions</li>
          <li className="my-4"> <span>✔ &nbsp;</span>no paid advertisement on your Page</li>
          <li className="my-4"> <span>✔ &nbsp;</span>faster and quick responses to emails</li>
        </ul>
        
        <button className="bg-primary shadow-lg w-[250px] rounded-md h-[50px] text-white transition duration-200
        hover:bg-opacity-70 cursor-pointer" >upgrade</button>
        
      </div>
      <div className="w-[300px] min-h-[450px] py-2  shadow-md rounded flex items-center justify-start gap-4 text-xl flex-col dark:border dark:border-dSecondary">
        <center>yearly</center>
        <span className="text-4xl font-bold text-primary my-4">$ 211.99/year</span>
        <p className="line-through text-[25px] font-bold text-primary">was $210.99</p>
        <ul className="my-2 px-2">
        <li className="my-4"> <span>✔ &nbsp;</span>unlimited request per year</li>
          <li className="my-4"> <span>✔ &nbsp;</span>unlimited topic question</li>
          <li className="my-4"> <span>✔ &nbsp;</span>unlimited file and image upload</li>
          <li className="my-4"> <span>✔ &nbsp;</span>unlimited  video answers </li>
          <li className="my-4"> <span>✔ &nbsp;</span>get answers from uploaded pdf papers</li>
          <li className="my-4"> <span>✔ &nbsp;</span>get answers from uploaded image  questions</li>
          <li className="my-4"> <span>✔ &nbsp;</span>no paid advertisement on your Page</li>
          <li className="my-4"> <span>✔ &nbsp;</span>faster and quick responses to emails</li>
        </ul>
        
         <button className="bg-primary w-[250px] rounded-md h-[50px] text-white transition duration-200
        hover:bg-opacity-70 cursor-pointer" >upgrade</button>
      </div>
    </div>
    
   <center><span className="my-10"> ℹ our rates are not automatically updated</span></center>
  </div>
  )
}

export default Pricing