import React, {useState, useEffect} from "react"
import Slideshow from "../Components/Slideshow/Slideshow"
import MovieList from "../Components/Movie/MovieList"
import RoomList from "../Components/Room/RoomList"
import axios from "axios"

const MainPage = () => {
   const [movies, setMovies] = useState([])
   const [rooms, setRooms] = useState([])

   useEffect(() => {
       (async () => {
           try {
               const response = await axios.get("http://localhost:5000/api/movies")
               setMovies(response.data)
           } catch (error) {
               console.error("Error fetching movies:", error)
           }
       })()
   }, [])

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
        <div>
            <Slideshow />
            <MovieList movies={movies} />
            <RoomList rooms={rooms} />
        </div>
    )
}

export default MainPage