const express = require('express')
const userCtrl = require('../controller/user')
const app = express.Router()

app.get('/user', userCtrl.getUsers)
app.get('/user/:userId', userCtrl.getUser)
app.post('/user', userCtrl.saveUser)
app.put('/user/:userId', userCtrl.updateUser)
app.delete('/user/:userId', userCtrl.deleteUser)

module.exports = app