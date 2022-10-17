const db=require('./models');
const express=require('express');
const bodyParser=require('body-parser');
const app=express();
db.mongoose.connect(db.url,{
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(()=>{
    console.log('connected to the database')
  }).catch((err)=>{
    console.log(err);
    process.exit();
  })
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended:true}));
require('./routes/user.routes')(app);
require('./routes/note.routes')(app)
app.listen(8080,()=>{
    console.log('The server is listening to the port 8080!')
})