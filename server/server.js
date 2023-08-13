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

// Insert API
app.post('/create', (req, res) => {
    const sql = "INSERT INTO VoterInformation (`Full_Name`, `DOB`, `Email`, `Age`, `Education_Level`, `Gender`, `Current_City`, `Province`, `District`, `Polling_Division`, `Polling_Station`, `Current_Position`, `Name_of_Institute`, `Experience`, `Current_Salary`, `Position_Type`, `NIC`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const values = [
        req.body.fullName,
        req.body.dob,
        req.body.email,
        req.body.age,
        req.body.eduLevel,
        req.body.gender,
        req.body.currentCity,
        req.body.province,
        req.body.district,
        req.body.pollingDivision,
        req.body.pollingStation,
        req.body.currentPosition,
        req.body.institutionName,
        req.body.experience,
        req.body.currentSalary,
        req.body.positionType,
        req.body.nic
    ];

    con.query(sql, values, (err, result) => {
        if (err) {
            console.error('Database Error:', err);
            return res.json({ Status: "Error", Error: "Error in Database", DatabaseError: err.message });
        } else {
            return res.json({ Status: "Success" });
        }
    });
});



// Server starting
app.listen(8081,()=>{
    console.log("Running");
});