import React, {useState, useEffect} from 'react'
import styles from '../MovieForm/MovieForm.module.css'
import AddRoomForm from './AddRoomForm'
import RoomModal from '../../Modals/RoomModal/RoomModal'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import RoomSchedule from '../../Modals/RoomScheduleModal/RoomSchedule'

const RoomForm = () => {
    const [rooms, setRooms] = useState([])
    const [isOpen, setOpen] = useState(false)
    const [col, setCol] = useState()
    const [row, setRow] = useState()
    const [id, setId] = useState()
    const [isScheduleOpen, setScheduleOpen] = useState(false)
    useEffect(() => {
        (async () => {
            const response = await axios.get('http://localhost:5000/api/rooms')
            setRooms(response.data)
        })()
    }, [])
     const deleteHandler = async (item) => {
        try{
            const deletedRoom = await axios.delete(`http://localhost:5000/api/rooms/${item._id}`)
            if (deletedRoom.status === 200) {
                alert('Room deleted successfully')
            }
        }catch(error){
            console.log('Error deleting Room:', error)
        }
    }
    return (
        <>
        <div className={styles['box']}>
                <AddRoomForm />
                <div className={styles['table-container']}>
                    <table className={styles['table']}>
                        <thead>
                            <tr>
                                <th>Room Name</th>
                                <th>Rows</th>
                                <th>Colums</th>
                                <th>Schedule</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rooms.map((item, index) => {
                                return(
                                    <tr key={index} onClick={() => {setOpen(true) ; setId(item._id); setCol(item.col); setRow(item.row)} }>
                                        <td>{item.name}</td>
                                        <td>{item.row}</td>
                                        <td>{item.col}</td>
                                        <td className={styles['open-btn-container']}><button className={styles['open-btn']}  onClick={(e) => {e.stopPropagation();setId(item._id); setScheduleOpen(true)}}>Open</button></td>
                                        <td className={styles['btn-container']}><button className={styles['delete-btn']} onClick={(e) => {e.stopPropagation(); deleteHandler(item)}}><FontAwesomeIcon icon={faXmark} /></button></td>  
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
                </div>
                {isOpen ? <RoomModal setOpen={setOpen} id={id} col={col} row={row} /> : ''}
                {isScheduleOpen ? <RoomSchedule id={id} setScheduleOpen={setScheduleOpen} /> : ''}
                </>
            )
    
}
export default RoomForm