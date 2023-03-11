// Libs
import React, { ReactNode } from 'react'
import { MapContainer, Marker, TileLayer } from 'react-leaflet'
// Styles
import '../styles/SprotyvMap.css'
// Modules
import IMilcom from './IMilcom'
import SprotyvMapApi from './SprotyvMapApiService'

interface IProps { }
interface IState {
  districts: Record<string, IMilcom[]> | null
  mapnodes: ReactNode[]
}

class SprotyvMap extends React.Component<IProps, IState>
{
  private readonly coords: Array<[number, number]> = []
  private readonly children: Array<ReactNode> = []
  private readonly api = new SprotyvMapApi()

  Marker(coords: [number, number]): ReactNode {
    return <Marker position={coords} />
  }
  TileLayer(): ReactNode {
    return <TileLayer
      attribution='&copy; 
          <a href="https://www.openstreetmap.org/copyright">
          OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
  }

  constructor(props: IProps) {
    super(props)
    this.state = {
      districts: null,
      mapnodes: [this.TileLayer()]
    }
    // this.children.push(this.TileLayer())
    // let districts = districtsJSON as Record<string, IMilcom[]>
    // for (const key in districts)
    // {
    //   for (const i in districts[key])
    //   {
    //     const latlng = districts[key][i].latlng as [number, number]
    //     if(latlng !== undefined)
    //     {
    //       this.coords.push(latlng)
    //     }
    //   }
    // }
    // for (var c of this.coords)
    // {
    //   this.children.push(this.Marker(c))
    // }
  }

  async updateMarkers(districts: Record<string, IMilcom[]> | null){
      if (districts !== null) {
        let markers: ReactNode[] = [this.TileLayer()]
        for (const district in districts) {
          for (const i in districts[district]) {
            const latlng = districts[district][i].latlng as [number, number] | undefined
            if (latlng !== undefined) {
              markers.push(this.Marker(latlng))
            }
          }
        }
        this.setState(state => { return { mapnodes: markers } })
      }
  }

  async componentDidMount(): Promise<void> {
    const data = await this.api.getDistricts()
    this.setState(state => { return { districts: data } })
    await this.updateMarkers(data)
  }

  render() {
    return <>
      <MapContainer
        center={[49.32512, 30.9375]}
        zoom={6}
        id="map"
        children={this.state.mapnodes} />
    </>
  }
}

export default SprotyvMap;
