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


const con = mysql.createConnection({
    host:"localhost",
    port:"3308",
    user:"root",
    password:"",

});

con.connect(function(err){
    if (err) {
        console.log("Error in Connection",err);
    }else{
        console.log("Connected");
    }
});

app.listen(8081,()=>{
    console.log("Running");
});