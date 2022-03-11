import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import './cardview.css';
import newone from './3.jpg';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal(props) {

    const {item} = props;
    console.log(item.stime,item.etime);

    const newtime=item.stime;
     const ntime=newtime.toString();
     const tme=ntime.charAt(0)+ntime.charAt(1)+":"+ntime.charAt(2)+ntime.charAt(3);

     const newetime=item.etime;
     const netime=newetime.toString();
     const etme=netime.charAt(0)+netime.charAt(1)+":"+netime.charAt(2)+netime.charAt(3);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen} variant="contained" color="warning">CARDVIEW</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
         <img className="cardimge" style={{width: 100,height: 100}} src={newone}/>
         <Typography className="cardname" id="modal-modal-title" variant="h5" component="h2" style={{color: "black",marginTop: -20,marginLeft: 10}}>{item.username}</Typography>
          <div className="cardmaincontent">
         
          <Typography id="modal-modal-title" style={{color: "black",backgroundColor: "lightgrey",padding: 5,marginBottom: 5}}>Batch: {item.batch}</Typography>
          <Typography id="modal-modal-title" style={{color: "black",backgroundColor: "lightgrey",marginBottom: 5,padding: 5}}>Day: {item.day}</Typography>
          <Typography id="modal-modal-title" style={{color: "black",backgroundColor: "lightgrey",marginBottom: 5,padding: 5}}>StartTime: {tme}</Typography>
          <Typography id="modal-modal-title" style={{color: "black",backgroundColor: "lightgrey",marginBottom: 5,padding: 5}}>EndTime: {etme}</Typography>
          <Typography id="modal-modal-title" style={{color: "black",backgroundColor: "lightgrey",marginBottom: 5,padding: 5}}>Startdate: {item.startdate}</Typography>
          <Typography id="modal-modal-title" style={{color: "black",backgroundColor: "lightgrey",marginBottom: 5,padding: 5}}>Enddate: {item.enddate}</Typography>
          <Typography id="modal-modal-title" style={{color: "black",backgroundColor: "lightgrey",marginBottom: 5,padding: 5}}>Meetinglink: {item.meeting}</Typography>
          <Typography id="modal-modal-title" style={{color: "black",backgroundColor: "lightgrey",marginBottom: 5,padding: 5}}>Schedulelink: {item.schedule}</Typography>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
