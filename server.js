const connectToMongo=require('./db');
connectToMongo();
const express=require('express');
const app=express();
app.get('/',(req,res)=>{
    res.status(200).json({
        message:'Hey welcome to the home page!'
    })
})
app.listen(8080,()=>{
    console.log('Server is listening to PORT 8080!')
})