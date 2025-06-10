const express = require('express');
const router = express.Router();
const multer = require('multer');
const { addMovie, getAllMovies, getOneMovie, deleteMovie, updateMovie } = require('../Controllers/adminController');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});

const upload = multer({ storage });

router.post('/', upload.single('image'), addMovie);
router.get('/', getAllMovies);
router.get('/:id', getOneMovie);
router.delete('/:id', deleteMovie)
router.put('/:id', upload.single('image'), updateMovie)

module.exports = router;
