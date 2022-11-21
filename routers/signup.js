const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
var User = require('../models/users');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { getGreeceTime,getGreeceTimeOneYear } = require('../helper/helperFunctions');


router.use(bodyParser.urlencoded({ extended: true }));



router.get('/', (req, res) => {
	//HANDLE BAR
	res.render('signup', {
		title: ' Sign Up',
		signup:true
	});
});





router.post('/', async (req, res) => {
	//console.log(req.body)
	let {
			fname,
			lname,
			email, 
			password,
			role, 
			streetName, 
			streetNumber,
			streetZip,
			RepeatPassword
		 }= req.body;
	
	let Address = {
		streetName,
		streetNumber,
		streetZip
	}
	var start_date = getGreeceTime ()
	var Access_end_date = getGreeceTimeOneYear()
	
	if (password !== RepeatPassword){
		res.render('signup', {
			title: ' Sign Up',
			message:'Ο κωδικός και η επιβεβαίωση κωδικού δεν ταιρίαζουν.',                                
			status: "alert alert-warning"   ,
			signup:true
		});
	

	}else{
		email=email.toLowerCase()
		User.find({ email }).exec()
		.then((user) => {
			console.log(user)
			if (user.length >= 1) {
				return res.render('signup', {
					title: ' Sign Up',
					message:'User Exists',
					status: "alert alert-warning",
					signup:true
				});
			} else {
				bcrypt.hash(password, 10, (err, hash) => {
					if (err) {
						return res.render('signup', {
							title: ' Sign Up',
							message:err,
							status: "alert alert-danger"	,
							signup:true					
						});
					} else {
						const user = new User({
							_id: new mongoose.Types.ObjectId(),
							fname,
							lname,
							email: email.toLowerCase(),
							password: hash,
							role,
							Address,
							start_date,
							Access_end_date
						});
					
						user.save()
							.then((result) => {		
								res.render('signup', {
									title: ' Sign Up',
									message:'User created! You can now login',                                
									status: "alert alert-success"   ,
									signup:true
								});
							})
							.catch((err) => {
								console.log(err);
								res.render('signup', {
									title: ' Sign Up',
									message:err,
									status: "alert alert-danger",
									signup:true
								});
							});
					}
				});
			}
		});
	}

	
});
module.exports = router;
