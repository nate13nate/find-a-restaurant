/**
 * The sole purpose of this component is to get a location from the user
 * so that restaurants can be accessed from the api (the api requires,
 * at minimum, a location before it will send a list of restaurants).
 * The location can be recieved through either HTML5 Geolocation or a
 * location inputted by the user.
 */
import React from 'react';
import { connect } from 'react-redux';

import history from '../../history';
import { updateSearchInfo } from '../../redux/actions/searchInfo';

class GetLocation extends React.Component {
  // gets the location using HTML5 geolocation and references a callback function to update the redux state
  getLocation = () => {
    navigator.geolocation.getCurrentPosition(this.updateSearchInfoWithLatAndLong);
  }

  // updates the redux state searchInfo by adding a latitude and a longitude
  updateSearchInfoWithLatAndLong = (location) => {
    this.props.updateSearchInfo({ latitude: location.coords.latitude, longitude: location.coords.longitude });
  }

  componentDidUpdate() {
    // if the redux state has either a location or a latitude and a longitude, then the component
    // has completed its job and the user is moved over to the ListOfDepartments component
    if (typeof this.props.state.searchInfo.location !== 'undefined' ||
      (typeof this.props.state.searchInfo.latitude !== 'undefined' && typeof this.props.state.searchInfo.longitude !== 'undefined')) {
      history.push('/');
    }
  }

  render() {
    return (
      <div>
        <h1>Select a Location or Allow this Site to Access Your Location</h1>
        <button onClick={this.getLocation}>Get Your Location</button>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({ state, properties: props });

export default connect(mapStateToProps, { updateSearchInfo })(GetLocation);
