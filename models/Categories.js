var mongoose = require('mongoose');

var CategorySchema = new mongoose.Schema({
    categoryName: {type: String, required:true},
    post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' }

});


mongoose.model('Category',CategorySchema);
