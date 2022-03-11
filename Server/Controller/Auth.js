const express=require("express");
const jwt=require("jsonwebtoken");
const Register=require("../model/registerModel");
const Allocation=require("../model/allocationModel");





 const verify =  (req, res, next) => {
    const authHeader = req.headers.authorization;
    
    if (authHeader) {
      // Authheader contains Bearer and Acces token in the array
      const token = authHeader.split(" ")[1];
      
     jwt.verify(token, "mySecretKey", (err, user) => {
        if (err) {
          return res.status(403).json("Token is not valid!");
        }
  
        req.user = user;
        console.log("verified");
        console.log(token);
        next();
      });
    } else {
      res.status(401).json("You are not authenticated!");
    }
  };



  module.exports=verify;