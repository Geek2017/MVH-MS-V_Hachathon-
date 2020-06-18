// Application Modules and Routing
angular
    .module('newApp', ['ngRoute'])
    .config(function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: "mainCtrl"
            })
            .when('/apple', {
                templateUrl: 'views/apple.html'
            })
            .when('/lettuce', {
                templateUrl: 'views/lettuce.html'
            });
    });