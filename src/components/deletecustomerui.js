import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import "../App.css";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 200,
    maxHeight: '50vh',
    overflowY: 'auto',
    bgcolor: '#808080',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function BasicModalDeleteCustomer({ customer_id, updateList }) {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const deleteCustomer = () => {
        fetch(`http://localhost:8080/api/customers/delete/${customer_id}`, {
            method: 'DELETE',
        })
            .then(response => {
                if (!response.ok)
                    throw new Error('Error');
                updateList();
                handleClose();
            })
            .catch((error) => {
                console.error('Error', error);
            });
    };

    return (
        <div>
            <Button onClick={handleOpen} className='detail'>Delete Customer</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="customer-confirm"
            >
                <Box sx={style}>
                    <Typography style={{ textAlign: 'center' }} id="modal-modal-confirm" variant="h5" component="h2">
                        Are you sure?
                    </Typography>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                        <Button variant="contained" onClick={deleteCustomer}>Yes</Button>
                        <Button variant="contained" onClick={handleClose}>No</Button>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}