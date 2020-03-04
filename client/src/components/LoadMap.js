/**
 * A map, which can be either a map of a group of points or a
 * map of just one point
 */
import React from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';

class LoadMap extends React.Component {
  // returns the marker(s) for the map
  createMapMarkers = () => {
    // if restaurantsInfo is provided, and therefore this map is for the restaurant list page
    if (typeof this.props.restaurantsInfo !== 'undefined') {
      // return markers of the restaurant locations
      return this.props.restaurantsInfo.map(restaurant => (
        <Marker position={restaurant.location} key={restaurant.id}>
          <Popup>{restaurant.name}</Popup>
        </Marker>
      ));
    }

    // if restaurantName was provided, and therefore this map is for the individual restaurant page
    if (typeof this.props.restaurantName !== 'undefined') {
      // return the marker for the restaurant location and (if provided) the user's location
      return (
        <div>
          <Marker position={this.props.center}>
            <Popup>{this.props.restaurantName}</Popup>
          </Marker>
          {typeof this.props.usersLocation === 'undefined' ? null : (
            <Marker position={this.props.usersLocation}>
              <Popup>Your Location</Popup>
            </Marker>
          )}
        </div>
      );
    }
  }

  render() {
    // bounds is a list of locations the map has to show when initialized
    // if there is a bounds provided in props, then use that bounds
    // if not, then this is an individual restaurant page
    // check to see if usersLocation is provided
    // if it isn't provided, there's no need for bounds, since the only location provided will be the restaurant's
    // if it is provided, then bounds will be the user's location and the restaurant's location
    const bounds = (typeof this.props.bounds === 'undefined' || this.props.bounds.length === 1 ? undefined : this.props.bounds)
      || (typeof this.props.usersLocation === 'undefined' ? null : [this.props.usersLocation, this.props.center]);
    const center = bounds === null ? (typeof this.props.bounds !== 'undefined' && this.props.bounds.length === 1 ? this.props.bounds[0] : this.props.center) : null;
    const zoom = center === null ? null : 13;

    return (
      <Map bounds={bounds} center={center} zoom={zoom}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
        />

        {this.createMapMarkers()}
      </Map>
    );
  }
}

export default LoadMap;
