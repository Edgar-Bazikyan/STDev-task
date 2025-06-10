import React, {useState, useEffect} from "react"
import axios from "axios"
import styles from "./AllMovies.module.css"
import { Link } from "react-router-dom"

const AllMovies = () => {
    const [movies, setMovies] = useState([])

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/movies")
                setMovies(response.data)
            } catch (error) {
                console.error("Error fetching movies:", error)
            }
        })()
    }, [])
    return (
        <div className={styles["movie-list"]}>
            {movies.map(movie => (
                <div className={styles["movie-card"]} key={movie._id}>
                    <Link to={`/movies/${movie._id}`} className={styles["movie-link"]}>
                        <h3>{movie.name}</h3>
                        {movie.image && <img src={`http://localhost:5000${movie.image}`} alt={movie.name} />}
                        <p>Genre: {movie.genere}</p>
                        <p>Duration: {movie.duration}</p>
                   </Link>
                </div>
            ))}
        </div>
    )
}
export default AllMovies