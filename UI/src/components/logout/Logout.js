import React, { useContext, useState, useEffect } from 'react'
import { UserContext } from '../../App';
import axios from 'axios';
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router';



const Logout = () => {
    const navigate=useNavigate();
    const {state,dispatch} = useContext(UserContext);

    const [accessToken,setAccessToken]=useState(Cookies.get("access"));
    const [refreshToken,setRefreshToken]=useState(Cookies.get("refresh"));
 
    // Cookies.set("access", accessToken);
    // Cookies.set("refresh", refreshToken);
 console.log("access",accessToken);
     const refresh = async () => {
         try {
         const res = await axios.post("http://localhost:6233/api/refresh",{ token: Cookies.get("refresh") });
         
         Cookies.remove("access");
         Cookies.remove("refresh");
         
        //  setAccessToken(res.data.accessToken);
        //  setRefreshToken(res.data.refreshToken)
       
        //  console.log("access2",Cookies.get("refresh"));
           return res.data;
         } catch (err) {
           console.log(err);
         }
       };
      
 
       const axiosJWT = axios.create()
     
       axiosJWT.interceptors.request.use(
         async (config) => {
           let currentDate = new Date();
          
           const decodedToken = jwt_decode(accessToken);
           
           if (decodedToken.exp * 1000 < currentDate.getTime()) {
             const data = await refresh();
             console.log("refrsh",data.refreshToken)
             
             config.headers["authorization"] = "Bearer " + data.accessToken;
           }
           return config;
         },
         (error) => {
           return Promise.reject(error);
         }
       );

       async function fetchlogout(){
        const response=await axiosJWT.post("http://localhost:6233/api/logout", {headers: { authorization: "Bearer " + accessToken }});
       //  const body=await response.JSON();
       dispatch({type:"USER" || "ADMIN" || "LOGIN" || "REGISTER", payload:false})
       navigate("/",{replace:true});
     
}


    useEffect(() => {
        fetchlogout();
       
    }, [])

    return (
        <div>
            <h2 style={{marginTop: 100}}>Home Page</h2>
        </div>
    )
}

export default Logout
