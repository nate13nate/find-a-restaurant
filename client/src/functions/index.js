import axios from 'axios';

import { serverBaseUrl } from '../variables';

// gets the location using HTML5 geolocation and references a callback function to update the redux state
export const getLocation = (navigator, callback) => {
  navigator.geolocation.getCurrentPosition((location) => { callback(updateSearchInfoWithLatAndLong(location)); }, (error) => {
    if (error.code === error.PERMISSION_DENIED) { // if the function failed because permission was denied, display a custom error message
      callback({ errorMessage: 'You denied access to your location. Either go into site settings and change your permissions, or input a location.'});
    } else { // if the function failed for a different reason, display the error message
      callback({ errorMessage: error.message });
    }
  });
}

// gets the restaurants from the server and updates the redux state
export const getRestaurants = async (searchInfo, addRestaurants) => {
  let restaurants = [];
  console.log(searchInfo);

  await axios.get(`http://${serverBaseUrl}/RestaurantsInfo/getRestaurants`, { // calls to the server
    params: searchInfo, // provides the search parameters
  }).then((response) => { // if the restaurants are returned...
    restaurants = response.data || response; // set restaurants varaible to the list of restaurants
  }).catch((error) => { // if there is an error...
    restaurants = [{ errorMessage: error.message, error: error }];
  });

  // if there are no restaurants
  if (restaurants.length === 0) {
    restaurants = [{ errorMessage: 'There are no restaurants which match your search parameters. Please change them and try again.' }];
  }

  addRestaurants(restaurants); // add the restaurants to the redux state
}

export const mapStateToProps = (state, props) => ({ state, properties: props });

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

// updates the redux state searchInfo by adding a latitude and a longitude
function updateSearchInfoWithLatAndLong(location) {
  return { latitude: location.coords.latitude, longitude: location.coords.longitude, location: null };
}
