/**
 * This components holds the options to sort the list of restaurants
 */
import React from 'react';
import { connect } from 'react-redux';

import { getRestaurants } from '../../functions';
import { addRestaurants } from '../../redux/actions/restaurants';
import { updateSearchInfo } from '../../redux/actions/searchInfo';

class SortOptions extends React.Component {
  constructor(props) {
    super(props);

    this.needToUpdateRestaurants = false; // notes if the program needs to update the list of restaurants
    // after the search parameters have been updated
  }

  // notes that the restaurants will need to be updated and updates the sort information
  prepareForRestaurantCall = (e) => {
    this.needToUpdateRestaurants = true;
    this.props.updateSearchInfo({ sort_by: e.target.value });
  }

  componentDidUpdate() {
    // the the restaurants need to be updated, then update the restaurants
    if (this.needToUpdateRestaurants) {
      this.needToUpdateRestaurants = false;
      getRestaurants(this.props.searchInfo, this.props.addRestaurants);
    }
  }

  render() {
    return (
      <select id='sortSelect' onChange={this.prepareForRestaurantCall} value={this.props.searchInfo.sort_by}>
        <option label='Best Match' value='best_match'></option>
        <option label='Rating' value='rating'></option>
        <option label='Review Count' value='review_count'></option>
        <option label='Distance' value='distance'></option>
      </select>
    );
  }
}

const mapStateToProps = (state) => ({ searchInfo: state.searchInfo });

export default connect(mapStateToProps, { addRestaurants, updateSearchInfo })(SortOptions);
