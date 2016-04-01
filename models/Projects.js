var mongoose = require('mongoose');

var ProjectSchema = new mongoose.Schema({
    title: String,
    description: String,
    category: String,
    status: String,
    tags: String

});


mongoose.model('Project',ProjectSchema);