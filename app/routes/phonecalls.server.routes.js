'use strict';

/**
 * Module dependencies.
 */
var tokens = require('../../app/controllers/tokens'),
	phonecalls = require('../../app/controllers/phonecalls');

module.exports = function(app) {
	// Phonecall Routes
	app.route('/phonecalls/:device/:numCalls')
		.delete(phonecalls.delete);

	app.route('/phonecalls/:account')
		.post(phonecalls.create);

	app.route('/phonecalls/:device')
		.get(phonecalls.read);

	// Finish by binding the token middleware
	//app.param('tokenId', tokens.tokenByID);
};
