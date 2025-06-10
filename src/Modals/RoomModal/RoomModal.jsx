import React, {useState, useEffect} from 'react'
import styles from './RoomModal.module.css'
import axios from 'axios'
const RoomModal = ({setOpen , id, col, row}) => {
    const [movies, setMovies] = useState([])
    const [selectedMovie, setSelectedMovie] = useState(null)
    const [selectedTime, setSelectedTime] = useState(null)
    useEffect(() => {
        (async () => {
            const response = await axios.get(`http://localhost:5000/api/movies`)
            setMovies(response.data)
        })()
    }, [id])
    const submitHandler = async (e) => {
        e.preventDefault()
        if (!selectedMovie || !selectedTime) {
            alert('Please select a movie and time')
            return
        }
        try {
            function createDate(hoursString, specificDate) {
            const [hours, minutes] = hoursString.split(':').map(Number);
            if (isNaN(hours) || isNaN(minutes)) {
                return null;
            }

            const combinedDate = new Date(
                specificDate.getFullYear(),
                specificDate.getMonth(),
                specificDate.getDate(),
                hours,
                minutes,
                0,
                0
            );
            return combinedDate;
        }
            const startTime = createDate(selectedTime, new Date())
            const num = parseInt(row) * parseInt(col);
            const seats = new Array(num).fill(0);
            const movies = {
                movieName: selectedMovie,
                time: selectedTime,
                seats: seats,
                startTime: startTime
            }
            const response = await axios.post(`http://localhost:5000/api/rooms/${id}`, movies)
            if (response.status === 200) {
                alert('Movie added to room successfully')
                setOpen(false)
            }
        } catch (error) {
            console.error('Error adding movie to room:', error)
        }
    }
    return (
        <div className={styles['box']} onClick={() => setOpen(false)}>
            <div className={styles['modal']} onClick={(e) => e.stopPropagation()}>
                <div className={styles['title']}>Add movies</div>
                <div>Select Movie and Time</div>
                <div>
                    <select onChange={(e) => setSelectedTime(e.target.value)} className={styles['select']}>
                        <option>Select Time</option>
                        <option value="10:00">10:00 </option>
                        <option value="12:00">12:00 </option>
                        <option value="14:00">14:00 </option>
                        <option value="16:00">16:00 </option>
                        <option value="18:00">18:00 </option>
                        <option value="20:00">20:00 </option>
                    </select>
                </div>
                <div className={styles['table-container']}>
                    <table className={styles['table']}>
                        <thead>
                            <tr>
                                <th>Movie Name</th>
                                <th>Genre</th>
                                <th>Duration</th>
                            </tr>
                        </thead>
                        <tbody>
                            {movies.map((movie, index) => {
                                return(
                                    <tr key={index}
                                        onClick={() => setSelectedMovie(movie.name)}
                                        className={movie.name === selectedMovie ? styles['active'] : ''}>
                                        <td>{movie.name}</td>
                                        <td>{movie.genere}</td>
                                        <td>{movie.duration}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
                <div>
                    <button onClick={submitHandler}  className={styles['btn']}>Submit</button>
                </div>
            </div>
        </div>
    )
}
export default RoomModal