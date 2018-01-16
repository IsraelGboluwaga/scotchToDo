var Todo = require('../models/todo');

var getToDo = function (res) {
    Todo.find(function (err, todos) {
        if (err)
            res.send(err);

        res.json(todos);
    });
};

module.exports = getToDo;