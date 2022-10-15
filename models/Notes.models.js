module.exports=mongoose=>{
    const Note=mongoose.model('note',mongoose.Schema({
        title:{type:String,required:true},
        description:{type:String,required:true},
        tag:{type:String,default:"General"}
    },{
        timestamps:true
    }));
    return Note;
}