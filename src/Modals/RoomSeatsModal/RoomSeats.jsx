import React, {useEffect, useState} from 'react';
import styles from './RoomSeats.module.css';
import axios from 'axios';
const RoomSeats = ({id, index, row, setOpen, time}) => {
    const [seats, setSeats] = useState([])
    useEffect(() => {
        (async () => {
            try {
            const response = await axios.get(`http://localhost:5000/api/rooms/${id}`);
                setSeats(response.data.movies[index].seats);
            } catch (error) {
                console.error('Error fetching seats:', error);
            }
        })();
    }, []);
    const bookHandler = (seatIndex) => {
        if (seats[seatIndex] === '1') {
            setSeats(prevSeats => {
                const newSeats = [...prevSeats];
                newSeats[seatIndex] = '0';
                return newSeats;
            });
        } else {
            setSeats(prevSeats => {
                const newSeats = [...prevSeats];
                newSeats[seatIndex] = '1';
                return newSeats;
            });
        }

    };
const submitHandler = async () => {
    
    try{
         
   
            const response = await axios.patch(`http://localhost:5000/api/rooms/${id}`, {seats, time} );
            if (response.status === 200) {
                alert('Seats updated successfully!');
                setOpen(false)
            } else {
                alert('Failed to update seats');
            }
        } catch (error) {
            console.error('Error updating seats:', error);
        }
    };
    return (
        <div className={styles['box']} onClick={() => setOpen(false)}>
            <div className={styles['modal']} onClick={(e) => e.stopPropagation()}>
                <h2 className={styles['title']}>Room Seats</h2>
                <div className={styles['seats-container']}>
                    {seats.map((seat, seatIndex) => (
                        <React.Fragment key={seatIndex}>
                            {seatIndex % row === 0 && seatIndex !== 0 &&  <br />}
                            <span className={`${styles['seat']} ${seat === '1' ? styles['booked'] : ''}`} onClick={() => bookHandler(seatIndex)}>
                            </span>
                        </React.Fragment>
                    ))}
                </div>
            <button className={styles['submit-button']} onClick={submitHandler}>Submit</button>
            </div>
        </div>
  );
}
export default RoomSeats;