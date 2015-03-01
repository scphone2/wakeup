'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Article Schema
 */
var TokenSchema = new Schema({
	created: {
		type: Date,
		default: Date.now
	},
	account: {
		type: String,
		default: '',
		trim: true,
		required: 'Account cannot be blank'
	},
	device: {
		type: String,
		default: '',
		trim: true,
		required: 'Device cannot be blank'
	}
});

mongoose.model('Token', TokenSchema);
