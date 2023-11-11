const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require("multer"); 
const path = require("path");
const fs = require("fs");

const Restaurant= require("../models/restaurant")

const router = express.Router();

// Multer configuration for handling file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      // Set the destination folder for file uploads
      const uploadDir = path.join(__dirname, "../uploads");
      // Create the 'uploads' folder if it doesn't exist
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir);
      }
      cb(null, "backend/pdf");
    },
    filename: (req, file, cb) => {
      // Set the filename to be unique and include the original extension
      cb(null, Date.now() + "_" + file.originalname);
    },
  });
  
  const upload = multer({ storage: storage });
  
  router.post("/new", upload.single("pdfFile"), (req, res, next) => {
    const restaurant = new Restaurant({
        title: req.body.title,
        address: req.body.address,
        phone: req.body.phone,
        email: req.body.email,
        rating: req.body.rating,
        meals: [],
        pdfFile: req.file.path
    });

    restaurant
        .save()
        .then((result) => {
            res.status(201).json({
                message: "Restaurant created!",
                result: result,
            });
        })
        .catch((err) => {
            res.status(500).json({
                error: err,
            });
        });
});


module.exports = router;