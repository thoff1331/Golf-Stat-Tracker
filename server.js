const axios = require('axios');
const express = require('express')
const cors = require('cors');
const PORT = 8000;
require('dotenv').config()

 const app = express();

 app.use(cors())



app.listen(PORT, () => console.log('running on port ' + PORT))