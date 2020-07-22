import React from 'react';
import {Map, Marker, Popup, TileLayer, withLeaflet} from 'react-leaflet';

import { SearchControl, OpenStreetMapProvider } from 'react-leaflet-geosearch'

import './Maps.css';
import L from 'leaflet'
import Control from 'react-leaflet-control'

import axios from 'axios'

const prov = OpenStreetMapProvider();
const GeoSearchControlElement = withLeaflet(SearchControl);


export const RedMarkerIcon = new L.Icon(
    {
        iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    }
)



class Maps extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            markers: [[44,21]],
            blueMarkers:[[44,22]],
            //conditie pentru adaugare de markere 0 sau 1
            addMarkerPressed:0,
            selectedMarkerPos: [[]],
            selectedMarkerLat:null,
            selectedMarkerLng:null,
            checkClicked:0


        };



    }

    convToTen =(num)=>  //conversie la 10 zecimale
    {
        return num.toFixed(10)
    }


    componentDidMount()
    {
    axios.get("http://92.87.91.16/backend_code/api/red_marker/read.php")
        .then(
         res=>{
             for(let i=0;i<res.data.data.length;i++)
             {
                 this.setState(
                     {
                        markers: [...this.state.markers,
                        [
                            res.data.data[i].longitude,
                            res.data.data[i].latitude
                        ]
                        ]
                     }
                 )
             }

 }
        );


        axios.get("http://92.87.91.16/backend_code/api/blue_marker/read.php")
            .then(
                res=>{
                    for(let i=0;i<res.data.data.length;i++)
                    {
                        this.setState(
                            {
                                blueMarkers: [...this.state.blueMarkers,
                                    [
                                        res.data.data[i].latitude,
                                        res.data.data[i].longitude
                                    ]
                                ]
                            }
                        )
                    }

                }
            );


    }


    addMarker = (e) => {

        if(this.state.addMarkerPressed)
        {
            const {markers} = this.state
            let arr = [this.convToTen(e.latlng.lat),this.convToTen(e.latlng.lng)]
            markers.push(arr)
            this.setState({markers})
            console.log("Markerele: " + this.state.markers)

            //adaugare in baza de date

            console.log("LAT SI LONG: ",this.convToTen(e.latlng.lng),
                "    |||     ",
                this.convToTen(e.latlng.lat),"||| " ,typeof this.convToTen(e.latlng.lng))

            const proxyurl = "https://cors-anywhere.herokuapp.com/" //folosesc un proxi ca sa evit eroarea
            axios.post(proxyurl+'http://92.87.91.16/backend_code/api/red_marker/create.php',
                {
                    latitude: this.convToTen(e.latlng.lng),
                    longitude: this.convToTen(e.latlng.lat),
                    uid_volunteer:null,
                    time:null

                }
            ).then(function (response) {
                console.log(response);
            }
            )


        }


    }

    removeRedMarker = () =>
    {

         const {markers} = this.state
         let markersSTR = this.state.markers.map(String)
        console.log(markersSTR)
         let markerPos = this.state.selectedMarkerPos.toString()
        console.log("Asa arata pozitia markerului: ",markerPos)
         let idxOfMarkerPos = markersSTR.indexOf(markerPos)

        //cand se pierde indexul dupa stergere,markerul selectat va fi ultimul
        if(idxOfMarkerPos !== -1)
        {

            markers.splice(idxOfMarkerPos,1)
            this.setState({markers})

        }
        console.log("Index Pin:   "+idxOfMarkerPos)


let data ={
    "latitude":  this.state.selectedMarkerLng.toString(),
    "longitude": this.state.selectedMarkerLat.toString()

}

console.log("IN REMOVE LAT: ",this.state.selectedMarkerLat.toString(),"LNG: ",this.state.selectedMarkerLng.toString())

        if(this.state.selectedMarkerLng !== null) {
            console.log("MERGE")
            console.log("LONG DATA: ",this.state.selectedMarkerLng)

            axios.delete('http://92.87.91.16/backend_code/api/red_marker/delete.php',
                {
data



                }






            ).then(
                data => console.log(data, " a fost sters")
            )

        }
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

    //pentru popup
    MarkerClickedTrue =()=>{
        this.setState({
            checkClicked:1
        });
    }

    MarkerClickedFalse = ()=>{
        this.setState({
            checkClicked:0
        });
    }


    //setez coordonatele lui selectedMarkerPos din state
    getMarkerPosition = (e) =>
{
    let latitude = this.convToTen(e.target.getLatLng().lat)
    let longitude = this.convToTen(e.target.getLatLng().lng)

    this.setState({
        selectedMarkerLat: latitude
    });
    this.setState({
        selectedMarkerLng: longitude
    });

    console.log("tipul latitudinii cand o ia din getLatLng:  "+typeof (e.target.getLatLng().lat))

    //modificari ulterioare
    let x1 = [latitude, longitude].toString()




    const {selectedMarkerPos} = this.state
    selectedMarkerPos.push(x1)  //a trebuit sa convertesc in string
    selectedMarkerPos.splice(0,1)  //sterge markerul vechi din lista
    this.setState({selectedMarkerPos})

    console.log("Selected marker: " + x1)

//fix pentru popup
        this.MarkerClickedTrue()

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


            {  this.state.markers.map((position, idx) =>
                <Marker
                    icon ={RedMarkerIcon}
                    className={'marker'}
                    key={`marker-${idx}`}
                    position={position}
                    raiseOnHover =  {true}
                    onClick={
                        this.getMarkerPosition

                    }
                >


                    { this.state.checkClicked && < Popup className={'pin-popup'}
                             onClose={
                                 this.MarkerClickedFalse
                             }

                                                         ref={this.popup}

                             autoPan={false}

                    >

                        <h3 align={'center'}>Ambrosia</h3>
                        <button className={"remove-marker"}
                                onClick={()=>{
                                    this.removeRedMarker();
                                    this.MarkerClickedFalse();
                                }}
                        >
                            Remove</button>

                    </Popup>
                    }
                </Marker>
            )}


            {  this.state.blueMarkers.map((position, idx) =>
                <Marker
                    key={`marker-${idx}`}
                    position={position}
                    raiseOnHover =  {true}
                   // onClick={this.getMarkerPosition}
                >

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
