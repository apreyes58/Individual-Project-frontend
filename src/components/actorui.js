import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useState, useEffect } from 'react';
import "../App.css";


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    height: 180,
    bgcolor: '#808080',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function BasicModalActor({ actor_id, actors }) {
    const [chosen, setChosen] = useState();
    useEffect(() => {
        if (Array.isArray(actors) && actors.length > 0) {
            const found = actors.find((actor) => actor.actor_id === actor_id);
            setChosen(found);
        }
    }, [actor_id, actors]);

    console.log(actors)

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <Button onClick={handleOpen} className='detail'>Show details</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="actor-first_name"
                aria-describedby="actor-details"
            >
                <Box sx={style}>
                    {chosen ? (
                        <>
                            <Typography id="modal-modal-name" variant="h5" component="h2">
                                {chosen.first_name} {chosen.last_name}
                            </Typography>
                            <Typography id="modal-modal-actor_id" sx={{ mt: 2 }}>
                                Actor's ID: {chosen.actor_id}
                            </Typography>
                            <Typography id="modal-modal-moviecount" sx={{ mt: 2 }}>
                                Total Movies: {chosen.movies}
                            </Typography>
                            <Typography id="modal-modal-top5" sx={{ mt: 2 }}>
                                Top Movies: {chosen.top_movies.join(', ')}
                            </Typography>
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