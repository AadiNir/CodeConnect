const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const {check,validationResult} = require('express-validator');
const User = require('../../models/User');
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../../middleware/auth')
router.get('/',auth,async(req,res)=>{
    try{
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
    }catch(err){
        res.status(500).json(err)
    } 
})
router.post('/',[
check('email',"email is required").isEmail(),
check('password',"no password").exists()
]
,async (req,res)=>{
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({
            errors : error.array()
        });

    }
    const {email,password} = req.body;
   try{
    let user = await User.findOne({email});
    if(!user){
        res.status(400).json({errors : "Invalid credentials2"})
    }
    const ismatch = bcrypt.compare(password,user.password);
    if(!ismatch){
        res.status(400).json({errors:"Invalid credentials3"
        })
    }
   

    const payload = {
        user:{
            id: user.id
        }
    }
    jwt.sign(payload,config.get('jwtSecret'),{expiresIn:36000},(err,token)=>{
        if(err) throw err;
        res.json({token});
    });

       }catch(err){
    console.log(err.message);
    res.status(500).send('server error')

   }

})

module.exports = router;