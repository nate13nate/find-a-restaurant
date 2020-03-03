/**
 * This is the main component for the restaurant info page.
 * Inside this component are the other components on the page,
 * such as the button to return to the list of restaurants page
 * and the restaurant information.
 */
import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';

import history from '../../history';
import { clearRestaurant, setRestaurant } from '../../redux/actions/viewedRestaurant';
import RestaurantInfoTable from './RestaurantInfoTable';
import { serverBaseUrl } from '../../variables';

class RestaurantInfo extends React.Component {
  // gets the specific restaurant information from the yelp fusion api and adds it to the redux state
  getRestaurant = async () => {
    let restaurant = {};

    await axios.get(`http://${serverBaseUrl}/RestaurantsInfo/getARestaurant/${this.props.match.params.id}`).then((response) => {
      restaurant = response.data;
    }).catch((error) => {
      restaurant = { errorMessage: error.message, error };
    });

    this.props.setRestaurant(restaurant);
  }

  componentDidMount() {
    this.getRestaurant(); // once the component mounts, get the restaurant from the yelp fusion api
  }

  componentDidUpdate() {
    // if the component was updated so that there is no viewed restaurant, then the page will be sent to the ListOfRestaurants page
    if (typeof this.props.state.viewedRestaurant.id === 'undefined') {
      history.push('/');
    }
  }

  render() {
    // if the restaurant hasn't been gotten yet, show the page is loading
    if (typeof this.props.state.viewedRestaurant.id === 'undefined') {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <RestaurantInfoTable />
        <button onClick={() => { this.props.clearRestaurant(); }}>Back</button>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({ state, properties: props });

export default connect(mapStateToProps, { clearRestaurant, setRestaurant })(RestaurantInfo);
