import * as React from 'react';
import * as AWS from 'aws-sdk'
import * as StatConstants from "../../constants/StatsContants.json"
import {useState,useEffect} from 'react'
import './Stats.css'
import { headerEnums } from '../../constants/Enums';
const docClient = new AWS.DynamoDB.DocumentClient()
function Stats() {
  const [rounds,SetRounds] = useState([]);
  const [displayAverages,setDisplayAverages] = useState(false)
  const TextConstants = Array.from(StatConstants)[0];
  const avgOBJ = {
    "Score": [],
    "Plus/Minus": [],
    "Fairway %": [],
    "Green %": [],
    "Par 3 AVG": [],
    "Par 4 AVG": [],
    "Par 5 AVG": [],
    "Putts": [],
    "Scramble %": []
  }
 
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
function calculateAverages(column) {
  let total = []
  avgOBJ[column].forEach(el => total.push(parseInt(el)))
  console.log(total)
  return total.reduce(function (previousValue, currentValue) {
    return (previousValue + currentValue) / total.length
});
}
useEffect(() => {
  fetchData('golf_rounds');
},[]);
rounds.forEach((el) => {
  if(el.Score) {
avgOBJ['Score'] = [...avgOBJ['Score'],el.Score]
if(el.Putts) {
  avgOBJ['Putts'] = [...avgOBJ['Putts'],el.Putts]
  avgOBJ['Fairway %'] = [...avgOBJ['Fairway %'],el['Fairway %']]
  avgOBJ['Green %'] = [...avgOBJ['Green %'],el['Green %']]
  avgOBJ['Par 3 AVG'] = [...avgOBJ['Par 3 AVG'],el['Par 3 AVG']]
  avgOBJ['Par 4 AVG'] = [...avgOBJ['Par 4 AVG'],el['Par 4 AVG']]
  avgOBJ['Par 5 AVG'] = [...avgOBJ['Par 5 AVG'],el['Par 5 AVG']]
  avgOBJ['Scramble %'] = [...avgOBJ['Scramble %'],el['Scramble %']]
  avgOBJ['Plus/Minus'] = [...avgOBJ['Plus/Minus'],el['Plus/Minus']]

}
  }
})
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
{TextConstants.tableHeaders.filter(el => el !== 'date' && el!== "course" ).map((category,index) => {
  return (
    <tr className='category' key={index}>{ headerEnums[category]}
    <td>{calculateAverages([headerEnums[category]]).toFixed(2)}</td>
    </tr>
  )
})}
</tbody>
    </table>
  </div> : null }
  <button className='round-btn'>{TextConstants['9HoleStats']}</button>
<button className='round-btn'>{TextConstants['18HoleStats']}</button>
<button className='round-btn'>{TextConstants['clearTable']}</button>
  <table>
    <tbody className='stats-table'>
{TextConstants.tableHeaders.map((col,index) => {
  return (
    <tr key={index}>
     <tr id='headers'>{headerEnums[col]}</tr>  
     { rounds[0] ? rounds.map((el,index) => {
       return (
         <td id="score-stat" key={index}>{el[headerEnums[col]]}</td>
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