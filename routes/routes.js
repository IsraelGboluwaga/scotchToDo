var path = require('path');
var Todo = require('../models/todo');
var express = require('express');
var router = express.Router();
var getTodo = require('../utils/helper');

//Get all todos
router.get('/api/todos', function (req, res) {
    getTodo(res);
});

//Create todo_, send it back after creation
router.post('/api/todos', function (req, res) {

    // create a todo_, information comes from AJAX request from Angular
    Todo.create({
        text: req.body.text,
        done: false
    }, function (err, todo) {
        if (err)
            res.send(err);

        //Get and return todos after creating another
        getTodo(res);
    })
});

//Delete a todo_ =>and then return after deleting
router.delete('/api/todos/:todo_id', function (req, res) {
    Todo.remove({
        _id: req.params.todo_id
    }, function (err, todo) {
        if (err)
            res.send(err);

        getTodo(res);
    });
});

router.get('*', function (req, res) {
    //load the page that angular will handle on the frontend
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

module.exports = router;