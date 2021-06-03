const express=require('express');
const fetch=require('node-fetch');
const bodyParser=require('body-parser');
const hbs = require('hbs');
 const app=express();
 app.use(bodyParser.urlencoded({ extended: false }))
 app.use(express.static('static'))
 app.engine('hbs', require('hbs').__express);
 app.set('view engine', 'hbs');
 

app.get('/',async(req,res)=>{
  // res.sendFile(__dirname+'/static/home.html');
  try{
    const data2= await fetch(`https://api.covid19api.com/summary`);
    const getdata2=await data2.json();
    console.log(getdata2['Global']);
    const objective={
      data:getdata2['Global'],
      data2:getdata2['Countries']
    };
    res.render('global.hbs',{obj3:objective});
   }
   catch(err){
     console.log(err);
   }
});
app.post('/',(req,res)=>{
   console.log(req.body);
});
app.post('/country',async(req,res)=>{
  try{
   const data= await fetch(`https://api.covid19api.com/live/country/${req.body.country}/status/confirmed`)
   const getdata=await data.json();
   console.log(getdata);
   const obj={
     data:getdata,
     name:req.body.country
   };
   res.render('home.hbs',{obj2:obj});
  }
  catch(err){
    console.log(err);
  }
});
 app.listen(5000,()=>{
     console.log('listening on port 5000');
 })