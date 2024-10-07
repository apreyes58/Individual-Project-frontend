import { useState, useEffect } from 'react';
import "../App.css";
import BasicModal from '../components/filmui';
import Pagination from "../components/pagination";

function Films() {
	const [films, setFilms] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [searchTerm, setSearchTerm] = useState("");
	const pagelength = 12;

	useEffect(() => {
		fetch('http://localhost:8080/api/films/movies')
			.then(response => response.json())
			.then(data => setFilms(data));
	}, []);

	console.log(films);

	const lastFilm = currentPage * pagelength;
	const firstFilm = lastFilm - pagelength;

	const filteredData = films.filter((item) => {
		const title = item.title.toLowerCase().includes(searchTerm.toLowerCase());
		const cat = item.category.toLowerCase().includes(searchTerm.toLowerCase());
		const actors = item.actors.some(actor => actor.toLowerCase().includes(searchTerm.toLowerCase()));
		return title || cat || actors;
	});

	const currentFilms = filteredData.slice(firstFilm, lastFilm);
	const totalPages = Math.ceil(filteredData.length / pagelength);

	const onPageChange = (page) => {
		setCurrentPage(page);
	};

	return (
		<div>
			<h1>Search for Films</h1>
			<input
				type="text"
				placeholder="Search by title, actor or category"
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
				style={{ width: "193px" }}/>
			<div className="page-grid header-film">
				<div>Title</div>
				<div>Category</div>
				<div>Actors</div>
				<div>Details</div>
			</div>
			{/* <ul>
				{filteredData.map(item => (
					<li key={item.filmId}>
						<strong>{item.title}</strong> - {item.category}
						<BasicModal film_id={item.film_id} films={films} />
					</li>
				))}
			</ul> */}
			<div>
				{
					currentFilms.map((film) =>
						<div className="page-grid film" key={film.film_id}>
							<div>{film.title}</div>
							<div>{film.category}</div>
							<div>{film.actors.join(', ')}</div>
							<div><BasicModal film_id={film.film_id} films={films} /></div>
						</div>
					)
				}
			</div>

			<Pagination
				currentPage={currentPage}
				totalPages={totalPages}
				onPageChange={onPageChange}
			/>
		</div>
	);
}

export default Films;
