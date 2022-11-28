const db=require('../models')
const User=db.users;
const { body, validationResult } = require('express-validator');
const bcrypt=require('bcrypt')
const secret="yuvrajisagoodboy";
const jwt=require('jsonwebtoken');
const fetchUsers=require('../middleware/auth')

module.exports=app=>{
    var router=require('express').Router();


    //for signup
    router.post('/',[body('email').isEmail(),body('name').isLength({min:3}),body('password').isLength({min:3})],(req,res)=>{
        const errors = validationResult(req);
        let success=false;
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }
    
    User.findOne({email:req.body.email},(err,data)=>{
     if(data===null)
     {
      const password=req.body.password;
      const salt=bcrypt.genSaltSync(10);
      const hash=bcrypt.hashSync(password,salt)
      User.create({
        email:req.body.email,
        name: req.body.name,
        password: hash,
      }).then(user =>{

        const data=user.id
        console.log(data)
        const jwtToken=jwt.sign(data,secret);
        success=true
        res.json({success,token,jwtToken})
      } ).catch(err=>{
        res.json({success,error:err.message})
      });
     }
     else
     {
      res.json({success,error:'Account already exist!'})
     }
     
    })
    
       
    })


    //authenticate a user
    router.post('/login',[body('email').isEmail(),body('password').exists()],(req,res)=>{
      const errors = validationResult(req);
      let success=false
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const {email,password}=req.body;
  try{
    let user=User.findOne({email:email}).then(user=>{
      console.log(user);
      if(!user)
    {
      return res.status(400).json({success,error:'Please try to login with correct credentials!'})
    }
    const comparePassword=bcrypt.compareSync(password,user.password);
    if(!comparePassword)
    {
      return res.status(400).json({success,error:'Please try to login with correct credentials!'})
    }
    const data=user.id;
        console.log(data)
        const jwtToken=jwt.sign(data,secret);
        success=true
        res.json({
          id:user.id,
          token:jwtToken,
          success
        })
    });
   
    
  }catch(ex)
  {
    res.status(500).json({error:'Internal server error'})
  }
     
  })




  //Route3 get user loggedin Details!
 router.get('/home/:id',fetchUsers,(req,res)=>{
  const id=req.params.id;
  User.findOne({_id:id}).then(data=>{
    res.status(200).json({
      data:data
    })
  
  }).catch(err=>{
    res.status(400).json({
      error:"No user found!"
    })
  })
 })
    app.use('/api/auth',router);
}