import React, {useState, useEffect} from 'react'
import styles from './MovieForm.module.css'
import AddMovieForm from './AddMovieForm'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
const MovieForm = () => {
    const [movies, setMovies] = useState([])
    const [title, setTitle] = useState('Add Movie')
    const [currentMovie, setCurrentMovie] = useState()
    useEffect(() => {
        (async () => {
            const response = await axios.get('http://localhost:5000/api/movies')
            setMovies(response.data)
        })()
    }, [])
    const deleteHandler = async (item) => {
        try{
            const deletedMovie = await axios.delete(`http://localhost:5000/api/movies/${item._id}`)
            if (deletedMovie.status === 200) {
                alert('Movie deleted successfully')
            }
        }catch(error){
            console.log('Error deleting movie:', error)
        }
    }
    return (
        <div className={styles['box']}>
        <AddMovieForm title={title} movie={currentMovie} setTitle={setTitle} />
        <div className={styles['table-container']}>
            <table className={styles['table']}>
                <thead>
                    <tr>
                        <th>Movie Name</th>
                        <th>Genere</th>
                        <th>Duration</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {movies.map((item, index) => {
                        return(
                            <tr key={index} onClick={() => {setTitle('Update Movie'); setCurrentMovie(item)}}>
                                <td>{item.name}</td>
                                <td className={styles['combination-div']}>
                                    {item.genere}
                                </td>
                                <td>{item.duration}</td>
                                <td className={styles['btn-container']}><button className={styles['delete-btn']} onClick={() => {deleteHandler(item)}}><FontAwesomeIcon icon={faXmark} /></button></td>  
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
        </div>
    )
}
export default MovieForm