const fetchUsers=require('../middleware/auth');
const db=require('../models');
const userRoutes = require('./user.routes');
const Notes=db.notes;
module.exports=app=>{
    var router=require('express').Router();
    router.get('/notes',fetchUsers,(req,res)=>{
      Notes.find({user:req.body.id}).then(data=>{
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



    router.put('/notes/:id',fetchUsers, async (req,res)=>{
      
      const {title,description,tag}=req.body;
      const newNote={};
      if(title){newNote.title=title};
      if(description){newNote.description=description};
      if(tag){newNote.tag=tag};

    Notes.findById(req.params.id).then(data=>{
      console.log('found')
    }).catch(err=>{
      console.log('not found!')
    });
    
    await Notes.findByIdAndUpdate(req.params.id,{$set: newNote},{new:true}).then(data=>{
      res.json({data})
    }).catch(err=>{
      console.log(err)
    });
    


     
    })


    router.delete('/notes/:id',fetchUsers, async (req,res)=>{
      
     

    Notes.findById(req.params.id).then(data=>{
      console.log('found')
    }).catch(err=>{
      console.log('not found!')
    });
    
    await Notes.findByIdAndRemove(req.params.id).then(data=>{
      res.json({data})
    }).catch(err=>{
      console.log(err)
      res.status(404).send('not found!');
    });
    


     
    })


    
    app.use('/api',router);
}