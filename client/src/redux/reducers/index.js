import { combineReducers } from 'redux';

import pageInfoReducer from './pageInfoReducer';
import restaurantsReducer from './restaurantsReducer';
import searchInfoReducer from './searchInfoReducer';
import viewedRestaurantReducer from './viewedRestaurantReducer';

// placeholder reducer; returns null
const fakeReducer = () => {
  return null;
}

export default combineReducers({
  pageInfo: pageInfoReducer, // information on the different pages of the restaurant table
  restaurants: restaurantsReducer, // the total list of restaurants pulled from the Yelp API
  searchInfo: searchInfoReducer, // the parameters for searching through the list of restaurants
  sortInfo: fakeReducer, // the parameters for sorting the list of restaurants
  viewedRestaurant: viewedRestaurantReducer, // the restaurant currently viewed by the user
});
