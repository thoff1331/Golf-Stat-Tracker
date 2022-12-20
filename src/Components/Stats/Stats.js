import * as React from 'react';
import {fetchData} from '../../AwsFunctions';
function Stats() {
  const fetchDataFormDynamoDb =  async () => {
    fetchData('golf_rounds')
  }

  return (
    <div>
<button onClick={() => fetchDataFormDynamoDb()}> Fetch </button>
    </div>
  );
}

export default Stats;