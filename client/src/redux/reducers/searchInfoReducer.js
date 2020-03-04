const searchInfoReducer = (state = { limit: 25, radius: 8000 }, action) => {
  switch (action.type) {
    case 'CHANGE_PAGE_NUM': // offset offsets the restaurants returned by its value, which is based off of the page number
      return { ...state, offset: (action.payload - 1) * 25 };
    case 'UPDATE_SEARCH_INFO': // add the provided search parameters to the redux state
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default searchInfoReducer;
