/**
 * This components holds the options to filter the list of restaurants
 */
import React from 'react';
import { connect } from 'react-redux';

import { getRestaurants, mapStateToProps } from '../../functions';
import { addRestaurants } from '../../redux/actions/restaurants';
import { updateSearchInfo } from '../../redux/actions/searchInfo';

class FilterOptions extends React.Component {
  constructor(props) {
    super(props);

    this.needToUpdateRestaurants = false; // will be set to true if the restaurants list can be updated

    // state is set to the searchInfo redux store, and will be used as a reference to it
    this.state = { open_now: false, price: null, radius: 8000, ...props.state.searchInfo };
  }

  componentDidUpdate() {
    // if there is a need to update the restaurants
    if (this.needToUpdateRestaurants) {
      this.needToUpdateRestaurants = false; // note that we no longer need to update restaurants
      getRestaurants(this.props.state.searchInfo, this.props.addRestaurants); // update the restaurants
    }
  }

  render() {
    return (
      <table>
        <tbody>
          <tr>
            <td>
              <label htmlFor='priceInput'>Price:</label>
              <select id='priceInput' value={this.state.price} onChange={(e) => { this.setState({ price: e.target.value }); }}>
                <option label='All' value={null}></option>
                <option label='$' value='1'></option>
                <option label='$$' value='2'></option>
                <option label='$$$' value='3'></option>
                <option label='$$$$' value='4'></option>
              </select>
            </td>
            <td>
              <label htmlFor='radiusInput'>Radius (in miles):</label>
              <input
                id='radiusInput'
                max='25'
                onChange={(e) => { this.setState({ radius: Math.round(e.target.value * 1609.34) }); }}
                type='number'
                value={Math.round(this.state.radius * 0.000621371)}
              ></input>
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor='openInput'>Include Restaurants That are Closed? (check the box to include them)</label>
              <input checked={!this.state.open_now} onChange={() => { this.setState({ open_now: !this.state.open_now }); }} type='checkbox'></input>
            </td>
          </tr>
          <tr>
            <td><input onClick={() => {
              this.needToUpdateRestaurants = true;
              this.props.updateSearchInfo(this.state);
            }} type='submit'></input></td>
          </tr>
        </tbody>
      </table>
    );
  }
}

export default connect(mapStateToProps, { addRestaurants, updateSearchInfo })(FilterOptions);
