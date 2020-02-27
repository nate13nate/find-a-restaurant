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
  constructor(props) {
    super(props);

    /**
     * errorMessage - JSX; if there is an issue with something the user is doing, this message is displayed
     * locationInputValue - String; the value inside the input that receives a location
     */
    this.state = { errorMessage: null, locationInputValue: '' };
  }

  // gets the location using HTML5 geolocation and references a callback function to update the redux state
  getLocation = () => {
    navigator.geolocation.getCurrentPosition(this.updateSearchInfoWithLatAndLong, (error) => {
      if (error.code === error.PERMISSION_DENIED) { // if the function failed because permission was denied, display a custom error message
        this.setState({ errorMessage: <div>You denied access to your location. Either go into site settings and change your permissions, or input a location.</div>})
      } else { // if the function failed for a different reason, display the error message
        this.setState({ errorMessage: <div>{error.message}</div>});
      }
    });
  }

  // updates the redux state searchInfo by adding a latitude and a longitude
  updateSearchInfoWithLatAndLong = (location) => {
    this.props.updateSearchInfo({ latitude: location.coords.latitude, longitude: location.coords.longitude });
  }

  // updates the redux state searchInfo by adding a location
  updateSearchInfoWithProvidedLocation = () => {
    this.props.updateSearchInfo({ location: this.state.locationInputValue });
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
        {this.state.errorMessage}

        <input type='text' placeholder='Type in a Location' value={this.state.locationInputValue}
          onChange={(e) => { this.setState({ locationInputValue: e.target.value }); }}></input>
        <button onClick={() => {
            // if there is a location provided, record the location; if there is no location provided, then prompt the user for a location
            this.state.locationInputValue !== '' ? this.updateSearchInfoWithProvidedLocation() : this.setState({ errorMessage: <div>Please provide a location.</div> });
          }}>Use This Location</button>

        <button onClick={this.getLocation}>Get Your Location</button>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({ state, properties: props });

export default connect(mapStateToProps, { updateSearchInfo })(GetLocation);
