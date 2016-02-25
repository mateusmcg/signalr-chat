'use strict';

var app = angular.module('chatApp', ['ngRoute']);

app.constant('signalrServerUrl', 'http://signalrserver.apphb.com/signalr');

app.config(['$routeProvider', function ($routeProvider) {
    console.debug('Starting app.config');

    $routeProvider.when('/chat', {
        templateUrl: 'app/features/chat/chat.html',
        controller: 'ChatController'
    }).when('/maps', {
        templateUrl: 'app/features/maps/maps.html',
        controller: 'MapsController'
    })
}]);

app.run(['$log', function ($log) {
    $log.debug('Starting app.run!');
}]);