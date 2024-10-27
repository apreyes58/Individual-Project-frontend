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
    width: 600,
    maxHeight: '50vh',
    overflowY: 'auto',
    bgcolor: '#808080',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function BasicModalEditCustomer({ customer, updateList }) {
    const [cust, setCust] = useState({ ...customer });

    const handleInput = (e) => {
        const { name, value } = e.target;
        const removeSpaces = value.replace(/\s/g, '');
        setCust((last) => ({
            ...last, [name]: removeSpaces
        }));
    };

    const handleActivity = (e) => {
        setCust((last) => ({
            ...last,
            active: e.target.checked
        }));
    };

    const updateCust = () => {
        fetch(`http://localhost:8080/api/customers/update/${cust.customer_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(cust),
        })
            .then(response => {
                if (!response.ok)
                    throw new Error("Error");
                return response.json();
            })
            .then(() => {
                handleClose();
                updateList();
            })
            .catch((error) => {
                console.error('Error', error);
            });
    };

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <Button onClick={handleOpen} className='detail'>Edit Customer</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="edit-customer"
                aria-describedby="customer-details"
            >
                <Box sx={style}>
                    {cust ? (
                        <>
                            <Typography id="modal-modal-name" variant="h5" component="h2">
                                Edit Customer
                            </Typography>
                            <Typography id="modal-modal-firstname" sx={{ mt: 2 }}>
                                <Typography>Current first name: {customer.first_name}</Typography>
                                <input
                                    type="text"
                                    name="first_name"
                                    onChange={handleInput}
                                    placeholder="Enter new first name"
                                />
                            </Typography>
                            <Typography id="modal-modal-lastname" sx={{ mt: 2 }}>
                                <Typography>Current last name: {customer.last_name}</Typography>
                                <input
                                    type="text"
                                    name="last_name"
                                    onChange={handleInput}
                                    placeholder="Enter new last_name"
                                />
                            </Typography>
                            <Typography id="modal-modal-email" sx={{ mt: 2 }}>
                                <Typography>Current email: {customer.email}</Typography>
                                <input
                                    type="text"
                                    name="email"
                                    onChange={handleInput}
                                    placeholder="Enter new email"
                                />
                            </Typography>
                            <Typography id="modal-modal-active" sx={{ mt: 2 }}>
                                Currently active?: {customer.active}
                                <input
                                    type="checkbox"
                                    checked={cust.active}
                                    onChange={handleActivity}
                                />
                            </Typography>
                            <Button sx={{ mt: 3 }} variant="contained" onClick={updateCust}>Edit customer</Button>
                        </>
                    ) : (
                        <Typography id="modal-modal-error" variant="h6" component="h2">
                            Error
                        </Typography>
                    )}
                </Box>
            </Modal>
        </div>
    );
}