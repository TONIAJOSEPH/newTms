import React, { useEffect, useState, useContext } from 'react';
// import './Login.css';

import axios from 'axios';

import {Link, AppBar, Toolbar, Typography, Button } from '@mui/material';
import Cookies from "js-cookie";
import { useNavigate } from 'react-router-dom';
import '../components/Login.css';
import {UserContext} from '../App';

function Login(props) {

    const {state,dispatch} = useContext(UserContext);

    var [loginValues,setloginValues] = useState([]);

    

    // Storing Form Field Values
    var [formValues, setFormValues] = useState({ username: "",password: "" });
    
    // Manage Form Error Values
    const navigate = useNavigate();
    
    // Flag for Form Submission Status
    var [isSubmit, setIsSubmit] = useState(false); 
    
    
    // Manage Field Change
      const  handleChange = (event) => {
        // console.log(event.target);
        const { name, value } = event.target; //destructuring
        setFormValues({ ...formValues, [name]: value });
         console.log(formValues);
    }
    
    console.log("formvalues "+formValues);
    const id = loginValues.id;
       
        var username =  loginValues.username;
    useEffect(()=>{
        redirected();
    
    },[loginValues])
    // Manage Form Refresh
     const handleSubmit =  async (event) => {
        event.preventDefault();
        
      await  axios.post('http://localhost:6233/api/login',formValues).then((response)=>{
    
    
      setloginValues(response.data);
            console.log("data",response.data);
            if(response.data=="Approval Pending!"){
                alert("approval pending....");
            }
            if(response.data=="Invalid Credentials"){
                alert("approval pending.. ");
            }
            let accessToken = response.data.accessToken;
            let refreshToken = response.data.refreshToken;
            Cookies.set("access", accessToken);
            Cookies.set("refresh", refreshToken);
            console.log( Cookies.get("refresh"));
    });
         
           
            setFormValues({ username: "",password: "" });
        
      
           
    }
    
    // function  fetch(){
        
    //   }
    
    console.log("login",loginValues.accessToken);
    
    console.log("use",loginValues.username);
    
     function redirected(){  
        
    //    console.log(formValues.username);
    //    console.log(username);
    console.log("full",loginValues.id);
       if( loginValues.id=="6229c079608a172dcaa217e5") {
           dispatch({type:"ADMIN", payload:"isAdmin"});
          navigate(`/admin/${loginValues.id}`,{replace:true});
          console.log("Admin Login");
       }
     else  if(formValues.username===username) {
        dispatch({type:"USER", payload:"isUser"});
           navigate("/userprofile",{replace:true});
           console.log("user login");
        }
    
       else

       {  navigate("#",{replace:true});
       console.log("Invalid login");
       
    }
    }
    
    
    
    
      
    
          
            
        
    // async   function  login(){
    
    //         axios.post('http://localhost:5001/api/login',formValues)
    //         .  then((response)=>
    //         {
    //             console.log(response.data);
    //              setloginValues(response.data);
                
                
    //         })
    
            
        
    //     }
    
    
    
    
        
        return (
            <div>
               
                {/* { (isSubmit &&  isAuth) ?(<Header Values={loginValues}/>):<pre className='pretext'>Invalid Login Credentials</pre>} */}
                
                <div className="loginpage" style={{marginTop: 100}}>
                    <form onSubmit={handleSubmit}>
                    {/* <label for="chk" aria-hidden="true">Sign In</label> */}
                    <h4 style={{textAlign: "center",marginBottom: 10}}>Sign In</h4>
                            <input type="text" name="username" placeholder="User name" required="" value={formValues.username} onChange={handleChange} />
                            
                            
                            <input type="password" name="password" placeholder="Password" required="" value={formValues.password} onChange={handleChange} />
                            { isSubmit &&  loginValues.status==="Authentication failed" ?(<h3>Invalide credentials</h3>):(<h3></h3>)}
                        <Button variant="contained" fullWidth type="submit">signin</Button>
                    </form>
                </div>
                {/* <Link href="/" className='loginlink'>Sign Up</Link>  */}
            </div>
           
        );
    }

export default Login;