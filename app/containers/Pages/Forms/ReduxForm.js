import React, { useState,Fragment, useEffect } from 'react';
import { Helmet } from 'react-helmet';

import { withStyles } from '@material-ui/core/styles';

// import ReduxFormDemo from './ReduxFormDemo';

import brand from 'dan-api/dummy/brand';
import { PapperBlock } from 'dan-components';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@mui/material/Button';
import UpdateOffer from '../../../utils/UpdateOffer';

const styles = ({
  root: {
    flexGrow: 1,
  }
});

function ReduxForm() {
  const title = brand.name + ' - Table';
  const description = brand.desc;
  const [sentData, setSentData] = useState([])
  const [users, setUsers] = useState([])
  console.log(users)
  // console.log(sentData)
  useEffect(() => {

    fetch("http://localhost:3890/api/contratoffre/getAll",{
      method: 'GET',
      headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
     
  })
      .then((res) => res.json())
      .then((data) => {
   
    setUsers(data.data)
  
      });
  }, []);


  const [sentModalData, setSentModalData] = useState([])
  // console.log(sentData)
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

  return (
    <div>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
      </Helmet>
      <PapperBlock title="Offer" icon="ion-ios-list-box-outline" desc="Offer">
        <div>
         
        </div>

        <div>
    <Fragment>
    
    
      <div >
        <Table >
          <TableHead>
            <TableRow>
            <TableCell align="left">No.</TableCell>
              <TableCell align="left">prixOffre</TableCell>
              <TableCell align="left">operation</TableCell>
              <TableCell align="left">nomUser</TableCell>
              {/* <TableCell align="left">telUser</TableCell>
              <TableCell align="left">emailUser</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
           

             {users.map((user, index) => ( 
              <TableRow >
              <TableCell align="left">{index + 1}</TableCell>
              <TableCell align="left">{user.operation}</TableCell>
              <TableCell align="left">{user.prixOffre}</TableCell>
              <TableCell align="left">{user.packoffre.id}</TableCell>
              {/* <TableCell align="left">{user.user.telUser}</TableCell>
              <TableCell align="left">{user.user.emailUser}</TableCell> */}
              <TableCell align="left">

              <Button
              onClick={() => handleOpen(setSentModalData(user))} >
              
              Update Offer
            </Button>
              </TableCell>
              
              </TableRow>
            
       
           
             ))

             }
          </TableBody>
        </Table>
      </div>
    </Fragment>

<UpdateOffer
      handleClose={handleClose}
      open={open}
      sentModalData={sentModalData}
      >

</UpdateOffer>
     
    

   
    
      </div>
      </PapperBlock>
    </div>
  );
}

export default withStyles(styles)(ReduxForm);
