const restaurantsReducer = (state = [], action) => {
  switch(action.type) {
    case 'ADD_NEW_RESTAURANTS': // ADD_NEW_RESTAURANTS takes restaurants from action.payload and adds them to state,
      return [ ...state, ...action.payload ]; // in addition to updating outdated information
    default:
      return state;
  }
};

export default restaurantsReducer;
