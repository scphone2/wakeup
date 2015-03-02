'use strict';

// Configuring the Tokens module
angular.module('tokens').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Tokens', 'tokens', 'dropdown', '/tokens(/create)?', true);
		Menus.addSubMenuItem('topbar', 'tokens', 'List Tokens', 'tokens');
		Menus.addSubMenuItem('topbar', 'tokens', 'New Token', 'tokens/create');
	}
]);
