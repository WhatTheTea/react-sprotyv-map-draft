import React from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet'
import './App.css';

class App extends React.Component
{

  render() {
    return <>
    <MapContainer 
      center = {[49.32512, 30.9375]} 
      zoom={6}
      id="map">
        <TileLayer 
          attribution='&copy; 
          <a href="https://www.openstreetmap.org/copyright">
          OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
    </MapContainer>
    </>
  }
}

export default App;
