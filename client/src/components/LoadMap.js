import React from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';

class LoadMap extends React.Component {
  createMapMarkers = () => {
    if (typeof this.props.restaurantsInfo !== 'undefined') {
      return this.props.restaurantsInfo.map(restaurant => (
        <Marker position={restaurant.location} key={restaurant.id}>
          <Popup>{restaurant.name}</Popup>
        </Marker>
      ));
    }
  }

  render() {
    return (
      <Map bounds={this.props.bounds}>
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
