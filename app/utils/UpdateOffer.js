import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useForm } from "react-hook-form";
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


const UpdateOffer = ({open,handleClose,sentModalData}) => {
    // const [adminAction, setAdminAction] = useState(0)
    // console.log(adminAction)
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const onSubmit = data => {
        console.log(data);

    fetch("http://localhost:3890/api/contratoffre/active", {
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
        //   setAdminAction(1)
        });
    }


    // const onSubmit1 = data => {
    //     console.log(data);

    // fetch("http://localhost:3890/api/contratoffre/active", {
    //     method: "PUT",
    //     headers: {
    //         'content-type': 'application/json',
    //          Authorization: `Bearer ${localStorage.getItem("token")}`,
    //     },
    //     body: JSON.stringify(data)
    //   })
    //     .then((res) => res.json())
    //     .then((data) => {
    //       console.log(data)
    //       setAdminAction(1)
    //     });
    // }



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
             Update Offer
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}> 
         {/* {
            adminAction? */}
            
            
            <form onSubmit={handleSubmit(onSubmit)}>
            <label>Operation:</label>
           <input defaultValue={sentModalData.operation} {...register("operation")} />
           <label>prixOffre:</label>
           <input defaultValue="" {...register("prixOffre")} />
           <label>packoffre_id:</label>
           <input defaultValue="" {...register("packoffre_id")} />
           <label>user_id:</label>
           <input defaultValue="" {...register("user_id")} />
           <label>idContrat:</label>
           <input defaultValue="" {...register("idContrat")} />
           
           <input type="submit" />
         </form>
         
         
         {/* : <form onSubmit={handleSubmit(onSubmit1)}>
         <label>pdfContratOffre:</label>
          <input defaultValue="" {...register("pdfContratOffre")} />
          <label>user:</label>
          <input defaultValue="" {...register("user.id")} />
          <label>packoffre:</label>
          <input defaultValue="" {...register("packoffre.id")} />


         <input type="submit" />
</form>


         } */}
    
    
             </Typography>
          </Box>
        </Modal>
      </div>
    );
};

export default UpdateOffer;