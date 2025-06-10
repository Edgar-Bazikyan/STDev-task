import React, {useState, useEffect} from "react"
import { useParams } from "react-router-dom"
import axios from 'axios'
import styles from './Room.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTicket } from '@fortawesome/free-solid-svg-icons'
import RoomSeats from "../../Modals/RoomSeatsModal/RoomSeats"
const RoomPage = () => {
   const { id } = useParams();
       const [room, setRoom] = useState({});
       const [index, setIndex] = useState(0);
       const [isOpen, setOpen] = useState(false);
       const [time, setTime] = useState()
       useEffect(() => {
           (async () => {
               try {
                   const response = await axios.get(`http://localhost:5000/api/rooms/${id}`);
                   setRoom(response.data);
               } catch (error) {
                   console.error("Error fetching room:", error);
               }
           })()
       }, [id])
    return (
        <div className={styles['room-container']}>
        <div className={styles['room-item']}>
            <img src={`http://localhost:5000${room.image}`} alt={room.name} />
            <h1>{room.name}</h1>
            
        </div>
        <div className={styles['movie-schedule']}>

            <h2>Schedule</h2>
            <div className={styles['table-container']}>
                <table className={styles['table-schedule']}>
                    <thead>
                        <tr>
                            <th>Movie Name</th>
                            <th>Time</th>
                            <th>Book</th>
                        </tr>
                    </thead>
                    <tbody>
                        {room.movies && room.movies.map((item, index) => {
                            return(
                                <tr key={index}>
                                    <td>{item.movieName}</td>
                                    <td>{item.time}</td>
                                    <td className={styles['book-button']} onClick={() => { setIndex(index); setOpen(true); setTime(item.time) }}><FontAwesomeIcon icon={faTicket} className={styles['icon']}/></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
            {isOpen ? <RoomSeats id={id} index={index} row={room.row} setOpen={setOpen} time={time} /> : ''}
        </div>
    )
}
export default RoomPage;