import React, {useState, useEffect} from "react"
import styles from './Movie.module.css'
import axios from "axios"
import { useParams } from "react-router-dom"

const MoviePage = () => {
    
    const { id } = useParams();
    const [movie, setMovie] = useState({});
    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/movies/${id}`);
                setMovie(response.data);
            } catch (error) {
                console.error("Error fetching movie:", error);
            }
        })()
    }, [id])
    return (
        <div className={styles['movie-item']}>
            <img src={`http://localhost:5000${movie.image}`} alt={movie.name} className={styles['movie-image']} />
            <div className={styles['movie-info']}>
            <h2 className={styles['movie-title']}>{movie.name}</h2>
                <div className={styles['movie-details-container']}>
                    <div className={styles['movie-details-labels']}>
                        <p>Cast</p>
                        <p>Genre</p>
                        <p>Duration</p>
                        <p>Description</p>
                    </div>
                    <div className={styles['movie-details']}>
                        <p>{movie.cast}</p>
                        <p>{movie.genere}</p>
                        <p>{movie.duration}</p>
                        <p className={styles['movie-description']}>{movie.description}</p>
                    </div>
                    </div>
                </div>
        </div>
    )
}

export default MoviePage