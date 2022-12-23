import * as React from 'react';
import * as AWS from 'aws-sdk'
import * as StatConstants from "./StatsContants.json"
import {useState,useEffect} from 'react'
import './Stats.css'
const docClient = new AWS.DynamoDB.DocumentClient()

function Stats() {
  const [rounds,SetRounds] = useState([]);
  const [displayAverages,setDisplayAverages] = useState(false)
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
function toggleAverages() {
 setDisplayAverages(displayAverages => !displayAverages) 
}
useEffect(() => {
  fetchData('golf_rounds');
},);
console.log(rounds.length)
  return (
    <div>
<div>
  <h1 className='round-counter'>{`${TextConstants.roundTotal} ${rounds.length} ${TextConstants.rounds}`}</h1>
</div>
<div>
  <button className='toggle-averages' onClick={() => toggleAverages()}>{TextConstants.toggleAveragesButtonText}</button>
</div>
<div>
  { displayAverages ?
  <div>
    <h1 className='averages-header'>Averages</h1>
    <table className='averages-table'>
      <tbody>
{TextConstants.tableHeaders.map((category,index) => {
  return (
    <tr className='category' key={index}>{category}
    <td>76</td>
    </tr>
  )
})}
</tbody>
    </table>
  </div> : null }
  <button className='round-btn'>{TextConstants['9HoleStats']}</button>
<button className='round-btn'>{TextConstants['18HoleStats']}</button>
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