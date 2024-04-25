import { Box, Link, Modal } from '@mui/material'
import React from 'react'
import RegisterLoginScreen from '../../../components/LoginScreens/RegisterLoginScreen.tsx';

function LoginModal() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen((prev) => !prev);
      };

    const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    border: "2px",
    boxShadow: 24,
    p: 4,
    borderradius: "2px",
    };
    
  return (
    <div>
        <Link onClick={handleOpen}>Register or Login</Link>
        <Modal
        open={open}
        onClose={handleOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
            <Box sx={style} className="rounded-3xl">
                <RegisterLoginScreen />
            </Box>
        </Modal>
    </div>
  )
}

export default LoginModal