import React, { useEffect, useState } from 'react';
import Listfiles from './Listfiles';
import Uploadfiles from './Uploadfiles';
import { RiCloseLine, RiFolder4Line, RiUpload2Line } from 'react-icons/ri';

interface props{
	close:Function,
  topic_id:number,
  subtopic_id:number,
  setmediafocus:Function
}
function Filemanager({close,topic_id,subtopic_id,setmediafocus}:props) {
  const [activeTab, setActiveTab] = useState('files');

  useEffect(() => {
    document.body.style.overflow = 'clip';
  }, []);

  return (
    <div className='absolute w-full h-screen backdrop-blur-md top-0 left-0 flex items-center justify-center'>
      <div className='bg-lBackground  dark:bg-dBackground rounded-md shadow-md p-10 my-10 h-[500px] w-full md:w-[90%] xl:w-[60%] md:mx-0 overflow-y-scroll'>
        <div className="my-4">
          <h1 className='font-bold text-xl'>File Manager</h1>
        </div>
        <div className='flex items-center w-full justify-items-end gap-4 text-gray my-10'>
          <span
            className={`cursor-pointer flex items-center text-[10px] sm:text-sm xl:text-md ${activeTab === 'files' ? 'font-bold border-b-2 border-primary text-primary pb-1' : ''}`}
            onClick={() => setActiveTab('files')}
          >
           <RiFolder4Line/> &nbsp; Files
          </span>
          <span
            className={`cursor-pointer text-[10px] sm:text-sm xl:text-md flex items-center ${activeTab === 'upload' ? 'font-bold border-b-2 border-primary text-primary pb-1' : ''}`}
            onClick={() => setActiveTab('upload')}
          >
            <RiUpload2Line/> &nbsp; Upload
          </span>
		  
		  <button 
		  onClick={()=>close(false)}
		  className='shadow-sm flex items-center text-md w-[80px] h-[30px] border -translate-y-1 hover:bg-primary hover:text-dText p-2 rounded border-lSecondary text-lText dark:border-dSecondary mx-4 dark:text-dText text-sm sm:text-md'><RiCloseLine/> &nbsp; close</button>
        </div>
        <div className="mt-4 w-full">
          {activeTab === 'files' && <Listfiles
          close={close}
          setmediafocus={setmediafocus}
           topic_id={topic_id}/>}
          {activeTab === 'upload' 
          && 
          <Uploadfiles
          topic_id={topic_id}
          subtopic_id={subtopic_id}
          />
          }
        </div>
      </div>
    </div>
  );
}

export default Filemanager;
