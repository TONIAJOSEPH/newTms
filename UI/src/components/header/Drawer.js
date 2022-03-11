import React, { useState, useContext } from 'react'
import DehazeIcon from '@mui/icons-material/Dehaze';
import { Drawer, List, ListItemButton, ListItemIcon, ListItemText, IconButton} from '@mui/material';
import { useNavigate } from 'react-router';
import { UserContext } from '../../App';

const PAGES=["REQUESTS","APPROVED","SCHEDULED"];
const DrawerComp = () => {
    const {state,dispatch} = useContext(UserContext)
    const navigate=useNavigate();
    const [openDrawer, setOpenDrawer] = useState(false);

    const handleMenuclick=(pageurl)=>{
        navigate(pageurl);
     }
  


    return (
        <div>
            <Drawer open={openDrawer} onClose={()=>setOpenDrawer(false)} style={{color: "black"}}>
                <List>
                    {
                        (state=="isAdmin")?(
                            <>
                            <ListItemButton onClick={()=>handleMenuclick("/userlist")}>
                            <ListItemIcon>
                                <ListItemText>REQUESTS</ListItemText>
                            </ListItemIcon>
                        </ListItemButton>
                        <ListItemButton onClick={()=>handleMenuclick("/approvedlist")}>
                            <ListItemIcon>
                                <ListItemText>APPROVED</ListItemText>
                            </ListItemIcon>
                        </ListItemButton>
                        <ListItemButton onClick={()=>handleMenuclick("/scheduledlist")}>
                            <ListItemIcon>
                                <ListItemText>SCHEDULED</ListItemText>
                            </ListItemIcon>
                        </ListItemButton>
                        <ListItemButton onClick={()=>handleMenuclick("/logout")}>
                            <ListItemIcon>
                                <ListItemText>LOGOUT</ListItemText>
                            </ListItemIcon>
                        </ListItemButton>
                        </>
                        ):(state=="isUser")?(
                            <>
                            <ListItemButton onClick={()=>handleMenuclick("/userprofile")}>
                            <ListItemIcon>
                                <ListItemText>PROFILE</ListItemText>
                            </ListItemIcon>
                        </ListItemButton>
                        <ListItemButton onClick={()=>handleMenuclick("/logout")}>
                            <ListItemIcon>
                                <ListItemText>LOGOUT</ListItemText>
                            </ListItemIcon>
                        </ListItemButton>
                        </>
                        ):(state=="isLogin")?(
                            <>
                            <ListItemButton onClick={()=>handleMenuclick("/register")}>
                            <ListItemIcon>
                                <ListItemText>REGISTER</ListItemText>
                            </ListItemIcon>
                        </ListItemButton>
                        </>
                        ):(state=="isRegister")?(
                            <>
                            <ListItemButton onClick={()=>handleMenuclick("/login")}>
                            <ListItemIcon>
                                <ListItemText>LOGIN</ListItemText>
                            </ListItemIcon>
                        </ListItemButton>
                        </>
                        ):(
                            <>
                            <ListItemButton onClick={()=>handleMenuclick("")}>
                            <ListItemIcon>
                                <ListItemText></ListItemText>
                            </ListItemIcon>
                           </ListItemButton>
                        </>
                        )
                    }
                           

                </List>
            </Drawer>
            <IconButton sx={{color: "white",marginLeft: "auto"}} onClick={()=>setOpenDrawer(!openDrawer)}><DehazeIcon/></IconButton>
        </div>
    )
}

export default DrawerComp
