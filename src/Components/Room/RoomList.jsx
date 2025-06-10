import React, {useState, useEffect} from "react"
import styles from './Room.module.css'
import RoomItem from "./RoomItem"


const RoomList = ({rooms}) => {
   
    return (
        <div className={styles['room-list']}>
            {rooms.length > 0 ? rooms.map((room, index) => (
                    <RoomItem key={index} room={room} />
            )) : (
                <div className={styles['no-rooms']}>
                    <p>No rooms available</p>
                </div>
            )}
        </div>
    )
}
export default RoomList