const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const async = require('hbs/lib/async');
const verifyToken =require('../helper/validate-token')


router.use(bodyParser.urlencoded({ extended: true }));




router.get('/AddPatient',verifyToken, async (req, res) => {
	res.render('AddPatient');
});


router.get('/PatientsList',verifyToken, async (req, res) => {
	res.render('PatientsList');
});


module.exports = router;
