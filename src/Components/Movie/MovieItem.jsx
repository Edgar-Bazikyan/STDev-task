import React from 'react'
import styles from './Movie.module.css'
import { Link } from 'react-router-dom'

const MovieItem = ({ movie }) => {
    return (
        <div className={styles['movie-item']}>
                <Link to={`/movies/${movie._id}`} className={styles['movie-link']}>
                <img src={`http://localhost:5000${movie.image}`} alt={movie.name} className={styles['movie-image']} />
                <h3 className={styles['movie-title']}>{movie.name}</h3>
                </Link> 
        </div>
    )
}
export default MovieItem