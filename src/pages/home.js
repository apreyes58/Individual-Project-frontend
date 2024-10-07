import { useState, useEffect } from 'react';
import BasicModal from '../components/filmui.js';
import "../App.css";

function Home() {
    const [films, setFilms] = useState([]);
    const [actors, setActors] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/api/films/top5')
            .then(response => response.json())
            .then(data => setFilms(data));
    }, []);

    useEffect(() => {
        fetch('http://localhost:8080/api/actors/top5')
            .then(response => response.json())
            .then(data => setActors(data));
    }, []);

    return (
        <div className="App">
            <h1>Welcome to the Film Website</h1>
            <div className="content-container">
                <div className="films-section">
                    <h2>Top 5 Films</h2>
                    <ul className='listing'>
                        {films.map(film => (
                            <li className="child" key={film.film_id}>
                                {film.title}
                                <BasicModal film_id={film.film_id} films={films} />
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="actors-section">
                    <h2 className='App-actor'>Top 5 Actors</h2>
                    <ul className='listing'>
                        {actors.map(actor => (
                            <li className="child" key={actor.actor_id}>
                                {actor.first_name} {actor.last_name}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Home;
