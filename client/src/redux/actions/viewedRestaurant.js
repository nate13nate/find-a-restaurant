// clears the restaurant from the redux store; will be run when the page is switched from restaurantInfo to the restaurantList
export const clearRestaurant = () => ({ type: 'CLEAR_RESTAURANT' });

// sets the restaurant in the redux store
export const setRestaurant = restaurant => ({ type: 'SET_RESTAURANT', payload: restaurant });
