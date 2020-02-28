/**
 * This component is the table of restaurants, which also provides links to the
 * individual restaurant pages.
 */
import React from 'react';
import { connect } from 'react-redux';

class RestaurantsTable extends React.Component {
  // returns the table records for the restaurant information
  displayRestaurants() {
    return this.props.state.restaurants.map(restaurant => ( // loops through the list of restaurants and returns a row for each restaurant
      <tr key={restaurant.id}>
        <td>{restaurant.name}</td>
        <td>{this.restaurantCategoriesToString(restaurant.categories)}</td>
        <td>{restaurant.price}</td>
        <td>{restaurant.rating}</td>
        <td>{`${(restaurant.distance * .000621371).toFixed(1)} miles` /* Converts the api's distance in meters to miles */}</td>
        <td>{restaurant.is_closed ? 'No' : 'Yes'}</td>
      </tr>
    ));
  }

  // takes the restaurant categories as the api provides them and returns them as a user-friendly string
  // categories: Array of Objects; each object contains a title value, which is a user-friendly version of the category
  restaurantCategoriesToString(categories) {
    let categoriesAsString = '';

    // concatenates all of the titles of the categories together
    categories.forEach(function (category, index) {
      // if the current category is the last one in the array, add just the title; otherwise, add a semicolon and space
      categoriesAsString += index === categories.length - 1 ? category.title : `${category.title}; `;
    });

    return categoriesAsString;
  }

  render() {
    // if the restaurants have not been fetched yet, display a loading sign
    if (this.props.state.restaurants.length === 0) {
      return <div>Loading...</div>;
    }

    // if there has been an error with fetching the restaurants, display the error message
    if (typeof this.props.state.restaurants[0].errorMessage !== 'undefined') {
      return <div>{this.props.state.restaurants[0].errorMessage}</div>;
    }

    return (
      <table>
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

const mapStateToProps = (state, props) => ({ state, properties: props });

export default connect(mapStateToProps)(RestaurantsTable);
