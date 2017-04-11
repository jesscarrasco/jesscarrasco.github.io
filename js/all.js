'use strict';

var app = angular.module('lanchinho', [
	'lanchinho.controllers',
	'angularMoment'	
]);


var controllers = angular.module('lanchinho.controllers', []);

controllers.controller('ApplicationController', function ($scope, $rootScope, $http) {});

controllers.controller('LanchinController', function ($scope, $rootScope, $http) {
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

controllers.controller('ReaderController', function ($scope, $rootScope, $http, $interval) {
	$scope.wpm = 300;

	var bigText = 'Why should you bother to learn React? In the recent years single page applications (SPA) got popular. Frameworks like Angular, Ember and Backbone helped JavaScript people to build modern web applications beyond jQuery. The list is not exhaustive. There exists a wide range of SPA frameworks. When you consider the release dates, most of them are among the first generation of SPAs: Angular 2010, Backbone 2010, Ember 2011. '
				+ 'The initial React release was 2013 by Facebook. React is no SPA framework but a view library. It only enables you to render components as view in a browser. But the whole ecosystem around React makes it possible to build single page applications. '
				+ 'But why should you consider to use React over the first generation of SPA frameworks? While the first generation of SPAs tried to solve a lot of things at once, React only helps to build your view layer. It’s a library and not a framework. The idea behind it: Your view is a hierarchy of composable components. '
				+ 'In React you can focus on your view before you introduce more aspects to your application. Every other aspect is another building block for your SPA. These building blocks are essential to build a mature application. They come with two advantages. '
				+ 'First you can learn the building blocks step by step. You don’t have to worry to understand them altogether. It is different to a framework that gives you every building block from the start. The book focuses on React as first building block. More building blocks follow eventually. '
				+ 'Second all building blocks are interchangeable. It makes the ecosystem around React such an innovative place. Multiple solutions are competing with each other. You can pick the most appealing solution for you and your use case. '
				+ 'The first generation of SPA frameworks arrived at an enterprise level. React stays innovative and gets adopted by multiple tech thought leader companies like Airbnb, Netflix and of course Facebook14. All of them invest in the future of React and are content with React and the ecosystem itself. '
				+ 'React is probably one of the best choices for building SPAs nowadays. It only delivers the view layer, but the ecosystem is a whole flexible and interchangeable framework. React has a slim API, an amazing ecosystem and a great community. You can read about my experiences why I moved from Angular to React15. Everyone is keen to experience where it will lead us in 2017. '

	$scope.arrWords = bigText.split(' ');
	$scope.theEnd = $scope.arrWords.length;
	$scope.wordIndex = 0;

	$scope.read = function(){
		var interval = (60000 / $scope.wpm );

		var moveWord = function(){
			if( $scope.wordIndex < $scope.theEnd ){
				$scope.wordIndex++;
			}
		}


		$scope.reading = $interval(moveWord, interval)
	}

	$scope.pause = function(){
		$interval.cancel($scope.reading);
	}
	$scope.stop = function(){
		$scope.wordIndex = 0;
		$scope.pause();
	}
});

