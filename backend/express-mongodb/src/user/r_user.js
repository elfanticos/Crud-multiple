'use strict'
const express = require('express'),
      router  = express.Router(),
      controller = require('./c_user');

router
    .get('/', controller.list)
    .post('/add', controller.insert)
    .put('/update/:id', controller.update)
    .delete('/delete/:id', controller.delete)

module.exports = router;