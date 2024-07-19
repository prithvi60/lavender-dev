import React, {Fragment} from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import Button from '../components/Button';
import { Error } from '@mui/icons-material';

const PageNotFound = () => {
  const navigate = useNavigate();

  const goBackToPreviousPage = () => {
    navigate(-1);
  };

  return (
    <Fragment>
      <div className='page-not-found'>
        <div className='not-found-content'>
          <Error className='icon-light' fontSize='large'/>
          <Typography className='not-found-title'>404 - Page Not Found</Typography>
          <Button onClick={goBackToPreviousPage} name={"Go Back"} />
        </div>
        
      </div>

    </Fragment>
  );
}

export default PageNotFound;