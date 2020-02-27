/**
 * This is the main component for the list of restaurants page.
 * Inside this component are the other components on the page,
 * such as the search bar, the sort and filter fields, and the
 * table of restaurants.
 */
import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';

import history from '../../history';
import { addRestaurants } from '../../redux/actions/restaurants';
import RestaurantsTable from './RestaurantsTable';
import { serverBaseUrl } from '../../variables';

class ListOfRestaurants extends React.Component {
  // gets the restaurants from the server and updates the redux state
  getRestaurants = async () => {
    let restaurants = [];

    await axios.get(`http://${serverBaseUrl}/RestaurantsInfo/getRestaurants`, { // calls to the server
      params: this.props.state.searchInfo, // provides the search parameters
    }).then((response) => { // if the restaurants are returned...
      restaurants = response.data; // set restaurants varaible to the list of restaurants
    }).catch((error) => { // if there is an error...
      restaurants = [{ errorMessage: error.message, error: error }];
    });

    // if there are no restaurants
    if (restaurants.length === 0) {
      restaurants = [{ errorMessage: 'There are no restaurants which match your search parameters. Please change them and try again.' }];
    }

    this.props.addRestaurants(restaurants); // add the restaurants to the redux state
  }

  componentDidMount() {
    // if there is no location or latitude and longitude in the redux store, move the user to
    // the GetLocation component to get a location
    if (typeof this.props.state.searchInfo.location === 'undefined' &&
      (typeof this.props.state.searchInfo.latitude === 'undefined' || typeof this.props.state.searchInfo.longitude === 'undefined')) {
      history.push('/GetLocation');
    } else { // if there is enough information to access the api, then get the restaurants from the api
      this.getRestaurants();
    }
  }

  render() {
    return <div><RestaurantsTable /></div>;
  }
}

const mapStateToProps = (state, props) => ({ state: state, properties: props });

export default connect(mapStateToProps, { addRestaurants })(ListOfRestaurants);
