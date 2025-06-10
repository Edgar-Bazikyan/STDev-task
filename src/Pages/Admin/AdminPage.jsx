import React, { useState } from 'react';
import styles from './Admin.module.css'
import MovieForm from '../../Components/MovieForm/MovieForm';
import RoomForm from '../../Components/RoomForm/RoomForm';
const AdminPage = () => {
  const [option, setOption] = useState('Movies')
  return (
   <div className={styles['admin']}>
    <div className={styles['menu']}>
      <div className={option === 'Movies' ? `${styles['menu-item']} ${styles['active']}` : styles['menu-item']}  onClick={() => setOption('Movies')}>
        Movies
      </div>
      <div  className={option === 'Rooms' ? `${styles['menu-item']} ${styles['active']}` : styles['menu-item']} onClick={() => setOption('Rooms')}>
        Rooms
      </div>
    </div>
     
    {option === 'Movies' ? <MovieForm /> : <RoomForm />   }
     
   </div>
  );
};

export default AdminPage;
