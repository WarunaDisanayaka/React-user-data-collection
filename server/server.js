import express from 'express';
import mysql from 'mysql';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const app= express();
app.use(cors());
app.use(cookieParser());
app.use(express.json());

// Database connection
const con = mysql.createConnection({
    host:"localhost",
    port:"3308",
    user:"root",
    password:"",
    database:"election"

});

con.connect(function(err){
    if (err) {
        console.log("Error in Connection",err);
    }else{
        console.log("Connected");
    }
});

// Login API
app.post('/login',(req,res)=>{
    const sql="SELECT * FROM admin WHERE username=? AND password=?";
    con.query(sql,[req.body.email,req.body.password],(err,result)=>{
        if (err) return res.json({Error:"Error in Server"});
        if (result.length>0) {
            return res.json({Status:"Success"});
        }else{
            return res.json({Status:"Error"}); 
        }
    })
});


// Server starting
app.listen(8081,()=>{
    console.log("Running");
});