/**
 * This is the main component for the list of restaurants page.
 * Inside this component are the other components on the page,
 * such as the search bar, the sort and filter fields, and the
 * table of restaurants.
 */
import React from 'react';
import { connect } from 'react-redux';

import { getRestaurants, mapStateToProps } from '../../functions';
import history from '../../history';
import LoadMap from '../LoadMap';
import PageButtons from './PageButtons';
import { addRestaurants } from '../../redux/actions/restaurants';
import RestaurantsTable from './RestaurantsTable';
import SearchArea from './SearchArea';

class ListOfRestaurants extends React.Component {
  // returns a list of latitudes and longitudes which a map will have to contain
  createMapBounds = () => {
    const mapBounds = this.props.state.restaurants.map(restaurant => [
      restaurant.coordinates.latitude,
      restaurant.coordinates.longitude,
    ]);

    // if the user has a recorded latitude and longitude, add it to the bounds
    if (typeof this.props.state.searchInfo.latitude !== 'undefined' && typeof this.props.state.searchInfo.longitude !== 'undefined') {
      mapBounds.push([
        this.props.state.searchInfo.latitude,
        this.props.state.searchInfo.longitude,
      ]);
    }

    return mapBounds;
  }

  // returns info needed to make markers on a map
  createMapInfo = () => {
    const mapInfo = this.props.state.restaurants.map(restaurant => ({
      id: restaurant.id,
      name: restaurant.name,
      location: [restaurant.coordinates.latitude, restaurant.coordinates.longitude],
    }));

    // if the user has a recorded latitude and longitude, add that information for a marker
    if (typeof this.props.state.searchInfo.latitude !== 'undefined' && typeof this.props.state.searchInfo.longitude !== 'undefined') {
      mapInfo.push({
        id: 'yourlocation',
        name: 'Your Location',
        location: [this.props.state.searchInfo.latitude, this.props.state.searchInfo.longitude]
      });
    }

    return mapInfo;
  }

  componentDidMount() {
    // if there is no location or latitude and longitude in the redux store, move the user to
    // the GetLocation component to get a location
    if (typeof this.props.state.searchInfo.location === 'undefined' &&
      (typeof this.props.state.searchInfo.latitude === 'undefined' || typeof this.props.state.searchInfo.longitude === 'undefined')) {
      history.push('/GetLocation');
    } else { // if there is enough information to access the api, then get the restaurants from the api
      getRestaurants(this.props.state.searchInfo, this.props.addRestaurants);
    }
  }

  render() {
    return (
      <div>
        <SearchArea />
        <RestaurantsTable />
        <PageButtons />
        {this.props.state.restaurants.length === 0 ? null : <LoadMap bounds={this.createMapBounds()} restaurantsInfo={this.createMapInfo()} />}
      </div>
    );
  }
}

export default connect(mapStateToProps, { addRestaurants })(ListOfRestaurants);
