const express=require("express");
const AdminRouter=express.Router();
const VerifyToken=require("../Controller/Auth");
const Register=require("../model/registerModel");
const Allocation=require("../model/allocationModel");




AdminRouter.get("/admin/api/userdetails",VerifyToken,async (req,res)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
    try {
         await Register.find({approval:false}).then(
             (user)=>{
                  res.json(user);
             }
         ) 
    } catch (err) {
        res.json("error");
    }
})


module.exports=AdminRouter;