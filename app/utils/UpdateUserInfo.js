import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useForm } from "react-hook-form";
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  
const UpdateUserInfo = ({open,handleClose,sentData}) => {
    // console.log(sentData.id)
    const { register, handleSubmit } = useForm();
    


     const onSubmit = data => {
       fetch(`http://localhost:3890/api/users/update/${sentData.id}`, {
        method: "PUT",
        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data)
        });
  
    
    
      };
    return (
        <div>
       
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"

          closeAfterTransition
          // BackdropComponent={Backdrop}
          // BackdropProps={{
          //   timeout: 500,
          // }}
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              nomUser:     {sentData.nomUser}
            </Typography>
            {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}> */}
          

          <form onSubmit={handleSubmit(onSubmit)}>
    
          <label>Update User adrUser:</label>
          <input defaultValue={sentData.adrUser} {...register("adrUser")} /><br/>
          
          <label>Update User validiteAdresse:</label>
          <input defaultValue={sentData.validiteAdresse} {...register("validiteAdresse")} /> 
           <br/>
    
      
      <input type="submit" />
    </form>
            {/* </Typography> */}
          </Box>
        </Modal>
      </div>
    );
};

export default UpdateUserInfo;