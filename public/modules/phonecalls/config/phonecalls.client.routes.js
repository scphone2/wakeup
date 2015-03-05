'use strict';

// Setting up route
angular.module('phonecalls').config(['$stateProvider',
	function($stateProvider) {
		// Phonecalls state routing
		$stateProvider.
		state('listPhonecalls', {
			url: '/phonecalls',
			templateUrl: 'modules/phonecalls/views/list-phonecalls.client.view.html'
		}).
		state('createPhonecall', {
			url: '/phonecalls/create',
			templateUrl: 'modules/phonecalls/views/create-phonecall.client.view.html'
		}).
		state('viewPhonecall', {
			url: '/phonecalls/:phonecallId',
			templateUrl: 'modules/phonecalls/views/view-phonecall.client.view.html'
		}).
		state('editPhonecall', {
			url: '/phonecalls/:phonecallId/edit',
			templateUrl: 'modules/phonecalls/views/edit-phonecall.client.view.html'
		});
	}
]);
