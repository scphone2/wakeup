'use strict';

angular.module('tokens').controller('TokensController', ['$scope', '$stateParams', '$location', 'Tokens',
	function($scope, $stateParams, $location, Tokens) {
		$scope.create = function() {
			var token = new Tokens({
				account: this.account,
				device: this.device
			});
			token.$save(function(response) {
				$location.path('tokens/' + response._id);

				$scope.account = '';
				$scope.device = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.remove = function(token) {
			if (token) {
				token.$remove();

				for (var i in $scope.tokens) {
					if ($scope.tokens[i] === token) {
						$scope.tokens.splice(i, 1);
					}
				}
			} else {
				$scope.token.$remove(function() {
					$location.path('tokens');
				});
			}
		};

		$scope.update = function() {
			var token = $scope.token;

			token.$update(function() {
				$location.path('tokens/' + token._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.find = function() {
			$scope.tokens = Tokens.query();
		};

		$scope.findOne = function() {
			$scope.token = Tokens.get({
				tokenId: $stateParams.tokenId
			});
		};
	}
]);
