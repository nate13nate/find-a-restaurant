import axios from 'axios';

import { serverBaseUrl } from '../variables';

// gets the restaurants from the server and updates the redux state
export const getRestaurants = async (searchInfo, addRestaurants) => {
  let restaurants = [];

  await axios.get(`http://${serverBaseUrl}/RestaurantsInfo/getRestaurants`, { // calls to the server
    params: searchInfo, // provides the search parameters
  }).then((response) => { // if the restaurants are returned...
    restaurants = response.data; // set restaurants varaible to the list of restaurants
  }).catch((error) => { // if there is an error...
    restaurants = [{ errorMessage: error.message, error: error }];
  });

  // if there are no restaurants
  if (restaurants.length === 0) {
    restaurants = [{ errorMessage: 'There are no restaurants which match your search parameters. Please change them and try again.' }];
  }

  addRestaurants(restaurants); // add the restaurants to the redux state
}

// takes the restaurant categories as the api provides them and returns them as a user-friendly string
// categories: Array of Objects; each object contains a title value, which is a user-friendly version of the category
export function restaurantCategoriesToString(categories) {
  let categoriesAsString = '';

  // concatenates all of the titles of the categories together
  categories.forEach(function (category, index) {
    // if the current category is the last one in the array, add just the title; otherwise, add a semicolon and space
    categoriesAsString += index === categories.length - 1 ? category.title : `${category.title}; `;
  });

  return categoriesAsString;
}
