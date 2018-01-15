var express = require('express');
var app = express();
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

mongoose.connect('127.0.0.1:27017/scotch-todo');

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride());

//Defining the model
var Todo = mongoose.model('Todo', {
    text: String
});


//app routes

//Get all todos
app.get('/api/todos', function (req, res) {
   Todo.find(function (err, todos) {
       if (err)
           res.send(err);

       res.json(todos);
   });
});

//Create todo_, send it back after creation
app.post('/api/todos', function (req, res) {

    // create a todo_, information comes from AJAX request from Angular
    Todo.create({
        text: req.body.text,
        done: false
    }, function (err, todo) {
        if (err)
            res.send(err);

        //Get and return todos after creating another

        Todo.find(function (err, todos) {
            if (err)
                res.send(err);

            Todo.json(todos);
        });
    })
});

//Delete a todo_ =>and then return after deleting
app.delete('/api/todos/:todo_id', function (req, res) {
    Todo.remove({
        _id: req.params.todo_id
    }, function (err, todo) {
        if (err)
            res.send(err);

        Todo.find(function (err, todos) {
            if (err)
                res.send(err);

            res.json(todos);
        })
    });
});

app.listen('5000');
console.log('App listening on port 5000');