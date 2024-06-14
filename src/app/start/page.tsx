import { Toaster } from "sonner";
import Footer from "../components/footer/Footer";
import Prompt from "../components/home/Prompt";
import Navigation from "../components/navigation/Navigation";

const Page = () => {
   return (
     <div id="div_scroll" className="w-full min-h-screen bg-lBackground dark:text-dText dark:bg-dBackground overflow-x-clip">
      <Toaster/>
      <Navigation/>
      <Prompt/>
      <Footer/>
    </div> 
    );
};

export default Page;
