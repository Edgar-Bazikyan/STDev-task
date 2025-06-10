import React from "react"
import styles from './Header.module.css'
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTicket } from '@fortawesome/free-solid-svg-icons'

const Header = () => {
    return (
        <div className={styles['header']}>
            <div className={styles['logo']}>
                <FontAwesomeIcon icon={faTicket} className={styles['icon']}/>
                <Link to={'/'} className={styles['text']}>Cinema City</Link>
            </div>
            <div className={styles['nav']}>
                    <Link to={'/rooms'} className={styles['nav-item']}>Rooms</Link>

                    <Link to={'/movies'} className={styles['nav-item']}>Movies</Link>

                    <Link to={'/admin'} className={styles['nav-item']}>Admin</Link>

            </div>
        </div>
    )
}

export default Header