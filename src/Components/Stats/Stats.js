import * as React from 'react';
import * as AWS from 'aws-sdk'
import * as StatConstants from "./StatsContants.json"
import {useState,useEffect} from 'react'
import './Stats.css'
const docClient = new AWS.DynamoDB.DocumentClient()

function Stats() {
  const [rounds,SetRounds] = useState([]);
  const TextConstants = Array.from(StatConstants)[0];
 
   const fetchData = (tableName) => {
    var params = {
        TableName: tableName,
    }
  
    docClient.scan(params, function (err, data) {
        if (!err) {
            console.log(data.Items)
            SetRounds(data.Items)
        }
    })
   
}
useEffect(() => {
  fetchData('golf_rounds');
},[]);
  return (
    <div>
<div>
  <h1>{`${TextConstants.roundTotal} 1 ${TextConstants.rounds}`}</h1>
</div>
<div>
  <table>
    <tbody className='stats-table'>
{TextConstants.tableHeaders.map((col,index) => {
  return (
    <tr key={index}>
     <tr>{col}</tr>  
     { rounds[0] ? rounds.map((el,index) => {
       return (
         <td key={index}>{el[col]}</td>
       )
     }): null}   
     </tr>
  )
})}
</tbody>
</table>
</div>
    </div>
  );
}

export default Stats;