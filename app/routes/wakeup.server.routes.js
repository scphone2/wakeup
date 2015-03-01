'use strict';

/**
 * Module dependencies.
 */
var wakeup = require('../../app/controllers/wakeup');

module.exports = function(app) {
	// Token Routes
	app.route('/wakeup')
		.get(wakeup.create)
		.post(wakeup.create);

	// Finish by binding the token middleware
//	app.param('tokenId', tokens.tokenByID);
};
