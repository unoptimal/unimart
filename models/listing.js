const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: String,
    description: String,
    contact: String
});

module.exports = mongoose.model('Listing', listingSchema)