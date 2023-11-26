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
      status: req.body.status,
      type: req.body.type,
      ongoingReservations:[],
      historyReservations:[],
      canceledReservations:[]
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
          phone: fetchedUser.phone,
          status: fetchedUser.status,
          type: fetchedUser.type,
          ongoingReservations:fetchedUser.ongoingReservations,
          historyReservations:fetchedUser.historyReservations,
          canceledReservations:fetchedUser.canceledReservations
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
          status: user.status,
          type: user.type,
          ongoingReservations:user.ongoingReservations,
          historyReservations:user.historyReservations,
          canceledReservations:user.canceledReservations
        });
      })
      .catch(function (err) {
        return res.status(500).send(err);
      });
  } else {
    return res.status(500);
  }
});

router.post("/verify", async (req, res) => {
  let decoded;
  try {
    if (req.headers && req.headers.authorization) {
      const authorization = req.headers.authorization.split(" ")[1];
      try {
        decoded = jwt.verify(authorization, "secret_this_should_be_longer"); // Use your secret here
      } catch (e) {
        return res.status(401).send("Unauthorized");
      }
    } else {
      return res.status(500);
    }
    const userId = decoded.userId; // Use userId

    // Fetch the user by id
    User.findOne({ _id: userId })
      .then(async function (user) {
        if (!user) {
          return res.status(404).send("User not found");
        }

        // Update the user's status to "verified"
      user.status = "verified";
      await user.save();
        return res.status(200).json({ message: "User verified successfully" });
      })
      .catch(function (err) {
        return res.status(500).send(err);
      });
  } catch (error) {
    console.error("Error verifying user:", error);
    res.status(500).json({ error: error.message });
  }
});

router.get('/getReservations', async (req, res) => {
  try {
    // Extract and verify the token from the authorization header
    let decoded;
    if (req.headers && req.headers.authorization) {
      const authorization = req.headers.authorization.split(' ')[1];
      try {
        decoded = jwt.verify(authorization, 'secret_this_should_be_longer'); // Use your secret here
      } catch (e) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
    } else {
      return res.status(500).json({ message: 'Internal Server Error' });
    }

    // Use the decoded userId to fetch ongoing reservations
    const userId = decoded.userId;

    // Fetch user with ongoing reservations
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const ongoingReservations = user.ongoingReservations;

    return res.status(200).json({ ongoingReservations });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
