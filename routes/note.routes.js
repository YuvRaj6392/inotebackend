module.exports=app=>{
    var router=require('express').Router();
    router.get('/note',(req,res)=>{
      res.send('Hey welcome to the home page!')
        res.end();
    })
    app.use('/api',router);
}