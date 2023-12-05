const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const axios = require('axios'); // Make sure to import axios

const Restaurant = require("../models/restaurant");
const User = require("../models/user");
const Review = require("../models/review");

const { title } = require("process");
const { throwError } = require("rxjs");

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

router.post("/new", upload.single("pdfFile"), async (req, res, next) => {

  // Generate a random page between 0-200
  const randomPage = Math.floor(Math.random() * 201);

  // Call getRandomImage to get a random image URL
  const imageResponse = await getRandomImage(randomPage);
  const imageUrl = imageResponse.data.results[Math.floor(Math.random() * 10)].urls.regular;


  const restaurant = new Restaurant({
    title: req.body.title,
    address: req.body.address,
    phone: req.body.phone,
    email: req.body.email,
    rating: req.body.rating,
    image: imageUrl,
    meals: [],
    pdfFile: req.file.path
  });
  //TBD: Generate a random image

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

//DUMMY
// router.post("/dummy", upload.single("pdfFile"), (req, res, next) => {
//   const restaurant = new Restaurant({
//     title: req.body.title,
//     address: req.body.address,
//     phone: req.body.phone,
//     email: req.body.email,
//     rating: req.body.rating,
//     image: req.body.image,
//     meals: req.body.meals,
//     pdfFile: ''
//   });

//   restaurant
//     .save()
//     .then((result) => {
//       res.status(201).json({
//         message: "Restaurant created!",
//         result: result,
//       });
//     })
//     .catch((err) => {
//       res.status(500).json({
//         error: err,
//       });
//     });
// });

router.get('/', (req, res, next) => {
  Restaurant.find()
    .then(restaurants => {
      const formattedRestaurants = restaurants.map((restaurant) => {
        return {
          id: restaurant._id.toString(), // Convert ObjectId to string
          title: restaurant.title,
          address: restaurant.address,
          phone: restaurant.phone,
          email: restaurant.email,
          rating: restaurant.rating,
          image: restaurant.image,
          meals: restaurant.meals,
          pdfFile: restaurant.pdfFile,
        };
      });

      // Restaurants found, return them in the response
      res.status(200).json({
        message: "Restaurants fetched successfully.",
        restaurants: formattedRestaurants,
      });
    })
    .catch(error => {
      res.status(500).json({
        message: 'Fetching restaurants failed',
        error: error
      });
    });
});

router.post("/findByEmail", (req, res, next) => {
  const emailToFind = req.body.email;
  // Find restaurants based on the provided email
  Restaurant.find({ email: emailToFind })
    .then((restaurants) => {
      if (restaurants.length === 0) {
        // No restaurants found, return a 404 Not Found error
        return res.status(404).json({
          message: "No restaurants found with the provided email.",
        });
      }

      // Format the restaurants to replace "_id" with "id"
      const formattedRestaurants = restaurants.map((restaurant) => {
        return {
          id: restaurant._id.toString(), // Convert ObjectId to string
          title: restaurant.title,
          address: restaurant.address,
          phone: restaurant.phone,
          email: restaurant.email,
          rating: restaurant.rating,
          meals: restaurant.meals,
          pdfFile: restaurant.pdfFile,
        };
      });

      // Restaurants found, return them in the response
      res.status(200).json({
        message: "Restaurants found successfully.",
        restaurants: formattedRestaurants,
      });
    })
    .catch((error) => {
      // Handle any errors that occurred during the database query
      console.error(error);
      res.status(500).json({
        error: error,
      });
    });
});

router.put("/updateMeals", (req, res, next) => {
  const titleToUpdate = req.body.title;
  const newMeals = req.body.meals;

  // Find the restaurant based on the provided email
  Restaurant.findOne({ title: titleToUpdate })
    .then((restaurant) => {
      if (!restaurant) {
        // No restaurant found, return a 404 Not Found error
        return res.status(404).json({
          message: "Restaurant not found with the provided email.",
        });
      }

      // Update the meals in the found restaurant
      restaurant.meals = restaurant.meals.concat(newMeals);

      // Save the updated restaurant to the database
      return restaurant.save();
    })
    .then((updatedRestaurant) => {
      // Return a success message with the updated restaurant

      const formattedRestaurant = {
        id: updatedRestaurant._id.toString(), // Convert ObjectId to string
        title: updatedRestaurant.title,
        address: updatedRestaurant.address,
        phone: updatedRestaurant.phone,
        email: updatedRestaurant.email,
        rating: updatedRestaurant.rating,
        meals: updatedRestaurant.meals,
        pdfFile: updatedRestaurant.pdfFile,
      }

      res.status(200).json({
        message: "Meals updated successfully.",
        restaurant: formattedRestaurant,
      });
    })
    .catch((error) => {
      // Handle any errors that occurred during the database query or update
      console.error(error);
      res.status(500).json({
        error: error,
      });
    });
});

router.get("/getMeals", (req, res, next) => {
  Restaurant.findOne({ title: req.body.title })
    .then((restaurant) => {
      if (!restaurant) {
        // No restaurant found, return a 404 Not Found error
        return res.status(404).json({
          message: "Restaurant not found with the provided email.",
        });
      }

      res.status(200).json({
        message: "Fetched meals successfully",
        meals: restaurant.meals,
      });
    })
    .catch((error) => {
      // Handle any errors that occurred during the database query or update
      console.error(error);
      res.status(500).json({
        error: error,
      });
    });
})

router.get('/getAllMeals', async (req, res) => {
  try {
    // Find all restaurants
    const restaurants = await Restaurant.find();

    // Extract meals from each restaurant
    const allMeals = restaurants.reduce((meals, restaurant) => {
      // Concatenate meals from each restaurant
      return meals.concat(restaurant.meals);
    }, []);

    res.status(200).json(allMeals);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

router.get('/getRestaurantByMealTitle/:title', async (req, res) => {
  try {
    const mealTitle = req.params.title;

    // Find the restaurant that contains the specified meal title
    const restaurant = await Restaurant.findOne({ 'meals.title': mealTitle });

    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found for the given meal title.' });
    }

    // Return the restaurant information
    res.status(200).json(restaurant);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

router.post('/reserve', async (req, res) => {
  try {
    const reservation = req.body;

    // Find the restaurant by title
    const restaurant = await Restaurant.findOne({ title: reservation.restaurant });
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found.' });
    }

    // Find the meal in the restaurant's meals array
    const mealIndex = restaurant.meals.findIndex(
      (meal) => meal.title === reservation.meal.title
    );

    //console.log(mealIndex + " " +restaurant.meals[mealIndex].status )

    if (mealIndex === -1 || restaurant.meals[mealIndex].status !== 'open') {
      return res.status(400).json({ message: 'Meal not available for reservation.' });
    }

    // Update the status of the meal to 'reserved'
    restaurant.meals[mealIndex].status = 'reserved';

    // Find the user by email
    const user = await User.findOne({ email: reservation.user.email });

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Add the reservation to ongoing reservations for the user
    const newReservation = {
      meal: reservation.meal,
      restaurant: reservation.restaurant,
      reservationTime: reservation.reservationTime
    };

    // Add the reservation to ongoing reservations for the user
    user.ongoingReservations.push(newReservation);

    // Save changes to the database
    await restaurant.save();
    await user.save();

    // Return the reservation object ID along with the success message
    res.status(201).json({
      message: 'Reservation successful.',
      reservationId: newReservation._id, // Assuming _id is generated by MongoDB
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

router.post('/cancelReservation', async (req, res) => {
  try {
    // Extract parameters from the request body
    const { meal, restaurant, reservationTime, user } = req.body;

    // Find the user by email
    const userObj = await User.findOne({ email: user.email });

    if (!userObj) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Find the reservation in ongoingReservations based on meal, restaurant, reservationTime
    const reservationIndex = userObj.ongoingReservations.findIndex(
      (res) =>
        res.meal.title === meal.title &&
        res.restaurant === restaurant &&
        res.reservationTime === reservationTime
    );

    if (reservationIndex === -1) {
      return res.status(404).json({ message: 'Reservation not found.' });
    }

    // Move the meal from ongoingReservations to canceledReservations
    const canceledReservation = userObj.ongoingReservations.splice(
      reservationIndex,
      1
    )[0];
    userObj.canceledReservations.push(canceledReservation);

    // Find the restaurant by title
    const restaurantObj = await Restaurant.findOne({ title: restaurant });

    if (!restaurantObj) {
      return res.status(404).json({ message: 'Restaurant not found.' });
    }

    // Find the meal in the restaurant's meals array
    const mealObj = restaurantObj.meals.find(
      (m) => m.title === meal.title && m.status === 'reserved'
    );

    if (!mealObj) {
      return res.status(404).json({ message: 'Meal not found.' });
    }

    // Update the status of the meal to 'open' in the restaurant
    mealObj.status = 'open';

    // Save changes to the database
    await userObj.save();
    await restaurantObj.save();

    res.status(200).json({
      message: 'Reservation canceled successfully.',
      canceledReservation,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Function to get a random image
async function getRandomImage(page) {
  const headers = {
    'Accept-Version': 'v1',
    'Authorization': 'Client-ID LiP8e9DqYD8V_xv9LgnOXVId10_yYyZouztSleadyYg',
  };

  return axios.get(`https://api.unsplash.com/search/photos?page=${page}&query=restaurant`, { headers });
}

// waitlist endpoints

router.post('/waitlist', async (req, res) => {
  try {
    const waitlisting = req.body;

    // Find the restaurant by title
    const restaurant = await Restaurant.findOne({ title: waitlisting.restaurant });
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found.' });
    }

    // Find the meal in the restaurant's meals array
    const mealIndex = restaurant.meals.findIndex(
      (meal) => meal.title === waitlisting.meal.title
    );

    //console.log(mealIndex + " " +restaurant.meals[mealIndex].status )

    if (mealIndex === -1 || restaurant.meals[mealIndex].status !== 'open') {
      return res.status(400).json({ message: 'Meal not available for waitlist.' });
    }

    // Update the status of the meal to 'reserved'
    restaurant.meals[mealIndex].status = 'reserved';

    // Find the user by email
    const user = await User.findOne({ email: waitlisting.user.email });

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Add the waitlist to ongoing waitlist for the user
    const newWaitlisting = {
      meal: newWaitlisting.meal,
      restaurant: waitlisting.restaurant,
      waitlistTime: waitlisting.waitlistingTime
    };

    // Add the waitlist to ongoing waitlist for the user
    user.ongoingWaitlistings.push(newWaitlisting);

    // Save changes to the database
    await restaurant.save();
    await user.save();

    // Return the waitlist object ID along with the success message
    res.status(201).json({
      message: 'waitlist successful.',
      waitlistingId: newWaitlisting._id, // Assuming _id is generated by MongoDB
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

router.post('/cancelWaitlisting', async (req, res) => {
  try {
    // Extract parameters from the request body
    const { meal, restaurant, waitlistingTime, user } = req.body;

    // Find the user by email
    const userObj = await User.findOne({ email: user.email });

    if (!userObj) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Find the waitlist in ongoingWaitlists based on meal, restaurant, waitlistTime
    const waitlistingIndex = userObj.ongoingWaitinglists.findIndex(
      (res) =>
        res.meal.title === meal.title &&
        res.restaurant === restaurant &&
        res.waitlistingTime === waitlistingTime
    );

    if (waitlistingIndex === -1) {
      return res.status(404).json({ message: 'waitlist not found.' });
    }

    // Move the meal from ongoingWaitlists to canceledWaitlists
    const canceledWaitlist = userObj.ongoingWaitlists.splice(
      waitlistingIndex,
      1
    )[0];
    userObj.canceledWaitlistings.push(canceledWaitlistings);

    // Find the restaurant by title
    const restaurantObj = await Restaurant.findOne({ title: restaurant });

    if (!restaurantObj) {
      return res.status(404).json({ message: 'Restaurant not found.' });
    }

    // Find the meal in the restaurant's meals array
    const mealObj = restaurantObj.meals.find(
      (m) => m.title === meal.title && m.status === 'reserved'
    );

    if (!mealObj) {
      return res.status(404).json({ message: 'Meal not found.' });
    }

    // Update the status of the meal to 'open' in the restaurant
    mealObj.status = 'open';

    // Save changes to the database
    await userObj.save();
    await restaurantObj.save();

    res.status(200).json({
      message: 'waitlist canceled successfully.',
      canceledWaitlisting,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//post a restaurant review
router.post('/reviews/restaurant', (req, res) => {
  const reviewData = req.body;

  const newRating = parseFloat(req.body.rating); // Convert the rating to a number

  // Create a new review
  const review = new Review({
    restaurantTitle: req.body.restaurantTitle,
    rating: req.body.rating, // Store the rating as a number
    comment: req.body.comment,
    type: "restaurant"
  });

  // Save the new review
  review.save()
    .then((result) => {
      // Find the restaurant with the same title
      return Restaurant.findOne({ title: req.body.restaurantTitle });
    })
    .then((restaurant) => {
      if (!restaurant) {
        // Handle the case where the restaurant doesn't exist
        console.log("not found")
        throwError("Restaurant not found")
      }

      // Calculate the new average rating
      const existingRating = parseFloat(restaurant.rating); // Assuming restaurant.rating is an array of ratings

      const newAverageRating = (existingRating+newRating)/2;

      newAverageRating.toFixed(1)

      // Update the restaurant's rating field
      restaurant.rating = newAverageRating.toString();

      // Save the updated restaurant
      return restaurant.save();
    })
    .then((updatedRestaurant) => {
      res.status(201).json({
        message: "Restaurant review posted successfully!",
        result: updatedRestaurant,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

// Post a meal review
router.post('/reviews/meal', async (req, res) => {
  try {
    const newRating = parseFloat(req.body.rating);

    // Create a new review
    const review = new Review({
      restaurantTitle: req.body.restaurantTitle,
      rating: req.body.rating, // Store the rating as a number
      meal: req.body.meal,
      comment: req.body.comment,
      type: "meal"
    });

    // Save the new review
    const savedReview = await review.save();

    // Find the restaurant with the same title
    const restaurant = await Restaurant.findOne({ title: req.body.restaurantTitle });

    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    // Find the meal in the restaurant's meals array
    const mealIndex = restaurant.meals.findIndex(meal => meal.title === req.body.meal);

    if (mealIndex === -1) {
      return res.status(404).json({ message: "Meal not found in the restaurant" });
    }

    // Update the meal's rating
    const existingRating = parseFloat(restaurant.meals[mealIndex].rating);

    const newAverageRating = (existingRating + newRating) / 2;

    newAverageRating.toFixed(1);

    // Update the meal's rating field
    restaurant.meals[mealIndex].rating = newAverageRating.toString();

    // Save the updated restaurant
    const updatedRestaurant = await restaurant.save();

    res.status(201).json({
      message: "Meal review posted successfully!",
      result: updatedRestaurant,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Internal server error",
    });
  }
});


module.exports = router;