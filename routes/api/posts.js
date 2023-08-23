const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const Post = require('../../models/Post');
const auth = require('../../middleware/auth')
const {check ,validationResult} = require('express-validator');
router.post('/',[auth,[check('text',"require text dude").not().isEmpty()]],async(req,res)=>{
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json(error.array());
    }
    try{
        const user = await User.findById(req.user.id).select('-password')
        const newPost = {
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user:req.user.id
        }
        const poste =new Post(newPost);
        await poste.save();
        res.json(poste);

    }catch(err){
        res.status(400).json(err);
    }



})
router.get('/',auth,async(req,res)=>{
    try{
    const poste = await Post.find().sort({data: -1});
    res.json(poste);
    }
    catch(err){
        res.status(400).json(err)
    }
})
router.get('/:user_id',auth,async(req,res)=>{
    try{
    const poste = await Post.findById(req.params.id);
    if(!poste){
       return res.status(400).json({msg:"Post not found"})

    }
    res.json(poste);
    }
    catch(err){
        if(err.kind=='ObjectId'){
            return res.status(404).json({msg:"Post not found"})
        }
        res.status(400).json(err)
    }
})
router.delete('/:postid',auth,async(req,res)=>{
    const post1 = await Post.findById(req.params.postid);
    if(req.user.id === post1.user.toString() ){
    const poste = await Post.findByIdAndRemove(req.params.postid);
    return res.json({msg:"Post is removed successfully"})
    }
    res.json({msg:"cannot delete the post"})
})
router.put('/like/:id', auth, async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
  
      // Check if the post has already been liked
      if (post.likes.some((like) => like.user.toString() === req.user.id)) {
        return res.status(400).json({ msg: 'Post already liked' });
      }
  
      post.likes.unshift({ user: req.user.id });
  
      await post.save();
  
      return res.json(post.likes);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });
module.exports = router;