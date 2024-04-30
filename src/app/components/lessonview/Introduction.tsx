import  { useEffect, useState } from 'react';
import '../../custom_styles/scroll.css';
import { notesInterface } from '@/interface/interface';




interface Props {
	focus:string
}
function Introduction({focus}:Props) {
	const [step,setStep] = useState(0);
	const [text,setText] = useState('');
	const [relatedTopic,setrelatedTopic] = useState< null | string[]>(null);
	  const [ViewNotes,setViewNotes] = useState(false);
	  const [notes, setNotes] = useState<null | notesInterface>(null);
	let steps = [
		" ",//dummy step for initial loading of the animation,don't remove
		" Hello, welcome to Tuchop AI my name is Ron and I will be your AI assistant.",
		" Lets get you started with some notes.Click on the get notes button below.",
		" Choose among the list given below.If you dont see any notes wait a moment or  check your internet and try again.If the issue persit contact us.",
		` As we wait for your notes on ${focus.split('.')[1]}.You can use the input down below to ask me further questions on parts that you are not understanding or need clarification. If you want to save this notes.visit the notes menu in the navigation to  generate the notes.We have a free notes generator.`
	];
	
	let animateText = () => {
		let textToBeTyped = steps[step];
		let lengthOfText = textToBeTyped.length;
		let index = 0;
		if(focus.split(".")[1] != null && focus.split(".")[1] != undefined){
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

	
	const getRelatedTopics = () => {
		// api.no_token_with_setter(
		// 	"get-topic-notes",
		// 	{ title: focus.split('.')[1]},
		// 	setrelatedTopic
		//   )
	}	
	

  return (
    <div className='w-[99%] sm:w-[600px] md:w-[90%] p-4 sm:mx-4 mb-4'>
		<p className='my-4 leading-8'>{text}</p>
		{/* {step == 3 && 
		<div className="flex flex-wrap items-center w-[90%] p-4 justify-center gap-2 my-10 mx-10 ">
			{relatedTopic?.map((topics,id) =>(
				<p className='shadow-md p-4 rounded-md cursor-pointer' key={id} onClick={() =>{
					setText('');
					setStep(step +1);					
					api.no_token_with_setter(
						"get-notes",
						{ title:topics.trim()},
						setNotes
					)}}>{topics}</p>
			))}
		</div>
		} */}
		
		
		{/* notes box start */}
		{notes !== null && ViewNotes &&  (
        <div
          id="notes_box"
          className="w-full  min-h-0 text-gray  my-10 leading-loose p-4 "
          dangerouslySetInnerHTML={{ __html: notes }}
        ></div>
      )}
	  {/* notebox end */}
		
	

		<div className=' md:w-[80%] flex flex-wrap items-center justify-start gap-4 bg-light p-4 rounded-md min-h-[50px]'>
			{step == 0 && <h3 className='text-sm mx-2'>click on this button to start this subtopic 👉</h3>}
		{step == 2 && <button onClick={() => {getRelatedTopics(); setText(''); setStep(step + 1)}} className='transition-all hover:translate-x-1 w-[150px] h-[40px] bg-black text-white text-sm mx-2 rounded-md'>get notes</button>}
		{step == (steps.length-1) && <button onClick={() => { setText(''); setViewNotes(true);}} className='transition-all hover:translate-x-1 bg-black w-[150px] h-[40px] text-white text-sm mx-2 rounded-md' >view notes</button>}
		{step < steps.length - 1 && step != 2 && focus.split(".")[1] != "null" && <button className={`transition-all hover:translate-x-1 w-[100px] h-[40px] text-black border border-lgray text-sm mx-2 rounded-md ${step == 0 && 'bg-gradient-to-br from-primary to-secondary text-white '}`}
		 onClick={() => {setText(''); setStep(step + 1)}}>{step == 0 ? 'get started' :'next'}</button>}
		{step > 0 && <button className='transition-all hover:translate-x-1 w-[100px] h-[40px] text-black border border-lgray text-sm mx-2 rounded-md ' onClick={() => {setText(''); setStep(step - 1); setNotes(null); setViewNotes(false);}}>previous</button>}
		</div>
    </div>
  );
}

export default Introduction;
