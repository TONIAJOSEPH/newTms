const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const Register = require('./model/registerModel');
const Allocation = require('./model/allocationModel');
const bcrypt = require('bcrypt');
const path = require('path');
const nodemailer=require("nodemailer");


const app = express();
const port = 6233;
let refreshTokens = [];




// const AdminRouter=require("./Routes/adminroutes");
// const Verify=require("./Controller/Auth");
// const corsOptions ={
//   origin:'*', 
//   credentials:true,            //access-control-allow-credentials:true
//   optionSuccessStatus:200,
// } 

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());




// app.use("/admin",AdminRouter);
// app.use(verify,verify);
// app.use(  (req, res,next) => {

//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Methods", 'GET', 'POST', 'PUT', 'DELETE');
//   res.setHeader("Access-Control-Allow-Headers",'X-Requested-With,content-type');
//   res.setHeader("Access-Control-Allow-Credentials",true);
//   next();
// });
// app.use(cors(corsOptions)) // Use this after the variable declaration
mongoose.connect("mongodb://localhost:27017/trainermanagement");




// API for refresh token verification and new refrsh and access token generation
app.post("/api/refresh", (req, res) => {
    //take the refresh token from the user
    const refreshToken = req.body.token;
 
    //send error if there is no token or it's invalid
    if (!refreshToken) return res.status(401).json("You are not authenticated!");
    // if (!refreshTokens.includes(refreshToken)) {
    //   return res.status(403).json("Refresh token is not valid!");
    // }
    //if everything is ok, create new access token, refresh token and send to user
    jwt.verify(refreshToken, "myRefreshSecretKey", (err, user) => {
      err && console.log(err);
      refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
  
      const newAccessToken = generateAccessToken(user);
      const newRefreshToken = generateRefreshToken(user);
  
      refreshTokens.push(newRefreshToken);
  
      res.status(200).json({
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      });
    });
  
    
  });
  
  // Access token generating function
  const generateAccessToken = (user) => {
    return jwt.sign({ id: user.id, username: user.username }, "mySecretKey", {
      expiresIn: "7s",
    });
  };
  
  // Refresh token generating function
  const generateRefreshToken = (user) => {
    return jwt.sign({ id: user.id, username: user.username }, "myRefreshSecretKey");
  };

// User Registration or Enrollment API
  app.post('/api/register',async(req,res)=>{

    try {

      var data = req.body.formValues;
      var info = req.body.course;
      console.log(data);
      console.log(data.username);
      console.log(info);
      // Checking username or email exists in DB
    var details = await Register.find({username:data.username});
    var email = await Register.find({email:data.email});
    console.log(email);
    console.log(details);


    if ((email.length==0) && (details.length==0)&&(data.password!==""
    && data.username!=="" && data.email!=="")) {

      // For RegisterID -Random number creation between 1 and 1000
      var digits=Math.floor((Math.random() * 1000) + 1);
      
      // Skill into array
      var skillset= data.skill.split(",");           //changed for skill(4)
      
      // RegisterID Creation - with 4 digits random number with zero as prefix
      var userid=data.fname.charAt(0)+"ICTAK"+data.sname.charAt(0)
      +digits.toString().padStart(4,'0'); 

      console.log(userid);
      
      // Adding user data to the collection Register with password hashing
        var user = new Register({email:data.email,password: bcrypt.hashSync
        (data.password,10),fname:data.fname,sname:data.sname,
        username:data.username,registerid:userid,quali:data.quali,
        job:data.job,org:data.org,skill:skillset,course:info,approval:req.body.approval,emp:""});

        console.log(user);
        var result = await user.save();
        
        res.json({status:"Success"});
        
    } 
   
    else {
        res.send("Username or Email already exists");
    }
  
      
    }
    catch (error) {

      res.json({status:"Error"});
      
  }
});


      
      // Login API

app.post("/api/login",async (req, res) => {

  console.log("in login "+req.body);
  const username = req.body.username;
  const password = req.body.password;
  if(username!="" &&  password !=""){
    const user =await Register.findOne({username: username});
    console.log(user);
  if(user!=null){ 
    const passwordChecker = await bcrypt.compare(password,user.password);
    console.log(passwordChecker);
    if ((user.approval==true || user.username=="admin") && passwordChecker) {  //changed for login(1)
      //Generate an access token & Refresh token - Calling functions
      const accessToken = generateAccessToken(user);
      const refreshToken = generateRefreshToken(user);
    
      // Adding refresh token to the array as temperory
      refreshTokens.push(refreshToken);
      res.json({
        username: user.username,
        id:user.id,
        accessToken,
        refreshToken,
      });
    } 
      else if( user.approval==false && passwordChecker) {
      res.json("Approval Pending!");
    }
      else{
        res.json("Invalid Credentials!!!");
      }
    
      }
      else{
        res.json("Invalid Credentials")
      }
    }

  else{
    res.json("type password or username");
  }
      
  

    
  });

  // Verifying Access token for protected APIs
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

// Logout API and removing refresh token from the array refreshTokens
  // app.post("/api/logout", verify, (req, res) => {
  //   const refreshToken = req.body.token;
  //   refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
  //   res.status(200).json("You logged out successfully.");
  // });
  
  app.post("/api/logout",(req, res) => {
      const refreshToken = req.body.token;
      refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
      res.status(200).json("You logged out successfully.");
    });
  

  // Route for fatching approval pending user details
  app.get("/api/userdetails",verify,async (req,res)=>{
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

//rejecting user
app.post("/api/user/delete/:id",verify, async (req,res)=>{
  
 
    try {
      const id=req.params.id;
      Register.findOneAndDelete({_id:id}).then((person)=>{
       res.json(person);
       console.log(person);
       })

  } catch (error) {
      res.json("error");
  }
});
       //updating status as approved
app.post("/api/updatestatus/:id",verify,async (req,res)=>{
  const emp=req.body.body;
  console.log(req.body) ; 
  console.log(emp) ; 
 const id=req.params.id;
 const filter = {_id:id};
 const update = {$set:{approval:true,emp:emp}};
await Register.findOneAndUpdate(filter,update,{new:true}).then((user)=>{
     res.json(user);
 })
 

   
  
});


  //getting eachuser for sending email
  app.get("/api/select/:id",verify,async (req,res)=>{
    try {
        const id=req.params.id;
       await Register.find({_id:id}).then(
           (values)=>{
res.json(values);
           }
       )
    } catch (error) {
        console.log(error)
    } 
})

//sending confirmation email 
app.post("/api/mailer",(req,res)=>{
    console.log(req.body.body);
    var data1=req.body.body.email;
    var data2=req.body.body.uname;
    var data3=req.body.body.pass;
    var data4=req.body.body.employ;
    var transporter=nodemailer.createTransport({
        service: "gmail",
        auth: {
            user:"ictaktms@gmail.com",
            pass:"ictak123*"
        }
    
    });
     
    var mailoptions={
        from:"ictaktms@gmail.com",
        to: data1,
        subject:"confirmation of approval",  
        html: "<h3>You are approved as ICTAK trainer.Please login with username and password....</h3><br/><table border='1' width='70%' height='100px' style='border-collapse:collapse;'>\
                     <tr style='background-color: black;'>\
                        <th style='color: white;'>Username</th>\
                        <th style='color: white;'>Employ type</th>\
                    </tr>\
                 <tr>\
                 <td style='text-align: center'>"+data2+"</td>\
                 <td style='text-align: center'>"+data4+"</td>\
                   </tr>\
                  </table><br/>"      
    };
    transporter.sendMail(mailoptions,function(err,info){
        if(err){
            console.log(err);
            res.send("something went wrong");
        }
        else{
            console.log("email send successfully");
        }
    }); 
});

app.get("/api/approvedlist",verify,async (req,res)=>{
  try {
      await Register.find({approval:true}).then(
          (active)=>{
                res.json(active);
          }
      )
  } catch (error) {
      console.log(error);
  }
 
})

// checking for the same name
app.post("/api/allocation/:newname",verify,async (req,res)=>{
  const newname=req.params.newname;
  const items = req.body.body;
  const startSplit=items.stime.split(':');
  const startTime=parseInt(startSplit[0]+startSplit[1]);
  const endSplit=items.etime.split(':');
  const endTime=parseInt(endSplit[0]+endSplit[1]);
  const user = req.body.body.item;
const result= await Allocation.find({$and:[{username:items.item.username},{registerid:items.item.registerid},{day:items.day},
{$or:[{$and:[{stime:{$lte:startTime}},{etime:{$gte:startTime}}]},
{$and:[{stime:{$lte:endTime}},{etime:{$gte:endTime}}]}]},{$or:[{$and:[{startdate:{$lte:items.startdate}},{enddate:{$gte:items.startdate}}]},{$and:[{startdate:{$lte:items.enddate}},{enddate:{$gte:items.startdate}}]}]}]});
 
if(result.length==0){
   const saveData = new Allocation({
     username:user.username,registerid:user.registerid,
     fname:user.fname,sname:user.sname,
     batch: req.body.body.batch,courseid:req.body.body.courseid,
     startdate:req.body.body.startdate,
     day:req.body.body.day,enddate:req.body.body.enddate,
     meeting:req.body.body.meeting,
     shedule:req.body.body.schedule,
     stime:startTime,etime:endTime

    })
    const savedData = await saveData.save();
    
    res.send(savedData);
   }

  //  else if(result.length>0 && result.time==req.body.body.time &&
  //   (result[0].startdate<=req.body.body.startdate && result[0].enddate>=req.body.body.startdate
  //     || result[0].startdate<=req.body.body.enddate && result[0].enddate>=req.body.body.enddate)
  //   && result[0].day==req.body.body.day){
  //     res.send("Already allocated for this date and time")
     
  //   }
    else {

      
       console.log(result)
       console.log(items.startdate)
      
       res.send("Already taken");
    }
})

//saving allocated details into allocatedtrainers collection
app.post("/api/scheduled",async (req,res)=>{
  try {

    const emp=req.body.body;
  console.log(req.body) ; 
  console.log(emp) ; 
 const id=req.params.id;
 const filter = {username:req.body.uname};
 const update = {$set:{email:req.body.email,
  emp:emp,qual:req.body.qual,
  skills:req.body.skills,
  comp:req.body.comp,
  batch:req.body.batch,
  emp:req.body.emp,
  courseid:req.body.courseid,
  time:req.body.time,
  startdate:req.body.startdate,
  enddate:req.body.enddate,
  meeting:req.body.meeting,
  schedule:req.body.schedule,
  day:req.body.day
}};
await Allocation.findOneAndUpdate(filter,update,{new:true}).then((user)=>{
     res.json(user);
 })
 
      
  } catch (error) {
      console.log(error)
  }
})


//checking for allocated time schedules 
app.get("/api/allocated/:name/:time/:day/:startdate/:enddate",async (req,res)=>{
  const time=req.params.time;
  const day=req.params.day;
  const startdate=req.params.startdate;
  const enddate=req.params.enddate;
  const name=req.params.name;
  try {
      await allocateddata.find({$and:[{username: name},{startdate: startdate},{enddate: enddate},{day: day},{time: time}]}).then((trainer)=>{
        res.json(trainer);
          console.log(trainer);
       })
   } catch (error) {
       console.log(error);
   }      
})

//getting all scheduledtrainers
app.get("/api/allocated",async (req,res)=>{
  try {
     await Allocation.find().then((trainer)=>{
       res.json(trainer);
      })
  } catch (error) {
      console.log(error);
  }    
  })


//sending email with scheduled details

app.post("/api/sheduledemail",(req,res)=>{
  console.log(req.body);
  var data1=req.body.uname;
  var data2=req.body.email;
  var data3=req.body.batch;
  var data4=req.body.courseid;
  var data5=req.body.day;
  var data6=req.body.time;
  var data7=req.body.startdate;
  var data8=req.body.enddate;
  var data9=req.body.meeting;
  var data10=req.body.schedule;

  var transporter=nodemailer.createTransport({
      service: "gmail",
      auth: {
          user:"ictaktms@gmail.com",
          pass:"ictak123*"
      }
  
  });
   
  var mailoptions={
      from:"ictaktms@gmail.com",
      to: data2,
      subject: "Your shedule details",  
      html: "<h3>You are scheduled for the ictak course...</h3>\
      <h3>Name: " +data1+"</h3>\
      <h3>Batch: " +data3+"</h3>\
      <h3>CourseId: " +data4+"</h3>\
      <h3>Day: " +data5+"</h3>\
      <h4>Login to your account to view the complete details...</h4>"      
  };
  transporter.sendMail(mailoptions,function(err,info){
      if(err){
          console.log(err);
          res.send("something went wrong");
      }
      else{
          console.log("email send successfully");
      }
  }); 
});

app.listen(port, () => {
    console.log("Listening on port "+port);
});