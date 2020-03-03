const viewedRestaurantReducer = (state = {}, action) => {
  switch (action.type) {
    case 'CLEAR_RESTAURANT': // resets state
      return {};
    case 'SET_RESTAURANT': // adds a new restaurant to the redux state
      return action.payload;
    default:
      return state;
  }
}

export default viewedRestaurantReducer;
