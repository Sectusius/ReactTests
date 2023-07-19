import { Section } from '../interfaces/section.interface';
const mongoose = require('mongoose');

const SectionSchema = new mongoose.Schema({
    title: {type: String, required: true},
    content: {type: String, required: false}
})

const sectionModel = mongoose.model('Section', SectionSchema);

module.exports = sectionModel;
