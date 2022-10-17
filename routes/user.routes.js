const db=require('../models')
const User=db.users;
const { body, validationResult } = require('express-validator');
module.exports=app=>{
    var router=require('express').Router();
    router.post('/',[body('email').isEmail(),body('name').isLength({min:3}),body('password').isLength({min:3})],(req,res)=>{
        const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    User.create({
        email:req.body.email,
        name: req.body.name,
        password: req.body.password,
      }).then(user => res.json(user)).catch(err=>{
        res.json(err.message)
      });
       
    })
    app.use('/api/auth',router);
}