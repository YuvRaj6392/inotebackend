const mongoose=require('mongoose');
const url='mongodb://0.0.0.0:27017';
const connectToMongo=()=>{
    mongoose.connect(url,()=>{
        console.log('connected to mongo successfully!')
    })
}

module.exports=connectToMongo