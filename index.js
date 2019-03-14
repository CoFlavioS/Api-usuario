'use strict'

const config = require('./config')
const mongoose = require('mongoose')
const app = require('./app')

mongoose.connect(config.db, {useNewUrlParser: true }, (err, res) => {
	if(err){
		return console.log(`Error al conectar a la base de datos: ${err}`)
	}
	console.log('Conexión a la base de datos establecida...')

    app.listen(config.port, () => {
        console.log('Api-rest running! Port: ' + config.port);
    });
})