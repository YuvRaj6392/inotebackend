module.exports=app=>{
    var router=require('express').Router();
    router.get('/user',(req,res)=>{
        res.send("Hey welcome to the user page!")
        res.end();
    })
    app.use('/api',router);
}