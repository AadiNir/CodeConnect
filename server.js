const express = require('express');
const env = require('dotenv');
env.config();
const app = express();
const PORT = process.env.port || 5000;
app.get('/',(req,res)=>{
    res.send("hello world")
})
app.listen(PORT,()=>{
    console.log("the port is running suceessfully")
})