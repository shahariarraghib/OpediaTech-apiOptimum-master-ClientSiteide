import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useForm } from "react-hook-form";
import FormData from 'form-data';
import fs from "fs"
import axios from 'axios';
// var FormData = require('form-data');
// var fs = require('fs');

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    // border: '2px solid #e6fbff',
    boxShadow: 24,
    p: 4,
  };

const UpdateInsurance = ({open,handleClose,sentModalData}) => {
    console.log(sentModalData)
    const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {

    console.log('submit file',data);

    // var d = new FormData();
    // // fs.ReadStream
    // d.append('document', fs.createReadStream(data));
    const files = data.document[0]
    const formData = new FormData()
    formData.append('img', files)
    
    fetch("http://localhost:3890/api/files/documents/create", {
        method: "POST",
        headers: {
            'content-type': 'application/pdf',
             Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data)
        });
    
 

  }
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
             Update Insurance
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}> 
          
      <form onSubmit={handleSubmit(onSubmit)}>
     
      <input defaultValue="" type="file" {...register("document")}  webkitdirectory/>
           
      <input type="submit" />
    </form>
    
             </Typography>
          </Box>
        </Modal>
      </div>
    );
};

export default UpdateInsurance;