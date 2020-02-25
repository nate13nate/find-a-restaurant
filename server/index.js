const express = require('express');

const getRestaurants = require('./getRestaurants');
const getARestaurant = require('./getARestaurant');

const app = express();

// get all restaurants from yelp api
app.get('/RestaurantsInfo/getRestaurants', function (req, res) {
  res.send(getRestaurants());
});

// get specific information on a single restaurant from yelp api
app.get('/RestaurantsInfo/getARestaurant', function (req, res) {
  res.send(getARestaurant());
});
 
app.listen(5000);
