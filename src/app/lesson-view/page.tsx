"use client"
import { useEffect, useState } from 'react';
import Navigation from '../components/navigation/Navigation'
import Basic from '@/modules/Basic';
import Nolesson from '../components/lessonview/Nolesson';
import Lesson from '../components/lessonview/Lesson';
import { Toaster, toast } from 'sonner';


function Page() {
  const [id, setId] = useState<number | null>(null);
  const [hasLesson,sethasLesson] = useState(true);

  useEffect(() => {
    const uncleanId = window.location.href.split("?id=");
    const basic = new Basic();
    function getId(uncleanId: string[]): number | null {
      const idString = uncleanId[1];
      if (!idString) {
        toast.error('Lesson not found..it may have been  changed or deleted',{
					duration:4000,
					className:'bg-error text-dText'
				});
        sethasLesson(false);
        return null;
        
      } else {
        let newId = basic.decodeUrl(idString);
        return newId;
      }
    }

    let newId = getId(uncleanId);
    setId(newId);
  }, []);
    

  return (
	<div>
    <Toaster position='top-center'/>
    <Navigation/>
    {
      !hasLesson && 
      <Nolesson
      haslesson={hasLesson}
      /> 
    }
        {
      hasLesson && <Lesson
      id={JSON.stringify(id)}
      /> 
    }
   
  </div>
  )
}

export default Page;