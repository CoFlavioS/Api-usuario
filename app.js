'use strict'

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const appRoute = require('./routes')

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.use('/app', appRoute)

module.exports = app