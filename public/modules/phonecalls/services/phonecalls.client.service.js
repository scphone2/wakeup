'use strict';

//Phonecalls service used for communicating with the phonecalls REST endpoints
angular.module('phonecalls').factory('Phonecalls', ['$resource',
	function($resource) {
		return $resource('phonecalls/:phonecallId', {
			phonecallId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
