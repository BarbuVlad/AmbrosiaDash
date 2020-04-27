import React from 'react';
import {Map, Marker, Popup, TileLayer, withLeaflet} from 'react-leaflet';

import { SearchControl, OpenStreetMapProvider } from 'react-leaflet-geosearch'
import {Icon} from 'leaflet';
import './Maps.css';

import Control from 'react-leaflet-control';


const prov = OpenStreetMapProvider();
const GeoSearchControlElement = withLeaflet(SearchControl);




class Maps extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            markers: [[19.4100819, -99.1630388]],
            //conditie pentru adaugare de markere 0 sau 1
            addMarkerPressed:0,
            selectedMarkerPos: [[]],
            selectedMarkerLat:null,
            selectedMarkerLng:null,


        };
        console.log("Pozitia in state: "+this.state.selectedMarkerPos)

       // this.removeMarker = this.removeMarker.bind(this);


    }

    addMarker = (e) => {
        if(this.state.addMarkerPressed)
        {
            const {markers} = this.state
            let arr = [e.latlng.lat,e.latlng.lng]
            markers.push(arr)
            this.setState({markers})
            console.log("Markerele: " + this.state.markers)

        }


    }

    removeMarker = () =>
    {
        const {markers} = this.state

         let markersSTR = this.state.markers.map(String)
         let markerPos = this.state.selectedMarkerPos.toString()
         let idxOfMarkerPos = markersSTR.indexOf(markerPos)
         console.log("Index Pin:   "+idxOfMarkerPos)
         markers.splice(idxOfMarkerPos,1)
         this.setState({markers})

    }

//schimb valoarea state-ului addMarkerPressed
    onButtonPress = () => {
        if(this.state.addMarkerPressed === 0)
        {
            this.setState({
                addMarkerPressed: 1
            });
        }
        else
        {
            this.setState({
                addMarkerPressed: 0
            });
        }

    }


    //setez coordonatele lui selectedMarkerPos din state
    getMarkerPosition = (e) =>
{

    this.setState({
        selectedMarkerLat: e.target.getLatLng().lat
    });
    this.setState({
        selectedMarkerLng: e.target.getLatLng().lng
    });

    console.log("Latitudine float: "+this.state.selectedMarkerLat +"  Longitudine float: "+this.state.selectedMarkerLng)

    let x  = e.target.getLatLng()

    //modificari ulterioare
    let x1 = [e.target.getLatLng().lat, e.target.getLatLng().lng].toString()
    //

    const {selectedMarkerPos} = this.state
    selectedMarkerPos.push(x1)  //a trebuit sa convertesc in string
    selectedMarkerPos.splice(0,1)  //sterge markerul vechi din lista
    this.setState({selectedMarkerPos})

    console.log("Selected marker: " + x1)

//console.log(x)


}


render() {


    return (

        <Map center={
            [45.760696, 21.226788]}
             zoom={12}


             onClick = {
                 this.addMarker
             }


        >


            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'

            />
            <GeoSearchControlElement
                className={"search-bar"}
                provider={prov}
                showMarker={true}
                showPopup={false}
                popupFormat={({query, result}) => result.label}
                maxMarkers={3}
                retainZoomLevel={false}
                animateZoom={true}
                autoClose={false}
                searchLabel={'Enter address:'} keepResult={true}

            />


            {this.state.markers.map((position, idx) =>
                <Marker
                    className={'marker'}
                    key={`marker-${idx}`}
                    position={position}
                    raiseOnHover =  {true}
                    onClick={this.getMarkerPosition}
                >

                    <Popup className ={'pin-popup'}

                    >

                        <h3 align={'center'}>Ambrosia</h3>
                        <button className={"remove-marker"} onClick ={this.removeMarker}> Remove</button>

                    </Popup>
                </Marker>
            )}






            <Control position="topright" >
                <button
                    className={"addmarker-button"}
                    onClick={ this.onButtonPress}

                >
                    Add Markers
                </button>



            </Control>


        </Map>


    );

}



}

export default Maps;
