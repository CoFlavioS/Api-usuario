'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BookSchema = new Schema({
	bookName: { type: String, unique: true, require: true},
	authorName: { type: String, require: true},
	editorial: { type: String, require: true},
  category: {type: String, enum: ['aventura', 'fantasia', 'misterio', 'infantil', 'ciencia ficcion', 'romantica'], require: true},
	ISBN: { type: String, require: true}
})


module.exports = mongoose.model('Book', BookSchema)