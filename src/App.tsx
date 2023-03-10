import React, { ReactNode } from 'react';
import { MapContainer, Marker, TileLayer, useMap } from 'react-leaflet'
import './App.css';

class App extends React.Component
{
  static readonly coords : Array<[number, number]> =
  [
    [51.50243870000001, 31.3110552],
    [48.4435097, 26.8421332],
    [48.2920787, 25.9358367]
  ]
  private children : Array<ReactNode> = []
  TileLayer() : ReactNode
  {
  return <>
    <TileLayer 
          attribution='&copy; 
          <a href="https://www.openstreetmap.org/copyright">
          OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
  </>}

  constructor({})
  {
    super({})
    this.children.push(this.TileLayer())
    this.children.push(MarkerNode(App.coords[0]))
    this.children.push(MarkerNode(App.coords[1]))
    this.children.push(MarkerNode(App.coords[2]))
  }
  render() {
    return <>
    <MapContainer 
      center = {[49.32512, 30.9375]} 
      zoom={6}
      id="map"
      children={this.children}/>
    </>
  }
}

function MarkerNode(coords:[number,number]) : ReactNode
{
  return <>
    <Marker position={coords}/>
  </>
}

export default App;
