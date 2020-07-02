const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Aquí el esquema
const coasterSchema = new Schema({
    name: String,
    description: String,
    inversions: Number,
    length: Number,
    active: {type: Boolean,
            default: false},
    park: {type: Schema.Types.ObjectId, ref: 'Park'}
}, {
    timestamps: true
})

const Coaster = mongoose.model('Coaster', coasterSchema)

module.exports = Coaster
