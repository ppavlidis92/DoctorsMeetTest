const jwt = require('jsonwebtoken')
var User = require('../models/users');



// middleware to validate token (rutas protegidas)
const verifyToken = (req, res, next) => {
    let token
    try {
         token = req.cookies.authToken
       // console.log("token "+token)
    } catch (error) {
        console.log(error);
    }
    
   if(token){
        jwt.verify(token,process.env.JWT_KEY,(err,decodedUser)=>{
            if(err){
                console.log(err);
                res.redirect('/login')
            }else{
                // console.log(decodedUser);
                let email =decodedUser.email
                User.find({email},(err,result)=>{
                    if(err){
                        console.log(err);
                         res.redirect('/login')
                    }else{
                        next()
                    }
                })
             
            }
        })
   }else{
   
        try {
            res.redirect('/login')
            next();
        } catch (error) {
            console.log(error);
        }
   }
}



const parseJwt = (token) => {
	try {
		return JSON.parse(atob(token.split('.')[1]));
	} catch (e) {
		return null;
	}
};
module.exports = verifyToken;