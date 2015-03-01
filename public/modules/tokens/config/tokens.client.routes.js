'use strict';

// Setting up route
angular.module('tokens').config(['$stateProvider',
	function($stateProvider) {
		// Tokens state routing
		$stateProvider.
		state('listTokens', {
			url: '/tokens',
			templateUrl: 'modules/tokens/views/list-tokens.client.view.html'
		}).
		state('createToken', {
			url: '/tokens/create',
			templateUrl: 'modules/tokens/views/create-token.client.view.html'
		}).
		state('viewToken', {
			url: '/tokens/:tokenId',
			templateUrl: 'modules/tokens/views/view-token.client.view.html'
		}).
		state('editToken', {
			url: '/tokens/:tokenId/edit',
			templateUrl: 'modules/tokens/views/edit-token.client.view.html'
		});
	}
]);
