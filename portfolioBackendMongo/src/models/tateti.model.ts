import { TaTeTi } from "../interfaces/tateti.interface";
const mongoose = require('mongoose');

const TaTeTiSchema = new mongoose.Schema({
    winner: {type: String, required: true},
    cantMovements: {type: Number, required: true}
});

const tatetiModel = mongoose.model('TaTeTi', TaTeTiSchema);

module.exports = tatetiModel;