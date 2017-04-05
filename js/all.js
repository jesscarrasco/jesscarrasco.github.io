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


controllers.controller('CipherController', function ($scope, $rootScope, $http) {

	$scope.alpha = [
		"A","B","C","D","E","F","G","H","I",
		"J","K","L","M","N","O","P","Q","R",
		"S","T","U","V","W","X","Y","Z"
	]
	$scope.dictionary = {' ':' '};
	$scope.translate = '';


	$scope.translate = function(){
		if( $scope.translateMe.length > 0 ){
			var arr = $scope.translateMe.split('');
			var translated = '';

			angular.forEach(arr, function(letter){
				if( angular.isUndefined($scope.dictionary[letter.toUpperCase()])){
					translated += '_';
				} else {
					translated += $scope.dictionary[letter.toUpperCase()];
				}
			})
			$scope.translated = translated;
		}
	}
});