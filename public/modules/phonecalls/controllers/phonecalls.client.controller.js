'use strict';

angular.module('phonecalls').controller('PhonecallsController', ['$scope', '$http', '$stateParams', '$location', 'Phonecalls',
	function($scope, $http, $stateParams, $location, Phonecalls) {

		$scope.create = function() {
			$scope.success = $scope.error = null;
			var callDetails = {'from': this.from, 'media': this.media};

			$http.post('/phonecalls/'+this.account, callDetails).success(function(response) {
				$location.path('phonecalls/' + response._id);
				$scope.from = '';
				$scope.media = '';
				$scope.account = '';
			}).error(function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
			
		};

		$scope.remove = function(phonecall) {
			if (phonecall) {
				phonecall.$remove();

				for (var i in $scope.phonecalls) {
					if ($scope.phonecalls[i] === phonecall) {
						$scope.phonecalls.splice(i, 1);
					}
				}
			} else {
				$scope.phonecall.$remove(function() {
					$location.path('phonecalls');
				});
			}
		};

		$scope.update = function() {
			var phonecall = $scope.phonecall;

			phonecall.$update(function() {
				$location.path('phonecalls/' + phonecall._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.find = function() {
			$scope.phonecalls = Phonecalls.query();
		};

		$scope.findOne = function() {
			$scope.phonecall = Phonecalls.get({
				phonecallId: $stateParams.phonecallId
			});
		};
	}
]);
