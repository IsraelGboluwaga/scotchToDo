var scotchToDo = angular.module('scotchToDo', []);

function mainController($scope, $http) {
    $scope.formData = {};

    //When landing on the page, display todos
    $http.get('/api/todos')
        .success(function (data) {
            $scope.todos = data;
            console.log(data);
        })
        .error(function (data) {
            console.log('Error: ' + data);
        });

    //When submitting the form, send to the API
    $scope.createTodo = function (data) {
        $http.post('/api/todos', $scope.formData)
            .success(function (data) {
                //clear form so user can enter something new
                $scope.formData = {};
                $scope.todos = data;
                console.log(data);
            })
            .error(function (data) {
                console.log('Error: ' + data);
            })
    };

    $scope.deleteTodo = function (id) {
        $http.remove('/api/todos' + id)
            .success(function (data) {
                $scope.todos = data;
                console.log(data);
            })
            .error( function (data) {
                console.log('Error: ' + data);
            });
    }
}