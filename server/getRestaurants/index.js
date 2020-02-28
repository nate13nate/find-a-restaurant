const axios = require('axios');

const { YELP_FUSION_TOKEN } = require('../apiTokens');

// gets restaurants from yelp fusion api
// parameters = Object; contains search parameters for restaurants gotten from api
async function getRestaurants(parameters) {
  // either a location or a latitude and a longitude is required for the call to the api
  // if there either is no location or there isn't both a latitude and a longitude...
  if (typeof parameters.location === 'undefined' &&
    (typeof parameters.latitude === 'undefined' || typeof parameters.longitude === 'undefined')) {
    return { errorMessage: 'No location or latitude and longitude provided' }; // return an error message
  }

  // the restaurants that will be returned
  // if the value of restaurants doesn't change, an error message will be sent
  let restaurants = { errorMessage: 'No request was made to the API' };

  await axios.get('https://api.yelp.com/v3/businesses/search', { // accesses the yelp fusion api for restaurants
    params: parameters,
    headers: {
      Authorization: `Bearer ${YELP_FUSION_TOKEN}`,
    },
  }).then((response) => { // if the restaurants are gotten successfully
    restaurants = response.data.businesses; // set restaurants to the list of restaurants
  }).catch((error) => { // if there is an error in getting the restaurants
    restaurants = { errorMessage: error.message, error: error }; // return the error message seperately, and then the rest of the error info
  });

  return restaurants;
};

module.exports = getRestaurants;
