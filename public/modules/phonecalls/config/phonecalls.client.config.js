'use strict';

// Configuring the Phonecalls module
angular.module('phonecalls').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Phonecalls', 'phonecalls', 'dropdown', '/phonecalls(/create)?', true);
		//Menus.addSubMenuItem('topbar', 'phonecalls', 'List Phonecalls', 'phonecalls');
		Menus.addSubMenuItem('topbar', 'phonecalls', 'New Phonecall', 'phonecalls/create');
	}
]);
