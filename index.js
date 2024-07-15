const express = require('express');
const app = express() ;
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const postRoute = require('./routes/posts')

dotenv.config(); //hiding the password
//connecting to DB
mongoose.connect(process.env.DB_CONNECT);

 //importing routes
const authRoute= require('./routes/auth');

//bodyparser Middleware
app.use(express.json());

//route middlewares
app.use('/api/user' , authRoute)
app.use('/api/posts' , postRoute)
app.listen(3000 , ()=> {
    console.log('up and running')
})
