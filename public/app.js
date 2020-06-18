// Application Modules and Routing
angular
    .module('newApp', ['ngRoute'])
    .config(function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html'
            })
            .when('/apple', {
                templateUrl: 'views/apple.html',
                controller: 'appleCtrl'
            })
            .when('/lettuce', {
                templateUrl: 'views/lettuce.html',
                controller: 'lettuceCtrl'
            });
    });