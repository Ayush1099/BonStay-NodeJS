const express=require('express');
const bodyParser=require('body-parser');
const route=require('./Routes/routing');
require('./Model/connection')//DB Connection and Schema
const cookieParser = require('cookie-parser');

const app=express();//creates and express application
app.use(bodyParser.json());
app.use(cookieParser());
app.use('/',route);

const port=process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`App running on port ${port}`);
})