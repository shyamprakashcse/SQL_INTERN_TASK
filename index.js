const express = require('express');
const bodyParser = require("body-parser"); 
const mysql = require('mysql2') 
const app =express() 
app.use(bodyParser.json())

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "RootHunter@123",
    database:"interntaskdb",
    multipleStatements:true
  });
  
  con.connect(function(err) {
    if (err) throw err;
    else 
    console.log("Connected!");
  }); 

// app.get('/createtable',(req,res)=>{
//   let sql='CREATE TABLE STUDENT(registerNumber VARCHAR(255) , studentName VARCHAR(255) , departmentName VARCHAR(255) , year int, PRIMARY KEY (registerNumber))'; 
  
//   con.query(sql,(err,result)=>{ 
//     if(err) throw err; 
//     console.log(result); 
//     res.send("table created successfully");

//   })
// }) 

app.get('/read',(req,res)=>{
    let sql='SELECT * FROM STUDENT';  
    con.query(sql,(err,result)=>{ 
          if(err) throw err; 
          console.log(result); 
          res.send(result); 
    })
})


app.post('/insert',(req,res)=>{
  
  console.log(req.body);  
  let sql = 'INSERT INTO STUDENT SET?' 
  let query=con.query(sql,req.body,(err,result)=>{
    if(err) throw err; 
    console.log(result); 
    res.send("data inserted successfully");

  })

  //res.send("hi route recievebd")
}); 

app.post('/readbyid',(req,res)=>{
  let id=req.body.registerNumber; 
  let sql=`SELECT * FROM STUDENT WHERE registerNumber = ${id}`  
  let query=con.query(sql,(err,result)=>{
    if(err) throw err; 
    console.log(result); 
    res.send(result);

  })
});

app.post('/delete',(req,res)=>{
  let id=req.body.registerNumber; 
  let sql=`DELETE FROM STUDENT WHERE registerNumber = ${id}`  
  let query=con.query(sql,(err,result)=>{
    if(err) throw err; 
    console.log(result); 
    res.send("data deleted successfully");

  })


});  





app.listen(3000,()=>{
    console.log("server is running at port 3000");
})