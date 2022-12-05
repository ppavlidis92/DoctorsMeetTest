const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
var User = require("../models/users");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const verifyToken = require("../helper/validate-token");

const JWT_KEY = process.env.JWT_KEY;

const { RedirectAuthUser } = require("../helper/helperFunctions");

router.use(bodyParser.urlencoded({ extended: true }));

//give user the login page
router.get("/", (req, res) => {
  //HANDLE BAR
  console.log("hi");
  res.render("login", {
    title: "Log in",
    login: true,
  });
});

//route that handles the submit form at login
router.post("/", (req, res) => {
  let { email, password } = req.body;
  email = email.toLowerCase();

  User.find({ email })
    .exec()
    .then((result) => {
      let user = result[0];

      if (result.length < 1) {
        res.render("login", {
          title: " Log in",
          message: "Mail not  found, users does not exist",
          status: "warning",
          error: true,
          login: true,
        });
        return;
      }
      bcrypt.compare(password, user.password, function (err, result) {
        if (err) {
          res.render("login", {
            title: " Log in",
            message: err,
            status: "warning",
            error: true,
            login: true,
          });
        }
        if (result) {
          let token;
          //sign token

          jwt.sign(
            {
              email: user.email,
              lname: user.lname,
              lname: user.lname,
              role: user.role,
              doctor: user.doctor.amka,
            },
            JWT_KEY,
            //	123123
            function (err, token) {
              if (err) {
                res.render("login", {
                  title: " Log in",
                  message: "Wrong password",
                  status: "warning",
                  error: true,
                  login: true,
                });
                return;
              } else {
                // jwt.sign({})
                // TODO check property on jwt{maxAge:'3h'}
                res.cookie("authToken", token);
                res.redirect("/");
              }
            }
          );
        } else {
          res.render("login", {
            title: " Log in",
            message: "Wrong password",
            status: "warning",
            error: true,
            login: true,
          });
          return;
        }
      });
    })
    .catch((err) => {
      res.render("login", {
        title: " Log in",
        message: err,
        status: "warning",
        error: true,
        login: true,
      });
      return;
    });
});

module.exports = router;
