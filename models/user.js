'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
	email: { type: String, unique: true, lowercase: true, require: true},
	name: { type: String, require: true},
	password: { type: String, select: false, require: true},
  category: {type: String, enum: ['admin', 'user', 'userPlus'], require: true},
	signupDate: { type: Date, default: Date.now()}
})


module.exports = mongoose.model('User', UserSchema)