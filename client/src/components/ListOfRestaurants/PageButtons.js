/**
 * The buttons which switch between different pages of restaurants.
 * Because the Yelp Fusion api only shows a max of 50 restaurants
 * per request, each page has 50 restaurants on it, and the page
 * buttons switch between the different pages.
 */
import React from 'react';
import { connect } from 'react-redux';

import { getRestaurants, mapStateToProps } from '../../functions';
import { changePageNum } from '../../redux/actions/pageInfo';
import { addRestaurants } from '../../redux/actions/restaurants';

class PageButtons extends React.Component {
  // returns the JSX for the page buttons
  renderPageButtons = () => {
    // if there hasn't been a call to the database yet, return an empty div
    if (typeof this.props.state.pageInfo.totalRestaurants === 'undefined') {
      return <div></div>;
    }

    const pageButtonsJsx = []; // holds the JSX for the page buttons

    // for each group of 50 restaurants, create a page button for them
    // disable the button for the page the user is currently on
    for (let i = 1; i <= Math.ceil(this.props.state.pageInfo.totalRestaurants / 50); i += 1) {
      pageButtonsJsx.push(<button key={i} onClick={() => { this.props.changePageNum(i); }} disabled={this.props.state.pageInfo.pageNum === i}>{i}</button>);
    }

    return pageButtonsJsx;
  }

  componentDidUpdate() {
    // if the restaurants need to be updated, call to the database for the restaurants
    if (this.props.state.pageInfo.needToUpdateRestaurants) {
      getRestaurants(this.props.state.searchInfo, this.props.addRestaurants);
    }
  }

  render() {
    return <div>{this.renderPageButtons()}</div>;
  }
}

export default connect(mapStateToProps, { addRestaurants, changePageNum })(PageButtons);
