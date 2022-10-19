const db=require('../models')
const User=db.users;
const { body, validationResult } = require('express-validator');
const bcrypt=require('bcrypt')
const secret="yuvrajisagoodboy";
const jwt=require('jsonwebtoken');

module.exports=app=>{
    var router=require('express').Router();


    //for signup
    router.post('/',[body('email').isEmail(),body('name').isLength({min:3}),body('password').isLength({min:3})],(req,res)=>{
        const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
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
       
        res.json(jwtToken)
      } ).catch(err=>{
        res.json(err.message)
      });
     }
     else
     {
      res.json('Account already exist!')
     }
     
    })
    
       
    })


    //authenticate a user
    router.post('/login',[body('email').isEmail(),body('password').exists()],(req,res)=>{
      const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const {email,password}=req.body;
  try{
    let user=User.findOne({email:email}).then(user=>{
      console.log(user);
      if(!user)
    {
      return res.status(400).json({error:'Please try to login with correct credentials!'})
    }
    const comparePassword=bcrypt.compareSync(password,user.password);
    if(!comparePassword)
    {
      return res.status(400).json({error:'Please try to login with correct credentials!'})
    }
    const data=user.id
        console.log(data)
        const jwtToken=jwt.sign(data,secret);
       
        res.json(jwtToken)
    });
   
    
  }catch(ex)
  {
    res.status(500).json({error:'Internal server error'})
  }
     
  })


    app.use('/api/auth',router);
}