
import  { useEffect, useState } from 'react';
import { notesInterface, topicsInterface } from '@/interface/interface';
import { postObjectReturn } from '@/modules/endpoint';




interface Props {
	focus:Number,
}
function Introduction({focus}:Props) {
	const [step,setStep] = useState(0);
	const [text,setText] = useState('');
	const [relatedTopic,setrelatedTopic] = useState< null | string[]>(null);
	  const [ViewNotes,setViewNotes] = useState(false);
	  const [notes, setNotes] = useState<null | string>(null);
	  const[title,settitle] = useState('');
	let steps = [
		" ",//dummy step for initial loading of the animation,don't remove
		" Hello, welcome to Tuchop AI my name is Ron and I will be your AI assistant.",
		" Lets get you started with some notes.Enter the title of the notes you want to read down below and press get notes be clear and precise",
		" Choose among the list given below.If you dont see any notes wait a moment or  check your internet and try again, go to the previous step and enter a clear topic and  If the issue persit contact us.",
		` As we wait for your notes on .You can use the input down below to ask me further questions on parts that you are not understanding or need clarification. If you want to save this notes.visit the notes menu in the navigation to  generate the notes.We have a free notes generator.`
	];
	
	let animateText = () => {
		let textToBeTyped = steps[step];
		let lengthOfText = textToBeTyped.length;
		let index = 0;
		if(focus){
			const typeInterval = setInterval(() => {
			index++;
			if (index < lengthOfText) {
				setText(prev => prev + textToBeTyped.charAt(index));
			} else {
				clearInterval(typeInterval);
			}
		}, 30);
		}

	};
		
	
	useEffect(() => {
		animateText();
	  }, [step]);
	  
	  
	  useEffect(()=>{
		
		setTimeout(() => {
		setText('');	
		}, 2000);
		setStep(0);
		setNotes(null);
	  },[focus]);
	
	
	const getRelatedTopics = () =>{
		const res = postObjectReturn("get-topic-notes", true,{ title: title }) as Promise<topicsInterface>;
			res.then(data =>{
				if( data.data && typeof(data.data) != 'string'){
					setrelatedTopic(data.data);
				}
		});
	}

  return (
    <div className='w-[99%] sm:w-[600px] md:w-[90%] p-4 sm:mx-4 mb-4'>
		<p className='my-4 leading-8'>{text}</p>
		{step== 2 && <div className='my-4 w-[80%] mx-2 text-gray'>
			<p>enter your notes title below and click get notes👇</p>
			<input className='w-[90%] p-2 bg-lSecondary dark:bg-dSecondary sm:w-[80%] h-[40px] rounded-md outline-none shadow-md my-4'  onChange={(e) =>settitle(e.target.value)} type="text" placeholder='eg linear algebra' />	
		</div>}
		{step == 3 && 
		<div className="flex flex-wrap items-center w-[90%] p-4 justify-center gap-2 my-10 mx-10 ">
			{relatedTopic != null && relatedTopic?.map((topics,id) =>(
				<p className='shadow-md p-4 rounded-md cursor-pointer' key={id} onClick={() =>{
					setText('');
					setStep(step +1);					
					const res = postObjectReturn("get-notes",false,{ title:topics.trim()}) as Promise <notesInterface>;
					res.then(data =>{
						if(typeof(data) != 'string'){
							setNotes(data.data)
						}})
				}}>{topics}</p>
					
			))}
		</div>
		}
		
		
		{/* notes box start */}
		{notes !== null && ViewNotes &&  (
        <div
          id="notes_box"
          className="w-full  min-h-0 text-gray  my-10 leading-loose p-4 "
          dangerouslySetInnerHTML={{ __html: notes?notes:<p>unable to retrieve notes at the moment</p> }}
        ></div>
      )}
	  {/* notebox end */}
		
	

		<div className=' md:w-[80%] flex flex-wrap items-center justify-start gap-4 bg-light p-4 rounded-md min-h-[50px]'>
			{step == 0 && <h3 className='text-sm mx-2'>Lets get you started with tuchop AI click on the button for get started</h3>}
		{step == 2 && <button onClick={() => {getRelatedTopics(); setText(''); setStep(step + 1)}} className='transition-all hover:translate-x-1 w-[150px] h-[40px] bg-primary text-dText text-sm mx-2 rounded-md'>get notes</button>}
		{step == (steps.length-1) && <button onClick={() => { setText(''); setViewNotes(true);}} className='transition-all hover:translate-x-1 bg-primary w-[150px] h-[40px] text-dText text-sm mx-2 rounded-md' >view notes</button>}
		{step < steps.length - 1 && step != 2 && focus !=null && <button className={`transition-all hover:translate-x-1 w-[100px] h-[40px] text-lText dark:text-dText border border-lSecondary dark:border-dSecondary text-sm mx-2 rounded-md ${step == 0 && 'bg-gradient-to-br from-primary to-accent text-white '}`}
		 onClick={() => {setText(''); setStep(step + 1)}}>{step == 0 ? 'get started' :'next'}</button>}
		{step > 0 && <button className='transition-all hover:translate-x-1 w-[100px] h-[40px] text-dText bg-accent text-sm mx-2 rounded-md ' onClick={() => {setText(''); setStep(step - 1); setNotes(null); setViewNotes(false);}}>previous</button>}
		</div>
    </div>
  );
}

export default Introduction;
