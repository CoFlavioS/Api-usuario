'use strict'

const Book = require('../models/book')
const mongoose = require('mongoose')

function getBook (req, res) {
	let bookId = req.params.bookId

	Book.findById(bookId, (err, book) => {
		if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
		if(!book) return res.status(404).send({message: 'El libro no existe'})
	
		res.status(200).send({ book })
	})
}

function getBooks (req, res) {
	Book.find({}, (err, books) => {
		if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
		if (!books) return res.status(404).send({message: 'No existen libros'})
	
		res.status(200).send({books})
	})
}

function saveBook (req, res) {
	console.log('POST /api/book')
	console.log(req.body)

	let book = new Book()
	book.bookName = req.body.bookName
	book.authorName = req.body.authorName
	book.editorial = req.body.editorial
	book.category = req.body.category
	book.ISBN = req.body.ISBN

	book.save((err, bookStored) => {
		if(err) res.status(500).send({message: `Error al salvar la base de datos ${err}`})
		else res.status(200).send({book: bookStored})
	})
}

function updateBook (req, res) {
	let bookId = req.params.bookId
	let update = req.body

	Book.findByIdAndUpdate(bookId, update, (err, bookUpdated) => {
		if(err) res.status(500).send({message: `Error al actualizar el libro: ${err}`})

		res.status(200).send({ book: bookUpdated})
	})
}

function deleteBook (req, res) {
	let bookId = req.params.bookId

	Book.findById(bookId, (err, book) => {
		if(err) res.status(500).send({message: `Error al borrar el libro: ${err}`})
		
		book.remove(err => {
			if(err) res.status(500).send({message: `Error al borrar el libro: ${err}`})
			res.status(200).send({message: 'El libro ha sido eliminado'})
		})
	})
}

function findBookBy (req,res){
	var section = req.params.section;
	var name = req.params.newName;

	if(section=="BookName"){
		Book.findOne({bookName : name}, (err, book) => {
			if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
			if (!book) return res.status(404).send({message: 'No existen libros con ese nombre.'})

			res.status(200).send(book)
		})
	}

	if(section=="Author"){
		Book.find({authorName : name}, (err, books) => {
			if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
			if (!books) return res.status(404).send({message: 'No existen libros de ese autor.'})

			res.status(200).send(books)
		})
	}

	if(section=="Editorial"){
		Book.find({editorial : name}, (err, books) => {
			if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
			if (!books) return res.status(404).send({message: 'No existen libros de esa editorial.'})

			res.status(200).send(books)
		})
	}

	if(section=="Category"){
		Book.find({category : name}, (err, books) => {
			if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
			if (!books) return res.status(404).send({message: 'No existen libros de ese genero.'})

			res.status(200).send(books)
		})
	}
}

module.exports = {
	getBook,
	getBooks,
	saveBook,
	updateBook,
	deleteBook,
	findBookBy
}