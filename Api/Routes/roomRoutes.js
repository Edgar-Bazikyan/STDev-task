const express = require('express');
const router = express.Router();
const multer = require('multer');
const {addRoom, getAllRooms, getOneRoom, addMovieToRoom, updateRoomSeats, deleteRoom, deleteMovieFromRoom} = require('../Controllers/adminController');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});

const upload = multer({ storage });

router.post('/', upload.single('image'), addRoom)
router.get('/', getAllRooms)
router.get('/:id', getOneRoom)
router.post('/:id', addMovieToRoom)
router.patch('/:id', updateRoomSeats)
router.delete('/:id', deleteRoom)
router.delete('/movie-from-room/:id/:index', deleteMovieFromRoom)

module.exports = router;
