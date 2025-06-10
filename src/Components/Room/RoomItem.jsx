import React from "react"
import styles from './Room.module.css'
import { Link } from "react-router-dom"

const RoomItem = ({ room }) => {
    return (
        <div className={styles['room-item']}>
            <Link to={`/rooms/${room._id}`} className={styles['room-link']}>
                <img src={`http://localhost:5000${room.image}`} alt={room.name} className={styles['room-image']} />
                <h3 className={styles['room-title']}>{room.name}</h3>
            </Link>
        </div>
    )
}

export default RoomItem