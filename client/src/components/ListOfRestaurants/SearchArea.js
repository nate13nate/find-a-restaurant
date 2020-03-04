/**
 * This component holds the search bar to search the restaurants
 * by name and the location selecter.
 */
import React from 'react';
import { connect } from 'react-redux';

import FilterOptions from './FilterOptions';
import { getRestaurants, mapStateToProps } from '../../functions';
import { updateSearchInfo } from '../../redux/actions/searchInfo';
import { addRestaurants } from '../../redux/actions/restaurants';
import SortOptions from './SortOptions';

class SearchArea extends React.Component {
  constructor(props) {
    super(props);

    /**
     * currentComponentShown - JSX; contains either null, the FilterOptions component, or the SortOptions component
     * submitDisabled - boolean; contains whether the submit button is disabled or not
     * submitText - String; contains the text for the submit button
     */
    this.state = { currentComponentShown: null, submitDisabled: false, submitText: 'Submit' };
  }

  // when the text input is submitted
  onSubmit = async () => {
    this.setState({ submitText: 'Loading...', submitDisabled: true }); // have the submit button say loading and disable the submit button
    await getRestaurants(this.props.state.searchInfo, this.props.addRestaurants); // update the restaurants
    this.setState({ submitText: 'Submit', submitDisabled: false }); // restore the submit button to its original state
  }

  render() {
    // if there are no restaurants, return an empty div
    if (this.props.state.restaurants.length === 0) {
      return <div></div>;
    }

    return (
      <div>
        <input
          value={this.props.state.searchInfo.term || ''}
          onChange={(e) => { this.props.updateSearchInfo({ term: e.target.value }); }}
          onKeyUp={(e) => { if (e.keyCode === 13) { this.onSubmit(); } }}
        ></input>
        <button type='submit' onClick={this.onSubmit} disabled={this.state.submitDisabled}>{this.state.submitText}</button>

        <br />

        <button onClick={() => { this.setState({ currentComponentShown: <FilterOptions /> }); }}>Filter Options</button>
        <button onClick={() => { this.setState({ currentComponentShown: <SortOptions /> }); }}>Sort Options</button>
        <br />
        {this.state.currentComponentShown}
      </div>
    );
  }
}

export default connect(mapStateToProps, { updateSearchInfo, addRestaurants })(SearchArea);
