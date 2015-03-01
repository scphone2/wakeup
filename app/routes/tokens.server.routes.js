'use strict';

/**
 * Module dependencies.
 */
var tokens = require('../../app/controllers/tokens');

module.exports = function(app) {
	// Token Routes
	app.route('/tokens')
		.get(tokens.list)
		.post(tokens.create);

	app.route('/tokens/:tokenId')
		.get(tokens.read)
		.put(tokens.update)
		.delete(tokens.delete);

	// Finish by binding the token middleware
	app.param('tokenId', tokens.tokenByID);
};
