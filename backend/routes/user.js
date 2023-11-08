const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

const router = express.Router();

let fetchedUser;

router.post("/signup", (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then(hash => {
    const user = new User({
      email: req.body.email,
      password: hash,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      address: req.body.address,
      phone: req.body.phone,
      status: req.body.status
    });
    user
      .save()
      .then(result => {
        res.status(201).json({
          message: "User created!",
          result: result
        });
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
  });
});

router.post("/login", (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).json({
          message: "Auth failed"
        });
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then(result => {
      if (!result) {
        return res.status(401).json({
          message: "Auth failed"
        });
      }
      const token = jwt.sign(
        { email: fetchedUser.email, userId: fetchedUser._id },
        "secret_this_should_be_longer",
        { expiresIn: "1h" }
      );
      res.status(200).json({
        token: token,
        expiresIn: 3600,
        currUser: {
          fname: fetchedUser.firstName,
          lname: fetchedUser.lastName,
          email: fetchedUser.email,
          address: fetchedUser.address,
          phone: fetchedUser.phone
        }
      });
    })
    .catch(err => {
      return res.status(401).json({
        message: "Auth failed"
      });
    });
});

router.get("/me", (req, res) => {
  if (req.headers && req.headers.authorization) {
    const authorization = req.headers.authorization.split(" ")[1];
    let decoded;
    try {
      decoded = jwt.verify(authorization, "secret_this_should_be_longer"); // Use your secret here
    } catch (e) {
      return res.status(401).send("Unauthorized");
    }

    const userId = decoded.userId; // Use userId

    // Fetch the user by id
    User.findOne({ _id: userId })
      .then(function (user) {
        if (!user) {
          return res.status(404).send("User not found");
        }
        return res.status(200).json({
          fname: user.firstName,
          lname: user.lastName,
          email: user.email,
          address: user.address,
          phone: user.phone,
          status: user.status
        });
      })
      .catch(function (err) {
        return res.status(500).send(err);
      });
  } else {
    return res.status(500);
  }
});

module.exports = router;
