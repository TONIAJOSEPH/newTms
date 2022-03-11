import React, { createContext, useReducer } from "react";
import Signup from "./components/Signup";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from "./components/Login";
import Userlist from "./components/userdetails/Userlist";
import Approved from "./components/admin/Approved";
import Scheduled from "./components/Scheduled/Scheduled";
import User from "./components/user/User";
import MenuAppBar from "./components/header/Header";
import { initialState, reducer } from "../src/reducer/UserReducer";
import Logout from "./components/logout/Logout";
import { Home } from "./components/home/Home";
// import { userInfo } from "os";

export const UserContext = createContext();
const Routing = () =>{
 return(
  <Routes>
  <Route path='/' element={<Home/>}/>
  <Route path='/login' element={<Login/>}/>
  <Route path='/register' element={<Signup/>}/>
  <Route path='/admin/:id' element={<Userlist/>}/>
  <Route path='/userlist' element={<Userlist/>}/>
  <Route path="/approvedlist" element={<Approved/>}></Route>
  <Route path="/scheduledlist" element={<Scheduled/>}></Route>
  <Route path="/userprofile" element={<User/>}></Route>
  <Route path="/logout" element={<Logout/>}></Route> 
  

  </Routes>
 )

}
function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <div className="App">
     <UserContext.Provider value={{state, dispatch}}>

     
     <Router>
      <MenuAppBar/>
        
        <Routing/> 
       
      </Router>
      </UserContext.Provider>
    </div>
  );
}

export default App;
