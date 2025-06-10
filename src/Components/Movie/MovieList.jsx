import React, { useRef }from "react"
import styles from './Movie.module.css'
import MovieItem from "./MovieItem"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";


const MovieList = ({ movies }) => {
    const container = useRef(null);
    function scrollRight() {
        const containerElement = container.current;
        if (containerElement) {
            containerElement.scrollBy({
                left:  550,
                behavior: 'smooth'
            });
        }
    }
    function scrollLeft() {
        const containerElement = container.current;
        if (containerElement) {
            containerElement.scrollBy({
                left: -550,
                behavior: 'smooth'
            });
        }
    }
    return (
        <div>
            <div>
                <h2 className={styles['title']}>Ongoing Movies</h2>
            </div>
            <div className={styles['movie-list-container']}>
                <div className={styles['arrow']} onClick={scrollLeft}><FontAwesomeIcon icon={faArrowLeft} /></div>
                <div ref={container} className={styles['movie-list']}>
                    {movies ? movies.map((movie, index) => (
                        <MovieItem key={index} movie={movie} />
                    ) ) : (
                        <div className={styles['no-movies']}>
                            <p>No movies available</p>
                        </div>
                    )}

                </div>
                <div className={styles['arrow']}  onClick={scrollRight}><FontAwesomeIcon icon={faArrowRight} /></div>
            </div>
        </div>
    )
}
export default MovieList