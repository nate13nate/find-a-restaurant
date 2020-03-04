const pageInfoReducer = (state = { pageNum: 1, needToUpdateRestaurants: false }, action) => {
  switch(action.type) {
    case 'ADD_NEW_RESTAURANTS': // records the total number of restaurants and notes there's no need to call the yelp fusion api again
      return { ...state, totalRestaurants: action.payload.total, needToUpdateRestaurants: false };
    case 'CHANGE_PAGE_NUM': // records the page number and notes a need to call the yelp fusion api
      return { ...state, pageNum: action.payload, needToUpdateRestaurants: true };
    default:
      return state;
  }
};

export default pageInfoReducer;
