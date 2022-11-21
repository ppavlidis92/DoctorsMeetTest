const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const async = require('hbs/lib/async');
const verifyToken =require('../helper/validate-token')


router.use(bodyParser.urlencoded({ extended: true }));




router.get('/AddUser',verifyToken, async (req, res) => {
	res.render('AddUser');
});

router.get('/UsersList',verifyToken, async (req, res) => {
	res.render('UsersList');
});

module.exports = router;
