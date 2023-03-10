import React, { ReactNode } from 'react';
import { MapContainer, Marker, TileLayer, useMap } from 'react-leaflet'
import './App.css';
import * as districtsJSON from './districts.json'


interface IMilcom
{
  name : string,
  latlng : number[],
  info : string
}
class App extends React.Component
{
  private readonly coords : Array<[number, number]> =
  [
  ]
  private readonly children : Array<ReactNode> = []

  Marker(coords:[number,number]) : ReactNode {
    return <Marker position={coords}/>
  }
  TileLayer() : ReactNode {
  return <TileLayer 
          attribution='&copy; 
          <a href="https://www.openstreetmap.org/copyright">
          OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
        }

  constructor(props?:any)
  {
    super(props)
    this.children.push(this.TileLayer())
    let districts = districtsJSON as Record<string, IMilcom[]>
    for (const key in districts)
    {
      for (var i in districts[key])
      {
        const latlng = districts[key][i].latlng as [number, number]
        if(latlng !== undefined)
        {
          this.coords.push(latlng)
        }
      }
    }
    for (var c of this.coords)
    {
      this.children.push(this.Marker(c))
    }
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

export default App;
