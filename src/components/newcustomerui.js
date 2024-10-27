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

export default function BasicModalNewCustomer({ updateList }) {
    const [given, setGiven] = useState([]);

    const getCurrentDateTime = () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    };

    const [cust, setCust] = useState({
        customer_id: '',
        first_name: '',
        last_name: '',
        email: '',
        active: true,
        create_date: getCurrentDateTime(),
        rental_count: 0
    });

    const handleInput = (e) => {
        const { name, value } = e.target;
        let removeSpaces = value.replace(/\s/g, '');
        if (name === "customer_id")
            removeSpaces = removeSpaces.replace(/[^0-9]/g, '');
        setCust((last) => ({
            ...last, [name]: removeSpaces
        }));

        if (name === "customer_id")
            setIdMessage("");
    };
    const [idMessage, setIdMessage] = useState("");

    const addCust = () => {
        if (!cust.customer_id) {
            setIdMessage("Customer ID is required");
            return;
        }
        fetch('http://localhost:8080/api/customers/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(cust),
        })
            .then(response => {
                if (response.status === 409)
                    throw new Error("Customer (ID) already exists!");
                return response.json();
            })
            .then((newCustomer) => {
                setGiven((last) => [...last, newCustomer]);

                setCust({
                    customer_id: '',
                    first_name: '',
                    last_name: '',
                    email: '',
                    active: true,
                    create_date: getCurrentDateTime(),
                    rental_count: 0
                });
                handleClose();
                updateList();
            })
            .catch((error) => {
                setIdMessage(error.message);
            });
    };

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <Button onClick={handleOpen} className='detail'>Add New Customer</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="new-customer"
                aria-describedby="customer-details"
            >
                <Box sx={style}>
                    {given ? (
                        <>
                            <Typography id="modal-modal-name" variant="h5" component="h2">
                                Add new customer
                            </Typography>
                            <Typography id="modal-modal-ID" sx={{ mt: 2 }}>
                                <input
                                    type="text"
                                    name="customer_id"
                                    value={cust.customer_id}
                                    onChange={handleInput}
                                    placeholder="Enter ID"
                                />
                            </Typography>
                            <Typography id="modal-modal-firstname" sx={{ mt: 2 }}>
                                <input
                                    type="text"
                                    name="first_name"
                                    value={cust.first_name}
                                    onChange={handleInput}
                                    placeholder="Enter first name"
                                />
                            </Typography>
                            <Typography id="modal-modal-lastname" sx={{ mt: 2 }}>
                                <input
                                    type="text"
                                    name="last_name"
                                    value={cust.last_name}
                                    onChange={handleInput}
                                    placeholder="Enter last_name"
                                />
                            </Typography>
                            <Typography id="modal-modal-email" sx={{ mt: 2 }}>
                                <input
                                    type="text"
                                    name="email"
                                    value={cust.email}
                                    onChange={handleInput}
                                    placeholder="Enter email"
                                />
                            </Typography>
                            {idMessage && <p style={{ color: 'red' }}>{idMessage}</p>}
                            <Button sx={{ mt: 3 }} variant="contained" onClick={addCust}>Add customer</Button>
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