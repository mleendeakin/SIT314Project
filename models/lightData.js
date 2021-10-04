const mongoose = require('mongoose');

module.exports = mongoose.model('LightData', new mongoose.Schema({
    levelID: Number,
    roomID: Number,
    lightStatus: Boolean,
    time: Date,
}))