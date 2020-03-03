const axios = require('axios');

const { YELP_FUSION_TOKEN } = require('../apiTokens');

// gets a restaurant from the yelp fusion api
async function getARestaurant(id) {
  // holds the restaurants
  // if no restaurants are gotten, this error message will be sent instead
  let restaurant = { errorMessage: 'Error: No call to the database was made' };

  await axios.get(`https://api.yelp.com/v3/businesses/${id}`, {
    headers: {
      Authorization: `Bearer ${YELP_FUSION_TOKEN}`,
    },
  }).then((response) => {
    restaurant = response.data;
  }).catch((error) => {
    restaurant = { errorMessage: error.message, error };
  });

  return restaurant;
};

module.exports = getARestaurant;
