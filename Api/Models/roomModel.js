const {Schema, model} = require('mongoose');

const roomSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    row: {
        type: Number,
        required: true
    },
    col: {
        type: Number,
        required: true
    },
    movies:{
        type: [{
            seats:{ type : [String]},
            movieName: { type: String},
            time: { type: String},
            startTime: {  
                type: Date,
                required: false
            },
        }],
        default: []
    }

})

module.exports = model('roomSchema', roomSchema);