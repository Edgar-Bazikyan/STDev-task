const movieSchema = require('../Models/movieModel');
const roomSchema = require('../Models/roomModel');


const addMovie = async (req, res) => {
    try {
        const obj  = req.body;
        const imagePath = req.file ? `/Uploads/${req.file.filename}` : '';
        const newMovie = new movieSchema({
            name: obj.name,
            image: imagePath,
            cast: obj.cast,
            genere: obj.genere,
            duration: obj.duration,
            description: obj.description
        });
        await newMovie.save();
        res.status(200).json({ message: 'Movie added successfully', movie: newMovie });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error adding movie' });
    }
}


const getAllMovies = async (req, res) => {
    try {
        const movies = await movieSchema.find();
        res.status(200).json(movies);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching movies' });
    }
}
const getOneMovie = async (req, res) => {
    try {
        const { id } = req.params;
        const movie = await movieSchema.findById(id);
        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }
        res.status(200).json(movie);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching movie' });
    }
}
const updateMovie = async (req, res) => {
    try {
        const { id } = req.params;
        const obj = req.body;
        const imagePath = req.file ? `/Uploads/${req.file.filename}` : '';
        const updatedMovie = await movieSchema.findByIdAndUpdate(id, {
            name: obj.name,
            image: imagePath,
            cast: obj.cast,
            genere: obj.genere,
            duration: obj.duration,
            description: obj.description
        }, { new: true });
        
        if (!updatedMovie) {
            return res.status(404).json({ message: 'Movie not found' });
        }
        res.status(200).json({ message: 'Movie updated successfully', movie: updatedMovie });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating movie' });
    }
}
const deleteMovie = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedMovie = await movieSchema.findByIdAndDelete(id);
        if (!deletedMovie) {
            return res.status(404).json({ message: 'Movie not found' });
        }
        res.status(200).json({ message: 'Movie deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting movie' });
    }
}

const addRoom = async (req, res) => {
    try {
        const obj = req.body;
        const imagePath = req.file ? `/Uploads/${req.file.filename}` : '';
        const newRoom = new roomSchema({
            name: obj.name,
            image: imagePath,
            row: obj.row,
            col: obj.col,
        });
        await newRoom.save();
        res.status(200).json({ message: 'Room added successfully', room: newRoom });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error adding room' });
    }
}

const getAllRooms = async (req, res) => {
    try {
        const rooms = await roomSchema.find();
        res.status(200).json(rooms);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching rooms' });
    }
}
const getOneRoom = async (req, res) => {
    try{
        const {id} = req.params
        const room = await roomSchema.findById(id);
        if (!room) {
            return res.status(404).json({ message: 'Room not found' });
        }
        room.movies = room.movies.filter(movie => movie.startTime > new Date());
        await room.save()
        res.status(200).json(room);
    }catch(error){
        console.error(error);
        res.status(500).json({ message: 'Error fetching room' });
    }
}

const addMovieToRoom = async (req, res) => {
    try {
        const  movies  = req.body;
        const  {id} = req.params;

        const room = await roomSchema.updateOne({ _id: id }, { $push: { movies: movies } });
        if(!room) {
            
            return res.status(404).json({ message: 'Room not found' });
        }
        res.status(200).json({ message: 'Movie added to room successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error adding movie to room' });
    }
}
const updateRoomSeats = async (req, res) => {
    try {
        const { id } = req.params;
        const  {seats, time} = req.body;
        const updatedRoom = await roomSchema.findByIdAndUpdate(
                { _id: id },
                { $set: { "movies.$[m].seats": seats } },
                { arrayFilters: [ { "m.time": time } ] }
        );
        if (!updatedRoom) {
            return res.status(404).json({ message: 'Room not found' });
        }
        res.status(200).json({ message: 'Room seats updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating room seats' });
    }
}
const deleteRoom = async (req, res) =>{
    try {
        const { id } = req.params;
        const deletedRoom = await roomSchema.findByIdAndDelete(id);
        if (!deletedRoom) {
            return res.status(404).json({ message: 'Room not found' });
        }
        res.status(200).json({ message: 'Room deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting Room' });
    }
}

const deleteMovieFromRoom = async (req, res) => {
    try{
        const { id, index } = req.params;
        const room = await roomSchema.findById(id)
        const cleanedArray = room.movies.splice(index, 1)
        const updatedRoom = await roomSchema.findByIdAndUpdate({_id: id}, {
            ...room,
            movies: cleanedArray
           
        })
        if(!updatedRoom){
             return res.status(404).json({ message: 'Room not found' });
        }
        res.status(200).json({ message: 'Movie deleted successfully' });
    }catch(error){
        console.error(error);
        res.status(500).json({ message: 'Error deleting Movie' });
    }
}

module.exports = {addMovie, getAllMovies, getOneMovie, updateMovie, deleteMovie, addRoom, getAllRooms, getOneRoom, addMovieToRoom, updateRoomSeats, deleteRoom, deleteMovieFromRoom};