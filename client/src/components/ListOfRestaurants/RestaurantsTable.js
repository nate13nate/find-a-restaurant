/**
 * This component is the table of restaurants, which also provides links to the
 * individual restaurant pages.
 */
import React from 'react';
import { connect } from 'react-redux';

import { mapStateToProps, restaurantCategoriesToString } from '../../functions';
import history from '../../history';

class RestaurantsTable extends React.Component {
  // returns the table records for the restaurant information
  displayRestaurants() {
    return this.props.state.restaurants.map(restaurant => ( // loops through the list of restaurants and returns a row for each restaurant
      <tr className='restaurantListRow' key={restaurant.id} onClick={() => { history.push(`/RestaurantInfo/${restaurant.id}`); }}>
        <td>{restaurant.name}</td>
        <td>{restaurantCategoriesToString(restaurant.categories)}</td>
        <td>{restaurant.price}</td>
        <td>{restaurant.rating}</td>
        <td>{`${(restaurant.distance * .000621371).toFixed(1)} miles` /* Converts the api's distance in meters to miles */}</td>
        <td>{restaurant.is_closed ? 'No' : 'Yes'}</td>
      </tr>
    ));
  }

  render() {
    // if the restaurants have not been fetched yet, display a loading sign
    if (this.props.state.restaurants.length === 0) {
      return <div>Loading...</div>;
    }

    // if there has been an error with fetching the restaurants, display the error message
    if (typeof this.props.state.restaurants.errorMessage !== 'undefined') {
      return <div>{this.props.state.restaurants.errorMessage}</div>;
    }

    return (
      <table id='restaurantsTable'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Restaurant Type</th>
            <th>Price</th>
            <th>Rating</th>
            <th>Distance</th>
            <th>Is It Open?</th>
          </tr>
        </thead>
        <tbody>
          {this.displayRestaurants()}
        </tbody>
      </table>
    );
  }
}

export default connect(mapStateToProps)(RestaurantsTable);
