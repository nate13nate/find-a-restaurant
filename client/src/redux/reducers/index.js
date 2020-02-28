import { combineReducers } from 'redux';

import restaurantsReducer from './restaurantsReducer';
import searchInfoReducer from './searchInfoReducer';

// placeholder reducer; returns null
const fakeReducer = () => {
  return null;
}

export default combineReducers({
  restaurants: restaurantsReducer, // the total list of restaurants pulled from the Yelp API
  searchInfo: searchInfoReducer, // the parameters for searching through the list of restaurants
  sortInfo: fakeReducer, // the parameters for sorting the list of restaurants
  viewedRestaurant: fakeReducer, // the restaurant currently viewed by the user
});
