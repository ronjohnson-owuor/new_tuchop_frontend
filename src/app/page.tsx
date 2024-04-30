import Footer from "./components/footer/Footer";
import Prompt from "./components/home/Prompt";
import Navigation from "./components/navigation/Navigation";

const page = () => {
   return (
     <div className="w-full min-h-screen bg-lBackground dark:text-dText dark:bg-dBackground overflow-x-clip">
      <Navigation/>
      <Prompt/>
      <Footer/>
    </div> 
    );
};

export default page;
