import { combineReducers } from 'redux';

// placeholder reducer; returns null
const fakeReducer = () => {
  return null;
}

export default combineReducers({
  displayedRestaurants: fakeReducer, // the restaurants which match the search / sort requirements
  location: fakeReducer, // the location of the user or the location they choose
  restaurants: fakeReducer, // the total list of restaurants pulled from the Yelp API
  searchInfo: fakeReducer, // the parameters for searching through the list of restaurants
  sortInfo: fakeReducer, // the parameters for sorting teh list of restaurants
  viewedRestaurant: fakeReducer, // the restaurant currently viewed by the user
});
