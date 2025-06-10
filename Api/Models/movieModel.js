const { Schema, model } = require('mongoose');

const movieSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    cast: {
        type: String,
        required: true,
    },
    genere: {
        type: String,
        required: true,
    },
    duration: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    }
});

module.exports = model('movieSchema', movieSchema)

