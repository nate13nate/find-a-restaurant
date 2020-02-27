const express = require('express');

const getRestaurants = require('./getRestaurants');
const getARestaurant = require('./getARestaurant');

const app = express();

// get all restaurants from yelp api
app.get('/RestaurantsInfo/getRestaurants', async function (req, res) {
  const restaurants = await getRestaurants(req.query); // gets the restaurants that match the parameters
  res.send(restaurants); 
});

// get specific information on a single restaurant from yelp api
app.get('/RestaurantsInfo/getARestaurant', function (req, res) {
  res.send(getARestaurant());
});
 
app.listen(5000);
