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
	height: 275,
	bgcolor: '#808080',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
};

export default function BasicModalFilm({ film_id, films }) {
	const [chosen, setChosen] = useState();
	useEffect(() => {
		if (Array.isArray(films) && films.length > 0) {
			const found = films.find((film) => film.film_id === film_id);
			setChosen(found);
		}
	}, [film_id, films]);

	console.log(films)

	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	return (
		<div>
			<Button onClick={handleOpen} className='detail'>Show details</Button>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="film-title"
				aria-describedby="film-description"
			>
				<Box sx={style}>
					{chosen ? (
						<>
							<Typography id="modal-modal-title" variant="h5" component="h2">
								{chosen.title}
							</Typography>
							<Typography id="modal-modal-category" sx={{ mt: 2 }}>
								Category: {chosen.category}
							</Typography>
							<Typography id="modal-modal-description" sx={{ mt: 2 }}>
								Description: {chosen.description}
							</Typography>
							<Typography id="modal-modal-rating" sx={{ mt: 2 }}>
								Rating: {chosen.rating}
							</Typography>
							<Typography id="modal-modal-length" sx={{ mt: 2 }}>
								Length: {chosen.length}
							</Typography>
							<Typography id="modal-modal-rented" sx={{ mt: 2 }}>
								Rented: {chosen.rented}
							</Typography>
						</>
					) : (
						<Typography id="modal-modal-title" variant="h6" component="h2">
							Error
						</Typography>
					)}
				</Box>
			</Modal>
		</div>
	);
}