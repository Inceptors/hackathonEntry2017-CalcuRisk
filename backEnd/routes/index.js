var express = require('express');
var Router = require('express-promise-router');

const db = require('../db/index')

const router = new Router()

router.get('/', (req, res) => {
  res.send("Index page")
})

module.exports = router;
