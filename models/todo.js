var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Defining the model

var Todo = new Schema({
    text: {type: String},
    done: {type: Boolean}
});

module.exports = mongoose.model('Todo', Todo);