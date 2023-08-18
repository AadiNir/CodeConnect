const mongoose = require('mongoose');
const config  = require('config');
const db = config.get('mongourl');
const connectdb = async()=>{
    try{
        await mongoose.connect(db);
        console.log('mongodb is connected succesfully');
    }
    catch(err){
        console.log(err.message);
        process.exit(1);

    }
}
module.exports = connectdb;