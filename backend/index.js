const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const user_routes = require('./routes/user_routes')  
const restaurent_routes = require('./routes/restaurent_routes')  
const menu_routes = require('./routes/menu_routes')  

require('dotenv').config();

const app = express();

app.use(express.json())
app.use(cors())

//routing
app.use('/api/users',user_routes)
app.use('/api/restaurent',restaurent_routes)
app.use('/api/menu',menu_routes)

app.use('/public', express.static(path.join(__dirname, 'public')));


mongoose.connect(process.env.MONGO_DB_URL)
.then(() => app.listen(process.env.PORT))
.then(()=>console.log("Connected to mongoose on port : ",process.env.PORT))
.catch((err)=>{
    console.log(err)
})