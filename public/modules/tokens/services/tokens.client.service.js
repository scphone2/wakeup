'use strict';

//Tokens service used for communicating with the tokens REST endpoints
angular.module('tokens').factory('Tokens', ['$resource',
	function($resource) {
		return $resource('tokens/:tokenId', {
			tokenId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
