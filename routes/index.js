const express = require('express')
const userCtrl = require('../controller/user')
const bookCtrl = require('../controller/book')
const app = express.Router()

app.get('/user', userCtrl.getUsers)
app.get('/user/:userId', userCtrl.getUser)
app.post('/user', userCtrl.saveUser)
app.put('/user/:userId', userCtrl.updateUser)
app.delete('/user/:userId', userCtrl.deleteUser)

app.get('/book', bookCtrl.getBooks)
app.get('/book/:bookId', bookCtrl.getBook)
app.post('/book', bookCtrl.saveBook)
app.put('/book/:bookId', bookCtrl.updateBook)
app.delete('/book/:bookId', bookCtrl.deleteBook)
app.get('/bookS/:section/:newName', bookCtrl.findBookBy)


module.exports = app