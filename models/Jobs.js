var mongoose = require('mongoose');

var JobSchema = new mongoose.Schema({
    jobTitle: String,
    company: String,
    location: String,
    jobType: String,
    jobDescription: String,
    salary: String,
    apply: String

});


mongoose.model('Job',JobSchema);
