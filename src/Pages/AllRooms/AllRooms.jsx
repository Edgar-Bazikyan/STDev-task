import React, {useEffect, useState} from "react"
import {Link} from "react-router-dom"
import axios from "axios"
import styles from './AllRooms.module.css'
const AllRooms = () => {
    const [rooms, setRooms] = useState([])
    
    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/rooms")
                setRooms(response.data)
            } catch (error) {
                console.error("Error fetching rooms:", error)
            }
        })()
    }, [])
    return (
        <div className={styles["room-list"]}>
            {rooms.map(room => (
                <div className={styles["room-card"]} key={room._id}>
                    <Link to={`/rooms/${room._id}`} className={styles["room-link"]}>
                        <h3>{room.name}</h3>
                        {room.image && <img src={`http://localhost:5000${room.image}`} alt={room.name} />}
                        <p>Row: {room.row}</p>
                        <p>Col: {room.col}</p>
                   </Link>
                </div>
            ))}
        </div>
    )
}

export default AllRooms