'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors'),
	apn = require('apn'),
	apnConnection = new apn.Connection({production: true}),
	Phonecall = mongoose.model('Phonecall'),
	Token = mongoose.model('Token'),
	_ = require('lodash');

/**
 * Create a phonecall /phonecalls/:account
 */
exports.create = function(req, res) {
	var account = req.params.account;
	Token.find({account: account}).exec(function(err, tokens) {
		if ((!tokens) || (tokens.length === 0)) {
			return res.status(404).send({ message: 'No devices for account: ' + account});
		}
		tokens.forEach(function(token, index, array) {
			// insert a Phonecall with this token
			var phonecall = new Phonecall(req.body);
			phonecall.token = token;
			phonecall.save(function(err) {
				if (err) {
					var errMsg = errorHandler.getErrorMessage(err);
					return res.status(400).send({message: errMsg});
				}
				else {
					Phonecall.find({'token':token._id}).count().exec(function(err,badgeCount) {
						console.log('submit request to APNS for: ' + token.device);
						console.log('badge count will be: ' + badgeCount);
						var myDevice = new apn.Device(token.device);
						var note = new apn.Notification();
						note.expiry = Math.floor(Date.now() / 1000) + 360000; //100 hrs
						note.badge = badgeCount;
						note.sound = 'v120.caf';
						//note.alert.actions = [{'id': 'kCloseAction', 'title': 'Ignore'},
//							{'id': 'kViewAction', 'title': 'Display'}];
						if (badgeCount === 1) {
							note.alert= 'You missed a call';
						} else {
							note.alert= 'You missed ' + badgeCount + ' calls';
						}
						note.payload = {'missedCalls': badgeCount};
						apnConnection.pushNotification(note, myDevice);
					});
				}
			}); // .save
		}); // .forEach
		
		return res.status(200).send({ message: 'Sent wakeup to devices for: ' + account});
	}); // .find
}; // .create

/**
 * Show the phonecalls for a device /phonecalls/:device
 */
exports.read = function(req, res) {
	var device = req.params.device;
	Token.findOne({device: device}).exec(function(err, targetDevice) {
		if (err) {
			var errMsg = errorHandler.getErrorMessage(err);
			return res.status(400).send({message: errMsg});
		}
		else {
			Phonecall.find({token: targetDevice}).exec(function(err, phonecalls) {
				res.jsonp(phonecalls);
			}); // .find
		}
	});
}; // .read

/**
 * Delete some phonecalls for a device/:device/:numCalls
 */
exports.delete = function(req, res) {
	var device = req.params.device,
		numRemoved = 0,
		numCalls = req.params.numCalls;

	Token.findOne({device: device}).exec(function(err, targetDevice) {
		if (err) {
			var errMsg = errorHandler.getErrorMessage(err);
			return res.status(400).send({message: errMsg, removed: numRemoved});
		}
		else {
			Phonecall.find({token: targetDevice}).exec(function(err, phonecalls) {
				phonecalls.forEach(function(phonecall, index, list) {
					if (index < numCalls) {
						phonecall.remove(function(err) {
							if (!err) {
								numRemoved++;
							}
						});
					}
				});
			}); // .find
			return res.status(200).send({message: 'Ok', removed: numRemoved});
		} // else
	}); // .findOne
};
