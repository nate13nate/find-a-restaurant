// adds the restaurants to the redux state
// also adjusts the pageInfo by recording the total number of restaurants within the search parameters
export const addRestaurants = restaurants => ({ type: 'ADD_NEW_RESTAURANTS', payload: restaurants });
