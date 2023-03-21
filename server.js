const express = require('express');
const app = express();
const database = require('mysql')
const bodyparser = require('body-parser')
const cookieparser = require('cookie-parser');
// const e = require('express');
const port = 5016;
app.set("view engine", "ejs");
app.use(cookieparser())
app.use(express.static("public"));
app.use(bodyparser.json())
app.get("/index", (req, res) => {
  res.render("index");
})
var connectDatabase = database.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'NotesApp'
})
connectDatabase.connect((err) => {
  if (err) {
    console.log(err);
  }
  else {
    // console.log("NotesApp Database Connected")
    // var createTable="create table userDetails(userid int AUTO_INCREMENT PRIMARY KEY,username varchar(255),useremailid varchar(255),userpassword varchar(50))";
    //  var createTable="drop table userDetails"

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
app.post('/signupdetails', (req, res) => {
  res.json({ message: "receive signup details" });
  console.log(req.body.signupcontent);
  const usercontent = req.body.signupcontent;
  var insertuserdetails = `insert into userDetails(username,useremailid,userpassword) values ('${usercontent.username}','${usercontent.email}','${usercontent.password}')`;
  connectDatabase.query(insertuserdetails, (err, result) => {
    if (err) {
      console.log(err)
    }
    else {
      console.log(result);
      var createUserboard = `create table ${usercontent.username} (notebookid int AUTO_INCREMENT PRIMARY KEY,notebookname varchar(100),booksname JSON,booksvalues LONGTEXT)`;
      connectDatabase.query(createUserboard, (err, result) => {
        if (err) {
          console.log(err)
        }
        else {
          var createUserupdate = `insert into ${usercontent.username} (notebookname,booksname) values ('My NoteBook',[])`;
          connectDatabase.query(createUserupdate, (err, result) => {
            if (err) {
              console.log(err)
            }
            else {
              res.json({ message: "insert new details" })
            }
          })
        }
      })
    }
  })
  // res.cookie("cookie name","encrypted cookie string value");

})

app.get('/notebook/:username', (req, res) => {
  console.log(req.params.username)
  var userDetailsvalue = `select * from ${req.params.username}`;
  connectDatabase.query(userDetailsvalue, (err, result) => {
    if (err) {
      console.log(err);
    }
    else {
      console.log(result);
      res.render("notebook", { usercontent: result, username: `${req.params.username}` });

    }
  })

})
app.post('/logindetails', (req, res) => {
  var logindetails = `Select * from userDetails`;
  connectDatabase.query(logindetails, (err, result) => {
    if (err) {
      console.log(err);
    }
    else {
      console.log(result)
      res.json({ logincontent: result })
    }
  })
})
app.post("/newnotebook/:usernames", (req, res) => {
  var updatebookname = `insert into ${req.params.usernames} (notebookname,booksname) values ('untitled',[])`
  connectDatabase.query(updatebookname, (err, result) => {
    if (err) {
      console.log(err);
    }
    else {

    }
  })
})

app.post('/updatenotebook/:usernames/:noteid', (req, res) => {
  console.log(req.body.notebookname);
  var updatebooknames = `update ${req.params.usernames} SET notebookname='${req.body.notebookname}' WHERE notebookid=${req.params.noteid}`;
  connectDatabase.query(updatebooknames, (err, result) => {
    if (err) {
      console.log(err)
    }
    else {
      console.log(result)
    }
  })
})
app.get('/notes/:usernamevalue', (req, res) => {
  console.log(req.params.usernamevalue)
  var userDetailsContent = `select * from ${req.params.usernamevalue} WHERE notebookid=1`;
  connectDatabase.query(userDetailsContent, (err, result) => {
    if (err) {
      console.log(err);
    }
    else {
      console.log(result);
      res.render("notes", { usercontent: result, username: `${req.params.usernamevalue}` });

    }
  })
})
app.listen(port, () => console.log("Listenting :" + port))


