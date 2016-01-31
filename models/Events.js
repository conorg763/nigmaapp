var mongoose = require('mongoose');

var EventSchema = new mongoose.Schema({
    title: String,
    description: String,
    venue: String,
    address: String,
    town: String,
    county: String,
    postcode: String,
    startsAt: String,
    endsAt: String,
    website: String,
    email: String,
    phone: String

});


mongoose.model('Event',EventSchema);