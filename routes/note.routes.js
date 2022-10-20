const fetchUsers=require('../middleware/auth');
const db=require('../models');
const Notes=db.notes;
module.exports=app=>{
    var router=require('express').Router();
    router.get('/notes',fetchUsers,(req,res)=>{
      Notes.findOne({user:req.body.id}).then(data=>{
        res.status(200).json({
          data:data
        })
      }).catch(err=>{
        res.status(500).json('No user was found!')
      })
     
    })

    router.post('/notes',fetchUsers,(req,res)=>{
      
      const notes=new Notes({
        user:req.body.user,
        title:req.body.title,
        description:req.body.description
      })
      notes.save(notes).then(data=>{
        res.status(200).json({
          data:data
        })
      }).catch(err=>{
        res.status(500).json({
          error:'some error occurred while saving the data!'
        })
      })
     
    })
    app.use('/api',router);
}