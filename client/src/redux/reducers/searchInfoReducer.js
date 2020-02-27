const searchInfoReducer = (state = {}, action) => {
  switch(action.type) {
    case 'UPDATE_SEARCH_INFO': // add the provided search parameters to the redux state
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default searchInfoReducer;
