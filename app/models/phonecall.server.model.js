'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Phonecall Schema
 */
var PhonecallSchema = new Schema({
	created: {
		type: Date,
		default: Date.now
	},
	from: {
		type: String,
		default: '',
		trim: true,
		required: 'From cannot be blank'
	},
	media: {
		type: String,
		default: 'audio',
		trim: true,
		enum: ['audio', 'video']
	},
	when: {
		type: Date, 
		default: Date.now
	},
	token: {
		type: Schema.ObjectId,
		ref: 'Token'
	}
});

mongoose.model('Phonecall', PhonecallSchema);
