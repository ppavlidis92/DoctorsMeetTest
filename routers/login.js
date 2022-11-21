const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
var User = require('../models/users');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
require('dotenv').config()
const verifyToken =require('../helper/validate-token')

const JWT_KEY = process.env.JWT_KEY


const { RedirectAuthUser } = require('../helper/helperFunctions');


router.use(bodyParser.urlencoded({ extended: true }));

//give user the login page
router.get('/', (req, res) => {
	//HANDLE BAR
	
	res.render('login', {
		title: 'Log in',
		login:true
	});
});


//route that handles the submit form at login
router.post('/', (req, res) => {

	let {email,password}  = req.body;
	email=email.toLowerCase();

	User.find({  email })
		.exec()
		.then((result) => {
			let user = result[0];
			//console.log(user)
			if (result.length < 1) {
				res.render('login', {
					title: ' Log in',
					message: 'Mail not  found, users does not exist',
					status: 'alert alert-danger',
					login:true
				});
			}
			bcrypt.compare(password, user.password, (err, result) => {
				if (err) {					
					res.render('login', {
						title: ' Log in',
						message: err,
						status: 'alert alert-danger',
						login:true
					});
				}
				if (result) {	
						let token ;			
						//sign token
							console.log('------------------------');
						jwt.sign({
									email: user.email,
									lname: user.lname,
									bname:user.bname,
									role:user.role,
								},
								JWT_KEY, 
														
								function(err, token) {
									if(err){
						console.log(err.message);
									}else{
										
								console.log('---------2---------------');

										console.log(token);
									//console.log(token)
									// TODO check property on jwt{maxAge:'3h'}
									res.cookie('authToken',token)
									res.redirect('/');
									}
								}
					);

				} else {				
					res.render('login', {
						title: ' Log in',
						message: 'Wrong password',
						status: 'alert alert-danger',
						login:true
					});
				}
			});
		})
		.catch((err) => {
			console.log(err);
			res.render('login', {
				title: ' Log in',
				message: err,
				status: 'alert alert-danger',
				login:true
			});
		});
});

module.exports = router;
