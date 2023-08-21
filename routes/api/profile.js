const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const{check, validationResult}=require('express-validator');
router.get('/me',auth,async (req,res)=>{
    try{
        const profile = await Profile.findById(req.user.id).populate("user",["name","avatar"]);

        if(!profile){
            res.status(400).json({msg:'there is no profile for this user'})
        }
        res.json(profile);

    }catch(err){
        console.log(err);
        res.status(500).send("server error");
    }


})

router.post('/',[auth,[check('skills','skills column is empty').not().isEmpty(),
check('status','status is not there bro').not().isEmpty()]],async(req,res)=>{
    const error = validationResult(req);
    if(!error.isEmpty()){
        res.status(400).send({err: error.array()});
    }
    const{
        company,
        website,
        location,
        bio,
        status,
        githubusername,
        skills,
        youtube,
        facebook,
        twitter,
        instagram,
        linkedin

    } = req.body
    profilefield = {};
    profilefield.user = req.user.id;
    if(company) profilefield.company = company;
    if(website) profilefield.website = website;
    if(location) profilefield.location = location;
    if(bio) profilefield.bio = bio;
    if(githubusername) profilefield.githubusername = githubusername;
    if(status) profilefield.status = status;
    if(skills) profilefield.skills = skills.split(",").map(skill=>skill.trim());
    socialmedia = {};
    if(youtube) profilefield.socialmedia.youtube = youtube;
    if(facebook) profilefield.socialmedia.facebook = facebook;
    if(twitter) profilefield.socialmedia.twitter = twitter;
    if(instagram) profilefield.socialmedia.instagram = instagram;
    if(linkedin) profilefield.socialmedia.linkedin = linkedin;
    console.log(profilefield);

    let profile = await Profile.findById(req.user.id);
    if(profile){
        profile = await Profile.findByIdAndUpdate(req.user.id,{$set: profilefield},{new:true});
        return res.json(profile);
    }  
    profile = new Profile(profilefield);
    await profile.save();
    res.json(profile);


})
router.get('/',async(req,res)=>{
    const profile = await Profile.find().populate("user",['name','avatar']);
    res.json(profile);
})

router.get('/user/:user_id',async(req,res)=>{
    try{
    const profile = await Profile.findOne({user: req.params.user_id}).populate("user",["name","avatar"]);
    if(!profile){
        return res.status(400).json('ahh there exsist no profile');
    }
    res.json(profile)
    }catch(err){
        if(err.kind == 'ObjectId'){
            return res.status(400).json('ahh there exsist no profile');
        }
        res.json({msg : err})
    }
})

router.delete('/',auth,async(req,res)=>{
    try{
    await Profile.findOneAndRemove({user : req.user.id});
    await User.findByIdAndRemove(req.user.id);
    res.json("successfully removed");
    }catch(err){
        console.log(err);
        res.status(400).json(err);
    }
})
router.put('/experience',[auth,[
    check("title","we need the titlle for your company").not().isEmpty(),
    check("company","we need a company name").not().isEmpty()
]],async(req,res)=>{
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json(error.array)
    }
    const{
        title,
        company,
        location,
        from,
        to,
        current,
        description

    } = req.body
    const arr = {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    }
    try{
    const profile = await Profile.findOne({user:req.user.id});
    profile.experience.unshift(arr);
    await profile.save();
    res.json(profile);
    }catch(err){
        res.status(400).json(err);
    }
})
router.delete('/experience/:exp_id',auth,async(req,res)=>{
    try{
    const profile = await Profile.findOne({user:req.user.id});
    const removeval = profile.experience.map(item=>item.id).indexOf(req.params.exp_id);
    await profile.experience.splice(removeval,1);
    await profile.save();
    res.json(profile);
    }catch(err){
        res.status(400).json(err);
    }
})
module.exports = router;