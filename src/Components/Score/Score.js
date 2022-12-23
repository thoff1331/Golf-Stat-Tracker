
import * as React from 'react';
import * as scoreConstants from './ScoreConstants.json'
import * as text from "../../constants/TextConstants.json"
import {useState} from 'react'
import './Score.css'
function Score() {
  const [roundType,setRoundType] = useState(18)
  const [CourseInput,setCourseInput] = useState('')
  const [selectedCourse,setSelectedCourse] = useState('')
  const buttonText = Array.from(scoreConstants);
  const TextConstants = Array.from(text)[0];
  return (
   <div className='score-container'>
     {buttonText.map((el,index) => {
       return (
         <div key={index} className='round-type-container'>
           <button key={index} onClick={() => setRoundType(el.type) }>{el.text}</button>
           </div>
       )
     })}
     <div className='form-container'>
       <h1>{`Playing ${roundType} Holes Today!`}</h1>
   <div>
   </div>
     </div>
   </div>
  );
}

export default Score;
