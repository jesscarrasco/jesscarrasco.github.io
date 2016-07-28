'use strict';

var app = angular.module('lanchinho', [
	'lanchinho.controllers',
	'angularMoment'	
]);


var controllers = angular.module('lanchinho.controllers', []);

controllers.controller('ApplicationController', function ($scope, $rootScope, $http) {
	$scope.hour = moment().hour();
	$scope.minutes = moment().minutes();
	$scope.isIt = ($scope.hour == 12) || ($scope.hour == 16);

	if( $scope.isIt ){
		var query = 'food';
	} else {
		var query = 'crying';
	}

	$http.get('//api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag='+query).then(function( data ){
		$scope.gif = data.data.data.image_original_url;
	}, function(){console.log('err')});
});