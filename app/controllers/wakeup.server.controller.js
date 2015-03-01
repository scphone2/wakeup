'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors'),
	Token = mongoose.model('Token'),
	_ = require('lodash');

/**
 * Create a token
 */
exports.create = function(req, res) {
//	console.log (req);
	var account = req.query.account;
	Token.find({account: account}).exec(function(err, tokens) {
		if ((!tokens) || (tokens.length === 0)) return res.status(404).send({ message: 'Failed to find account ' + account});
		var token = tokens[0];
		return res.status(200).send({ message: 'sending wakeup to device: ' + token.device});
	});
};

/**
 * Show the current token
 */
exports.read = function(req, res) {
	res.jsonp(req.token);
};

/**
 * Update a token
 */
exports.update = function(req, res) {
	var token = req.token;

	token = _.extend(token, req.body);

	token.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(token);
		}
	});
};

/**
 * Delete a token
 */
exports.delete = function(req, res) {
	var token = req.token;

	token.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(token);
		}
	});
};

/**
 * List of Tokens
 */
exports.list = function(req, res) {
	Token.find().sort('-created').exec(function(err, tokens) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(tokens);
		}
	});
};

/**
 * Token middleware
 */
exports.tokenByID = function(req, res, next, id) {
	Token.findById(id).exec(function(err, token) {
		if (err) return next(err);
		if (!token) return next(new Error('Failed to load token ' + id));
		req.token = token;
		next();
	});
};

/**
 * Token authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.token.user.id !== req.user.id) {
		return res.status(403).send({
			message: 'User is not authorized'
		});
	}
	next();
};
