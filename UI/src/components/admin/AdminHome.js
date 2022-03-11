import React, { useEffect, useState } from 'react';
// import './Login.css';

import axios from 'axios';
import jwt_decode from "jwt-decode";
import {Link, AppBar, Toolbar, Typography } from '@mui/material';
import Cookies from "js-cookie";
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';

function AdminHome(props) {

        let accessToken = Cookies.get("access");
        let refreshToken = Cookies.get("refresh");
        const [values,setValues]=useState({});

    const refresh = async () => {
        try {
          const res = await axios.post("/refresh", { token: refreshToken });
          Cookies.set("access", res.data.accessToken);
        Cookies.set("refresh", res.data.refreshToken);
         
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
            config.headers["authorization"] = "Bearer " + data.accessToken;
          }
          return config;
        },
        (error) => {
          return Promise.reject(error);
        }
      );

      const handleDelete = async (id) => {
       
        try {
          await axiosJWT.delete("http://localhost:6233/api/trainees", {
            headers: { authorization: "Bearer " + accessToken },
          });
          
        } catch (err) {
          console.log(err);
        }
      };
    
      var staff = [
        {value:"a",label:"Internal"},
        {value:"b",label:"External"},
        {value:"c",label:"Industrial"}
        ];

      var permit = [
        {value:true,label:"Approve"},
        {value:false,label:"Reject"},
        ];

        const [staffValue,setStaffValue]=useState({});
        const [permitValue,setPermitValue]=useState({});
    return (
        <div>
            <div>
              <ol>
               {values.map((i,key)=>(
                 <li>
                   <h4>{i.registerid}</h4>
                   <h4>{i.fname}+" "+{i.sname}</h4>
                   <h4>{i.skill}</h4>
                   <h4>{i.course}</h4>
                   <Select options={staff} onChange={setStaffValue}/>
                   <Select options={permit} onChange={setPermitValue}/>
                 </li>
               ))

               } 
              </ol>
            </div>
        </div>
    );
}

export default AdminHome;