const restaurantsReducer = (state = [], action) => {
  switch(action.type) {
    case 'ADD_NEW_RESTAURANTS': // ADD_NEW_RESTAURANTS takes restaurants from action.payload and sets them as the state
      return action.payload.businesses;
    default:
      return state;
  }
};

export default restaurantsReducer;
