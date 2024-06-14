import { useEffect, useState } from 'react';
import { notesInterface, topicsInterface } from '@/interface/interface';
import { postObjectReturn } from '@/modules/endpoint';

interface Props {
  focus: number,
}

function Introduction({ focus }: Props) {
  const [text, setText] = useState('');
  let [step,setStep] = useState(1);
  const [relatedTopic, setRelatedTopic] = useState<null | string[]>(null);
  const [viewNotes, setViewNotes] = useState(false);
  const [notes, setNotes] = useState<null | string>(null);
  const [title, setTitle] = useState('');


  const getRelatedTopics = () => {
    const res = postObjectReturn("get-topic-notes", true, { title: title }) as Promise<topicsInterface>;
    res.then(data => {
      if (data.data && typeof (data.data) != 'string') {
        setRelatedTopic(data.data);
      }
    });
  };

  return (
    <div className='w-[99%] sm:w-[600px] md:w-[90%] p-4 sm:mx-4 mb-4'>
		{step == 1 && (
			<div className='my-4 w-[80%] mx-2 text-gray'>
			<p>since you have not  interacted with this topic before let us gey you some notes to jumpstart your learning.Try to be spesific with your prompt eh limit calculus instead of limits.</p>
			<input
				className='w-[90%] p-2 bg-lSecondary dark:bg-dSecondary sm:w-[80%] h-[40px] rounded-md outline-none shadow-md my-4'
				onChange={(e) => setTitle(e.target.value)}
				type="text"
				placeholder='e.g. limits or differentiation or zoology etc'
			/>
			<button onClick={() => { getRelatedTopics(); setText(''); setStep(step + 1) }} className='transition-all hover:translate-x-1 h-[40px] bg-primary text-dText text-sm rounded-md w-[89%] sm:w-[80%]'>get notes</button>
			</div>			
		)}

        <div className="flex flex-wrap items-center w-[90%] p-4 justify-center gap-2 my-10 mx-10">
          {relatedTopic != null && relatedTopic.map((topics, id) => (
            <p
              className='shadow-md p-4 rounded-md cursor-pointer'
              key={id}
              onClick={() => {
                setText('');
                const res = postObjectReturn("get-notes", false, { title: topics.trim() }) as Promise<notesInterface>;
                res.then(data => {
                  if (typeof (data) != 'string') {
                    setNotes(data.data);
					if(step == 2){
						setViewNotes(true);
					}
					
                  }
                });
              }}
            >{topics}</p>
          ))}
        </div>

      {/* Notes box start */}
      {notes !== null && viewNotes && (
		<>
			<center><h3 className='text-primary font-bold my-4'>Here are some notes we found for you</h3></center>
		   <div
          id="notes_box"
          className="w-full min-h-0 text-gray my-10 leading-loose p-4"
          dangerouslySetInnerHTML={{ __html: notes || "<p>Unable to retrieve notes at the moment</p>" }}
        ></div>
		</>

      )}

		{step == 2  && <button className='transition-all hover:translate-x-1 w-[100px] h-[40px] text-dText bg-accent text-sm mx-2 rounded-md' onClick={() => { setText(''); setStep(1); setNotes(null); setViewNotes(false); }}>back</button>}
    </div>
  );
}

export default Introduction;
