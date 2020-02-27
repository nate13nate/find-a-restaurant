// default state is for testing purposes until location is received from the user
const defaultState = {
  location: 'United States',
};

const searchInfoReducer = (state = defaultState, action) => {
  switch(action.type) {
    default:
      return state;
  }
};

export default searchInfoReducer;
