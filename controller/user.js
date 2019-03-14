'use strict'

const User = require('../models/user')
const mongoose = require('mongoose')

function getUser (req, res) {
	let userId = req.params.userId

	User.findById(userId, (err, user) => {
		if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
		if(!user) return res.status(404).send({message: 'El usuario no existe'})
	
		res.status(200).send({ user })
	})
}

function getUsers (req, res) {
	User.find({}, (err, users) => {
		if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
		if (!users) return res.status(404).send({message: 'No existen usuarios'})
	
		res.status(200).send({users})
	})
}

function saveUser (req, res) {
	console.log('POST /api/user')
	console.log(req.body)

	let user = new User()
	user.email = req.body.email
	user.name = req.body.name
	user.password = req.body.password
	user.category = req.body.category

	user.save((err, userStored) => {
		if(err) res.status(500).send({message: `Error al salvar la base de datos ${err}`})
		else res.status(200).send({user: userStored})
	})
}

function updateUser (req, res) {
	let userId = req.params.userId
	let update = req.body

	User.findByIdAndUpdate(userId, update, (err, userUpdated) => {
		if(err) res.status(500).send({message: `Error al actualizar el usuario: ${err}`})

		res.status(200).send({ user: userUpdated})
	})
}

function deleteUser (req, res) {
	let userId = req.params.userId

	User.findById(userId, (err, user) => {
		if(err) res.status(500).send({message: `Error al borrar el usuario: ${err}`})
		
		user.remove(err => {
			if(err) res.status(500).send({message: `Error al borrar el usuario: ${err}`})
			res.status(200).send({message: 'El usuario ha sido eliminado'})
		})
	})
}

module.exports = {
	getUser,
	getUsers,
	saveUser,
	updateUser,
	deleteUser
}