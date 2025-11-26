const moongose = require('mongoose');
const workerSchema = new moongose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    skills: { type: [String], default: [] },
    number: { type: String, required: true }
}, { timestamps: true })

module.exports = moongose.model('Worker', workerSchema);