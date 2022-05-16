const express=require('express');//api for nodejs
const cors =require("cors");
const app=express();//storing api in app variable
//const {MongoClient} = require('mongodb');
//const client = new MongoClient(uri);

const pg=require("pg");//pg is connector btwn node nd psql
let pgDbConfig ={
    user : 'postgres',
    database : 'dbconnector',
    host:'localhost',
    password:'2323',
    port:1623,
    max:500 , //max no of client in the pool
}
const pool =new pg.Pool(pgDbConfig); //connecting pool with db
module.exports = [pool]
app.use(express.json({limit: '5mb'}));

app.use(cors({
    origin: ['http://localhost:4200', 'http://localhost:2000']
}))

app.post('/saveDetails',async(req,res)=>{//req(req==>param1 from angular) ,(res ==> response to angular)
    console.log('inside api');
    console.log(req.body);
    console.log(req.body.domainName);
    let qtext = "INSERT INTO pass_man VALUES($1,$2)";
    let qpara = [req.body.domainName , req.body.password ]
    myDb(qtext,qpara);//calling the function myDb for getting the values to be inserted from form.
})
app.post('/updateDetails',async(req,res)=>{//req(req==>param1 from angular) ,(res ==> response to angular)
    console.log('inside api');
    console.log(req.body);
    console.log(req.body.domainName);
    let qtext = "UPDATE pass_man set pass=$2 WHERE dname=$1";
    let qpara = [req.body.domainName , req.body.password ]
    myDb(qtext,qpara);//calling the function myDb for getting the values to be inserted from form.
})
app.post('/delDetails',async(req,res)=>{//req(req==>param1 from angular) ,(res ==> response to angular)
    console.log('inside api');
    console.log(req.body);
    console.log(req.body.dName);
    let qtext = "DELETE FROM pass_man  WHERE dname=$1";
    let qpara = [req.body.dName]
    myDb(qtext,qpara);//calling the function myDb for getting the values to be inserted from form.
})

async function myDb(qtext,qpara){
    let result;
    let client=await pool.connect();//calling pool
    const qresult= await client.query(qtext,qpara);//services value will be stored here to process into db 
    console.log("success")
    console.log("db0",qresult)
    //console.log('db',qresult.rows);
    //return await qresult.rows[0];//select
}

app.listen(2000,(req,res) =>{//the app port is listening to 3000,
    console.log("express API is running at port 2000");
 })