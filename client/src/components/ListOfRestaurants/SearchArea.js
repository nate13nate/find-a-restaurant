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
     * currentComponentShownStyle - Object; contains the object's styling; will be changed if the filter or sort buttons are pressed
     * filterStyle - Object; contains the button's background color (if adjusted) depending on if the button's component is open or not
     * sortStyle - Object; see above
     * submitDisabled - boolean; contains whether the submit button is disabled or not
     * submitText - String; contains the text for the submit button
     */
    this.state = {
      currentComponentShown: null,
      currentComponentShownStyle: {},
      filterStyle: {},
      sortStyle: {},
      submitDisabled: false,
      submitText: 'Submit'
    };
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
      <div id='searchAreaDiv'>
        <input
          type='text'
          value={this.props.state.searchInfo.term || ''}
          placeholder='Search the Restaurants Here...'
          onChange={(e) => { this.props.updateSearchInfo({ term: e.target.value }); }}
          onKeyUp={(e) => { if (e.keyCode === 13) { this.onSubmit(); } }}
        ></input>
        <button type='submit' onClick={this.onSubmit} disabled={this.state.submitDisabled}>{this.state.submitText}</button>

        <br />

        <div id='optionsDiv'>
          <button
            className='optionsButton'
            onClick={() => {
              this.setState({
                currentComponentShown: <FilterOptions />,
                currentComponentShownStyle: { borderColor: 'darkgreen', borderStyle: 'solid', borderWidth: '1px', padding: '5px' },
                filterStyle: { backgroundColor: 'rgb(167, 226, 79)' },
                sortStyle: {}
              });
            }}
            style={this.state.filterStyle}
          >Filter Options</button>
          <button
            className='optionsButton'
            onClick={() => {
              this.setState({
                currentComponentShown: <SortOptions />,
                currentComponentShownStyle: { borderColor: 'darkgreen', borderStyle: 'solid', borderWidth: '1px', padding: '5px' },
                filterStyle: {},
                sortStyle: { backgroundColor: 'rgb(167, 226, 79)' }
              });
            }}
            style={this.state.sortStyle}
          >Sort Options</button>
        </div>

        <div id='currentComponentShown' style={this.state.currentComponentShownStyle}>
          {this.state.currentComponentShown}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, { updateSearchInfo, addRestaurants })(SearchArea);
