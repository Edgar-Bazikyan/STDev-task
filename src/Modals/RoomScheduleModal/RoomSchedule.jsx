import React, {useState, useEffect} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import styles from './RoomSchedule.module.css'
import tableStyles from '../RoomModal/RoomModal.module.css'
import axios from 'axios'

const RoomSchedule = ({id, setScheduleOpen}) => {
    const [room , setRoom] = useState([])
    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/rooms/${id}`);
                setRoom(response.data);
            } catch (error) {
                console.error("Error fetching room:", error);
            }
        })()
    }, [])
    const deleteHandler = async (index) => {
        try{
            const deleteMovie = await axios.delete(`http://localhost:5000/api/rooms/movie-from-room/${id}/${index}`);
             if (deleteMovie.status === 200) {
                alert('Movie deleted successfully')
                setScheduleOpen(false)
            }
        }catch(error){
             console.log('Error deleting Movie:', error)
        }
    }
    return (
        <div className={styles['box']} onClick={() => setScheduleOpen(false)}>
            <div className={styles['modal']} onClick={(e) => e.stopPropagation()}>
                        <h2 className={styles['title']}>Schedule</h2>

                    <div className={tableStyles['table-container']}>
                        <table className={tableStyles['table']}>
                            <thead>
                                <tr>
                                    <th>Movie Name</th>
                                    <th>Time</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {room.movies && room.movies.map((item, index) => {
                                    return(
                                        <tr key={index}>
                                            <td>{item.movieName}</td>
                                            <td>{item.time}</td>
                                            <td className={styles['btn-container']}><button onClick={() => deleteHandler(index)} className={styles['delete-btn']}><FontAwesomeIcon icon={faXmark} className={styles['icon']}/></button></td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
    )
}

export default RoomSchedule