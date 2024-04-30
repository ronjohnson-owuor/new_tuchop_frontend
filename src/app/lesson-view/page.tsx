"use client"
import { useEffect, useState } from 'react';
import Navigation from '../components/navigation/Navigation'
import Basic from '@/modules/Basic';
import Nolesson from '../components/lessonview/Nolesson';
import Lesson from '../components/lessonview/Lesson';


function page() {
  const [id, setId] = useState<number | null>(null);
  const [hasLesson,sethasLesson] = useState(true);

  useEffect(() => {
    const uncleanId = window.location.href.split("?id=");
    const basic = new Basic();
    function getId(uncleanId: string[]): number | null {
      const idString = uncleanId[1];
      if (!idString) {
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

export default page;