const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const {check,validationResult} = require('express-validator');
const User = require('../../models/User');
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');
const config = require('config');

router.post('/',
[check('name','name is required').not().isEmpty(),
check('email',"email is required").isEmail(),
check('password',"password should be min of 6 length").isLength({min:6})
]
,async (req,res)=>{
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({
            errors : error.array()
        });

    }
    const {name,email,password} = req.body;
   try{
    let user = await User.findOne({email});
    if(user){
        res.status(400).json({errors : "Mail is Already registerd do log in"})
    }
    const avatar = gravatar.url(email,{
        s:'200',
        r:'pg',
        d:'mm'
    })
    user = new User({
        name,
        email,
        avatar,
        password
    })
    const salt = await bcrypt.genSalt(10);
    user.password =await bcrypt.hash(password,salt);
    await user.save()
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