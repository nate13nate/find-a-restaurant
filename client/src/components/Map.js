const { Map: LeafletMap, TileLayer, Marker, Popup } = ReactLeaflet;

class SimpleExample extends React.Component {
  render() {
    const position = [51.505, -0.09];

    return (
      <LeafletMap center={position} zoom={13}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br/> Easily customizable.
          </Popup>
        </Marker>
      </LeafletMap>
    );
  }
}

export default Map;
