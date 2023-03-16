const express=require('express');
const app=express();
const database=require('mysql')
const bodyparser=require('body-parser')
const cookieparser=require('cookie-parser');
const port=5016;
app.set("view engine","ejs");
app.use(cookieparser())
app.use(express.static("public"));
app.use(bodyparser.json())
app.get("/index",(req,res)=>{
    res.render("index");
})
var connectDatabase=database.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'NotesApp'
})
connectDatabase.connect((err)=>{
  if(err){
    console.log(err);
  }
  else{
    // console.log("NotesApp Database Connected")
    // var createTable="create table userDetails(username varchar(255),useremailid varchar(255),userpassword varchar(50))";
    // connectDatabase.query(createTable,(err,result)=>{
    //     if(err){
    //         console.log(err);
    //     }
    //     else{
    //         console.log(result)
    //     }
    // })
  }
})
app.post('/signupdetails',(req,res)=>{
    res.json({message:"receive signup details"});
  console.log(req.body.signupcontent);
const usercontent=req.body.signupcontent;
    var insertuserdetails=`insert into userDetails(username,useremailid,userpassword) values ('${usercontent.username}','${usercontent.email}','${usercontent.password}')`;
    connectDatabase.query(insertuserdetails,(err,result)=>{
        if(err){
            console.log(err)
        }
        else{
            console.log(result)
            
        }
    })
    // res.cookie("cookie name","encrypted cookie string value");
    
})

app.get('/notebook',(req,res)=>{
    res.render("notebook");

})
app.post('/logindetails',(req,res)=>{
 
})
app.listen(port,()=>console.log("Listenting :"+port))


