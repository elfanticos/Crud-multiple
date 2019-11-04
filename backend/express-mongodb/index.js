'use strict'
const express = require('express'),
      cors    = require('cors'),
      bodyParser = require('body-parser'),
      morgan     = require('morgan');

// Inicializar express
const app = express();

// Database
require('./src/database');

// Middlewares
app
    .use(morgan('dev'))
    .use(bodyParser.urlencoded({extended: false}))
    .use(bodyParser.json())
    .use(cors())

// Routes
const r_user = require('./src/user/r_user');
app
    .use(r_user)


// Port
app.set('port', process.env.PORT || 3000);

// Iniciar servidor
app.listen(app.get('port'), () => {
    console.log(`Servidor corriendo en el puerto ${app.get('port')}`);
});


