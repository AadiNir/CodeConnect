const express = require('express');
const env = require('dotenv');
const connectdb = require('./config/db');
env.config();


const app = express();
//middleware initalization basically using boyd parser to get the data from the body
app.use(express.json({extended: false}));
const PORT = process.env.port || 5000;
app.get('/',(req,res)=>{
    res.send("hello world")
})
app.use('/api/user',require('./routes/api/user'));
app.use('/api/auth',require('./routes/api/auth'))
app.use('/api/profile',require('./routes/api/profile'))
app.use('/api/post',require('./routes/api/posts'))

connectdb();
app.listen(PORT,()=>{
    console.log("the port is running suceessfully")
})