import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Main from "./Main";
import MainPage from "../Pages/MainPage";
import MoviePage from "../Pages/MoviePage";
import RoomPage from "../Pages/RoomPage";
import AdminPage from "../Pages/Admin/AdminPage";
import AllMovies from "../Pages/AllMovies";
import AllRooms from "../Pages/AllRooms";
const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Main />}>
                    <Route index element={<MainPage />} />
                    <Route path='movies/:id' element={<MoviePage />} />
                    <Route path='rooms/:id' element={<RoomPage />} />
                    <Route path='*' element={<h1>Page Not Found</h1>} />
                    <Route path='admin' element={<AdminPage />} />
                    <Route path="movies" element={<AllMovies />} />
                    <Route path="rooms" element={<AllRooms />} />
                    <Route path="admin" element={<AdminPage />} />
                </Route>
            </Routes>
        </Router>
    )
}

export default AppRoutes