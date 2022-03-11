import React, { useContext } from 'react'
import { Button } from '@mui/material';
import { useNavigate } from 'react-router';
import { UserContext } from '../../App';

export const Home = () => {
    const {state,dispatch} = useContext(UserContext);
    const navigate=useNavigate();

   const loginfunction = ()=>{
    dispatch({type:"LOGIN", payload:"isLogin"})
    navigate("/login");
   }
   const registerfunction = ()=>{
    dispatch({type:"REGISTER", payload:"isRegister"})
    navigate("/register");
   }


    return (
        <div style={{marginLeft: 400}}>
            <h2 style={{marginTop: 100}}>HOME PAGE</h2>
            <Button variant="contained" onClick={loginfunction}>LOGIN</Button>
            <Button variant="contained" onClick={registerfunction}>REGISTER</Button>
        </div>
    )
}
