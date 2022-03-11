import React, { useState, useContext } from 'react'
import { AppBar, Toolbar, Typography, Tabs, Tab ,useMediaQuery ,useTheme} from '@mui/material';
import DrawerComp from './Drawer';
import { useNavigate } from 'react-router';
// import jwt_decode from 'jwt-decode';
// import cookies from 'js-cookie';
 import axios from 'axios';
import { UserContext } from '../../App';




const MenuAppBar = () => {

  // let accessToken=cookies.get("access");

const {state,dispatch} = useContext(UserContext)

   const [value, setvalue] = useState();
  
   const navigate=useNavigate();
   const theme=useTheme();
   const isMatch=useMediaQuery(theme.breakpoints.down('md'));
   
   const handleMenuclick=(pageurl)=>{
      navigate(pageurl);
   }

  return (
    <div>
      <AppBar style={{backgroundColor: "black"}}>
         <Toolbar>
{
  isMatch ? (
    <>
<DrawerComp/>
<Typography sx={{paddingLeft: "5%"}}>TMS</Typography>
</>
  ) : (
         <>
            {/* <Typography onClick={()=>handleMenuclick("/logout")}>TMS</Typography>
            <Tabs sx={{marginLeft: 'auto'}} textColor="inherit" onChange={(e,value)=>setvalue(value)} value={value} indicatorColor="red"> */}
                {/* <Tab label="login" onClick={()=>handleMenuclick("/login")}/> */}
              { (state=="isAdmin") ? (
               <>
                <Typography onClick={()=>handleMenuclick("/logout")}>TMS</Typography>
                 <Tabs sx={{marginLeft: 'auto'}} textColor="inherit" onChange={(e,value)=>setvalue(value)} value={value} indicatorColor="secondary">
                  <Tab label="REQUESTS" onClick={()=>handleMenuclick("/userlist")}/>
                  <Tab label="APPROVED" onClick={()=>handleMenuclick("/approvedlist")}/>
                  <Tab label="SCHEDULED" onClick={()=>handleMenuclick("/scheduledlist")}/>
                  <Tab label="LOGOUT" onClick={()=>handleMenuclick("/logout")}/>
                  </Tabs>
                 </>
                  ):(state=="isUser")?(
                    <>
                    <Typography onClick={()=>handleMenuclick("/logout")}>TMS</Typography>
                 <Tabs sx={{marginLeft: 'auto'}} textColor="inherit" onChange={(e,value)=>setvalue(value)} value={value} indicatorColor="red">
                    <Tab label="PROFILE" onClick={()=>handleMenuclick("/userprofile")}/>
                    <Tab label="LOGOUT" onClick={()=>handleMenuclick("/logout")}/>
                    </Tabs>
                    </>
                  ):(state=="isLogin")?(
                   <>
                    <Typography onClick={()=>handleMenuclick("/logout")}>TMS</Typography>
                 <Tabs sx={{marginLeft: 'auto'}} textColor="inherit" onChange={(e,value)=>setvalue(value)} value={value} indicatorColor="red">
                    <Tab label="REGISTER" onClick={()=>handleMenuclick("/register")}/>
                    </Tabs>
                   </>
                  ):(state=="isRegister")?(
                   <>
                    <Typography onClick={()=>handleMenuclick("/logout")}>TMS</Typography>
                    <Tabs sx={{marginLeft: 'auto'}} textColor="inherit" onChange={(e,value)=>setvalue(value)} value={value} indicatorColor="red">
                    <Tab label="LOGIN" onClick={()=>handleMenuclick("/login")}/>
                   </Tabs>
                   </>
                  ):(
                   
                    <Tab label="" onClick={()=>handleMenuclick("")}/>
                    
                    
                  )
                }
          </>
  )
}
     </Toolbar>   
      </AppBar>
    </div>
  )
}

export default MenuAppBar
