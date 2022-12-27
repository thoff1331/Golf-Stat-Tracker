
import * as React from 'react';
import { putData } from '../../AwsFunctions';
import * as scoreConstants from '../../constants/ScoreConstants.json'
import * as StatConstants from "../../constants/StatsContants.json"
import { headerEnums,originalRoundState } from '../../constants/Enums';
import {useState} from 'react'
import { v4 as uuidv4 } from 'uuid';
import * as AWS from 'aws-sdk'
import './Score.css'
function Score() {
  const docClient = new AWS.DynamoDB.DocumentClient()
  const [roundType,setRoundType] = useState(18)
  const buttonText = Array.from(scoreConstants);
  const [roundInputs,setRoundInputs] = useState({
    Date: '',
    Course: '',
    Score: '',
    "Plus/Minus": '',
    "Fairway %": '',
    "Green %": '',
    "Par 3 AVG": '',
    "Par 4 AVG": '',
    "Par 5 AVG": '',
    "Scramble %": '',
    "roundID": uuidv4()
  })

  const handleChange = (e)  => {
    const {name,value}= e.target;
    console.log(name)
     setRoundInputs(roundInputs => ({
       ...roundInputs,
       [name]: value
     }))
  }
  const addRoundtoDynamoDB =   async () => {
    const userData =  {
    ...roundInputs,
    }
  await putData('golf_rounds',{...userData,roundID: uuidv4()})
  }
   const putData = (tableName , data) => {
    var params = {
        TableName: tableName,
        Item:  data
    }
    
   docClient.put(params, function (err, data) {
        if (err) {
            console.log('Error', err)
        } else {
            console.log('Success',data)
        }
    })
}
  return (
    <div>
  <h1 className='add-stats-heading'>Add your Stats from your most Recent Round</h1>
  <div className='round-container'>
  <div className='new-round'>
  <input name='Date' type='date' onChange={(e) =>handleChange(e)} />
  <input name='Course' placeholder='Course' type='text' onChange={(e) => handleChange(e)} />
  <input name='score' placeholder='Score' type='number' onChange={(e) => handleChange(e)}  />
  <input name= 'Plus/Minus' placeholder='Plus/Minus' type='number' onChange={(e) => handleChange(e)}  />
  <input name='Fairway %' placeholder='Fairway %' type='number' onChange={(e) => handleChange(e)} />
  <input name='Green %' placeholder='Green %' type='numbner' onChange={(e) => handleChange(e)} />
  <input name='Par 3 AVG' placeholder='Par 3 AVG' type='number' step='any' onChange={(e) => handleChange(e)} />
  <input  name='Par 4 AVG' placeholder='Par 4 AVG' type='number' step='any' onChange={(e) => handleChange(e)} />
  <input  name='Par 5 AVG' placeholder='Par 5 AVG' type='number' step='any' onChange={(e) => handleChange(e)} />
  <input  name='Putts'placeholder='Putts' type='number' />
  <input  name='Scramble %'placeholder='Scramble %' type='number' />
  
<button className="round-btn" onClick={() => addRoundtoDynamoDB()}>Add Round</button>
   </div>
   </div>
   </div>
  );
}

export default Score;
