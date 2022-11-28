import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useForm } from "react-hook-form";
import FormData from 'form-data';
import "../utils/style.css"

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
    const [adminAction, setAdminAction] = useState(0)
    const [fileName, setFileName] = useState("")

    const onSubmit = (data) => {

    console.log('submit file',data.document[0]);
    const files = data.document

    const formData = new FormData()
    formData.append('document', files[0])

    fetch("http://localhost:3890/api/files/documents/create", {
        method: "POST",
        headers: {
            // 'content-type': 'application/pdf',
             Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data.filename)
          setFileName(data.filename)
          setAdminAction(1)
        });
    
 

  }

  const onSubmit1 = data => {
    console.log(data);

fetch("http://localhost:3890/api/contratassurance/active", {
    method: "PUT",
    headers: {
        'content-type': 'application/json',
         Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(data)
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data)
      setAdminAction(1)
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
          
          {adminAction?<form onSubmit={handleSubmit(onSubmit1)}>
          <label>pdfContratAssurance:</label>
           <input defaultValue={fileName} {...register("pdfContratAssurance")} />
           <label>Operation:</label>
           <input defaultValue="" {...register("operation")} />
           <label>prixAssur:</label>
           <input defaultValue="" {...register("prixAssur")} />
           <label>packassur_id:</label>
           <input defaultValue="" {...register("packassur_id")} />
           <label>user_id:</label>
           <input defaultValue="" {...register("user_id")} />
           <label>idContrat:</label>
           <input defaultValue="" {...register("idContrat")} />
           
           <input type="submit" />
         </form> :<form onSubmit={handleSubmit(onSubmit)}>
          <label>Select PDF:</label>
          <input defaultValue="" type="file" {...register("document")}  webkitdirectory/>
           
          <input type="submit" />
          </form>

          }
    
             </Typography>
          </Box>
        </Modal>
      </div>
    );
};

export default UpdateInsurance;